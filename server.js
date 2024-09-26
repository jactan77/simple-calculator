require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const AuthMiddleware = require('./utils/AuthMiddleware');
const { WebSocketServer } = require('ws');
const { read } = require('fs');
const { isPropertyAccessChain } = require('typescript');
//Mongo config
const mongoose = require('mongoose');
const db = process.env.MONGO_URI
const User = require('./models/User')

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public/admin-panel')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(
    session({
        secret: 'supersecretkey', 
        resave: false,            
        saveUninitialized: false, 
        cookie: { maxAge: 3600000 }, 
    })
);

mongoose.connect(db)
   .then(() => console.log('MongoDB connected'))

   .catch(err => console.error(err));


wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    ws.on('message', (message) => {
        console.log('Received:', message);

        
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});
app.get('/calculator', AuthMiddleware.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index1.html' ));
});



app.get('/',AuthMiddleware.isAuthenticated,(req, res) => {
    res.render('index.ejs',{ username: req.session.username, isAdmin: req.session.isAdmin});
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});
app.get('/settings', AuthMiddleware.isAuthenticated, (req,res)=> {
   
    res.render('settings.ejs',{ username: req.session.username, email: req.session.email});

})

app.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try{
      const user = await User.findOne({ username: username});
      if(!user){
        return res.status(401).send('Invalid credentials');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if(!isPasswordValid){
        return res.status(401).send('Invalid credentials');
      }  
        
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.email = user.email;
    req.session.isAdmin = user.isAdmin;
    res.redirect('/')
    } catch (error) {
        console.error(error)
    }
    
    


    
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.post('/register', async (req, res) => {
    const {username, password, email} = req.body
   try{
    const existingUser = await User.findOne({ 
        $or: [
            { username: username }, 
            { email: email }
        ] 
    })
    if(existingUser){
        return res.status(409).send('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user =  new User(({
            id: Date.now().toString(),
            username,
            password: hashedPassword,
            email,
            history: [],
            
        })) 
        await user.save();
        console.log(user)
        res.redirect('/login');
   }catch(err){
    console.error(err);
    res.status(500).send('Server error');
   } 
   
});
app.get('/', AuthMiddleware.isAuthenticated, (req, res) => {
    res.render('index.ejs', { username: req.session.username });
});

// Logout route
app.post('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Unable to log out');
        }
        res.redirect('/login');
    });
});

app.post('/history', AuthMiddleware.isAuthenticated, async (req, res) => {
    const { operation, result, timestamp } = req.body;
    const user =  await User.findOne({id: req.session.userId});
    if(!user){
        return res.status(404).send('Such a user was not found');
    }
    const historyEntry = {
        operation,
        result,
        timestamp
    }

    user.history.push(historyEntry)
    await user.save()
    
    wss.clients.forEach((client)=> {
        if(client.readyState === WebSocket.OPEN){
            client.send(JSON.stringify({type: 'new-history', data: historyEntry }))
        }
    })
    console.log(user)
    res.status(200).send('History updated successfully');
});
app.get('/history', AuthMiddleware.isAuthenticated, async (req,res)=>{
    const user = await User.findOne({id: req.session.userId});
    if(!user){
        return res.status(404).send('Such a user was not found');
    }
    res.status(200).json(user.history)
})
app.delete('/history', AuthMiddleware.isAuthenticated, async (req, res)=>{
    const user = await User.findOne({id: req.session.userId})
    if(!user){
        return res.status(404).send('Such a user was not found');
    }
    user.history = [];
    await user.save();
    wss.clients.forEach((client) =>{
        if(client.readyState === WebSocket.OPEN){
            client.send(JSON.stringify({type: 'clear-history'}))
        }
    })


})

app.post('/settings', AuthMiddleware.isAuthenticated, async(req, res)=> {
   try{ 
    const {username, password, email, confirmPassword} = req.body;
    const user = await User.findOne({id: req.session.userId})
    
    if(!user){
        return res.status(404).send('Such a user was not found');
    }
    if(username && username !== user.username){
        const userExist = await User.findOne({username:username})
        if(userExist){
            return res.status(400).send('Username is already taken');
        }
        user.username = username;
        req.session.username = username;
    }
    if(password){
    if(password === confirmPassword){    
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        req.session.password = password
    } else{
        return res.status(400).send('Passwords do not match');
    }
    }
    if (email && email !== user.email) {
        const emailExist = await User.findOne({ email: email });
        if (emailExist) {
            return res.status(400).send('Email is already taken');
        }
        user.email = email;
        req.session.email = email;  
    }
    await user.save();
    
    res.render('settings.ejs',{ 
        username: req.session.username, 
        email: req.session.email });
   } catch (err) {
    console.error('Error updating settings:', err);
        res.status(500).send('Internal server error');
   }
});







app.get('/admin-dashboard', AuthMiddleware.isAuthenticatedAdmin, AuthMiddleware.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin-panel','indexPanel.html' ))
    
});









const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port 3000');
});

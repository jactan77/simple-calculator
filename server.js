const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const UserManager = require('./utils/UserManager'); 
const app = express();
const userManager = new UserManager(path.join(__dirname, 'data', 'usersApi.json')); // Initialize UserManager with the path to the JSON file
const AuthMiddleware = require('./utils/AuthMiddleware')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: 'supersecretkey', 
        resave: false,            
        saveUninitialized: false, 
        cookie: { maxAge: 3600000 }, 
    })
);

app.get('/calculator', AuthMiddleware.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index1.html'));
});



app.get('/',AuthMiddleware.isAuthenticated,(req, res) => {
    res.render('index.ejs',{ username: req.session.username });
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});


app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const users = userManager.readUser()

    // Find user
    const user = users.find(user => user.username === username);
    if(!user){
        return res.status(404).send('Such a user was not found');
    }
    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).send('Incorrect password');
    }
    req.session.userId = user.id;
    req.session.username = user.username;
    
    res.redirect('/')


    
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.post('/register', async (req, res) => {
    const {username, password, email} = req.body
    const users  = userManager.readUser()
    const userExist = users.find(user => user.username === username)
    if(userExist){
        return res.status(400).send('Username is already taken');
    } 
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({
            id: Date.now().toString(),
            username,
            password: hashedPassword,
            email,
            history: []
        });
        userManager.writeUser(users);
        console.log(users)
        res.redirect('/login');
    

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

app.post('/history', AuthMiddleware.isAuthenticated, (req, res) => {
    const { operation, result, timestamp } = req.body;
    let users = userManager.readUser(); 

    
    const userIndex = users.findIndex(user => user.id === req.session.userId);
    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }

    
    const user = users[userIndex]; 
    if (!user.history) {
        user.history = []; 
    }
    user.history.push({ operation, result, timestamp });

    
    users[userIndex] = user;

    
    userManager.writeUser(users);
    console.log(user)
    res.status(200).send('History updated successfully');
});
app.get('/history', AuthMiddleware.isAuthenticated,(req,res)=>{
    const users = userManager.readUser();
    const user = users.find(user => user.id === req.session.userId)
    if(!user){
        return res.status(404).send('Such a user was not found');
    }
    res.status(200).json(user.history)
})
app.delete('/history', AuthMiddleware.isAuthenticated, (req, res)=>{
    const users = userManager.readUser();
    const user = users.find(user => user.id === req.session.userId)
    if(!user){
        return res.status(404).send('Such a user was not found');
    }
    user.history = [];
    userManager.writeUser(users);
    


})

app.listen(3000, () => {
    console.log('Serwer działa na porcie 3000');
});

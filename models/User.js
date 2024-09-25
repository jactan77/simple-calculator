const mongoose = require('mongoose')
const historySchema = new mongoose.Schema({
    operation:{
        type: String,
        required: true
    },
    result:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
})

const UserSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    }, 
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    history:[historySchema],
    
    isAdmin:{
        type:Boolean,
        default: false
    }

})
const User = mongoose.model('User', UserSchema)
module.exports = User;
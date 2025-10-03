 
 const mongoose = require('mongoose');

 const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        
    },
    role:{
        type: String,
        enum: ['user', 'admin'],//enum means it can only be one of these values
        default: 'user'
    }

 }, {timestamps: true});

    module.exports = mongoose.model('User', UserSchema);
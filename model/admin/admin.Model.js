const mongoose = require('mongoose');

const adminScheam = mongoose.Schema({
    name:{
        type: 'string',
        required: [true,'name is required'],
        trim: true, 
    },
    email:{
        type: 'string',
        required: [true,'email is required'],
        trim: true, 
        unique: true
    },
    password:{
        type: 'string',
        required: [true,'password is required'],
        trim: true, 
    },
    profile:{
        type: 'string',
    }
},{timestemps:true})

const admin = new mongoose.model('Admin',adminScheam)
module.exports = admin
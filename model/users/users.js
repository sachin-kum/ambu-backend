const mongoose = require('mongoose');


const address = new mongoose.Schema({
    address_name: String,
    location: String
})


const schema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, ' user name is required'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, ' user email is required'],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/]
    },
    password: {
        type: String,
        required: [true, 'user password is required'],
        trim: true,
        select: false,
        minlength: [6, 'Password must be at least 6 characters'],
    },
    phone_number: {
        type: Number,
        trim: true,
        required: [true, ' Phone Number is required'],
    },
    otp: {
        type: Number,
        trim: true,

    },
    country_code: {
        type: Number,
        // required: [true]
    },
    image: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg'
    },
    address: [address],
    // role_type:{
    //     type: String,
    //     enum:['user', 'admin'],
    //     required: [true]
    // }

}, { timestamps: true })

const User = mongoose.model('User', schema)
module.exports = User
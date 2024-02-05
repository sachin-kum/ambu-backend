const mongoose = require('mongoose');

const db = () => {
    try {
        mongoose.connect('mongodb+srv://subban:subban@cluster0.2kbzufl.mongodb.net/ecommercedata',
            console.log('Connected to MongoDB ')
        )
        } catch (error) {
        console.log(error)
    }
}

module.exports = db
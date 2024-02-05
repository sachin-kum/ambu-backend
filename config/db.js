const mongoose = require('mongoose');

const db = () => {
    try {
        mongoose.connect('mongodb+srv://sachin:sachin@cluster0.5gmjzm9.mongodb.net/ambu',
            console.log('Connected to MongoDB ')
        )
        } catch (error) {
        console.log(error)
    }
}

module.exports = db
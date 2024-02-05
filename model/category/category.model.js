const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    category:{
        type:String,
        required:[true,'category name is required']
    }
},{timestemp:true})

const category = new mongoose.model('Category',categorySchema)
module.exports = category


const mongoose = require('mongoose');


const reviews = new mongoose.Schema({
    
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        name:{
            type:String
        },
        rating:{
            type:Number
        },
        comment:{
            type:String
        }
    
})

const schema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true, ' Product name is required'],
    },
    description:{
        type:String,
        trim:true,
        required:[true, 'description is required'],
    },
    // like_users:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User", 
    // },
    like_count:{
        type:Number,
        default:0,
    },
    price:{
        type:Number
    },
    rating:{
        type:Number,
        default:0,
    },
    numberofreviews:{
        type:Number,
        default:0,
    },
    reviews:[reviews ],
    image:{
        type:Array,
        required:[true,'"product image are required']
    },
    stock: {
        type: Number,
        default: 0
    },

    categorys:{
        type:String,
        required:[true,'Category name is required']
    },
    size:{
        type:String,
    },
    color:{
        type:String,
    },
    discount:{
        type:Number
    },
    discount_amount:{
        type:Number
    },
    delivery_charge:{
        type:Number,
        default:0,
    }
    // user_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User',
    //     required:true
    // }

 
},{timestamps:true})

const Product = mongoose.model('Product',schema)
module.exports = Product
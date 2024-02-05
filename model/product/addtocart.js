const mongoose = require('mongoose');

const schema = mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
    },
    menu:{
        type:String,
        enum:["larze","small"]
    },
    quantity:{
        type:Number
    },
    ingrdiants:[{type:mongoose.Schema.Types.ObjectId}],
    totaleamount:{
        type:Number
    },
  
 
},{timestamps:true})

const AddtoCart = mongoose.model('AddtoCart',schema)
module.exports = AddtoCart



// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Please enter your name!"],
//     },
//     email: {
//       type: String,
//       required: [true, "Please enter your email!"],
//     },
//     password: {
//       type: String,
//       required: [true, "Please enter your password"],
//       minLength: [4, "Password should be greater than 4 characters"],
//       select: false,
//     },
//     phoneNumber: {
//       type: Number,
//     },
//     addresses: [address],
//     role: {
//       type: String,
//       default: "user",
//     },

//     resetPasswordToken: String,
//     resetPasswordTime: Date,
//   },
//   { timestemp: true }
// );

// //  Hash password
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   this.password = await bcrypt.hash(this.password, 10);
// });

// // jwt token
// userSchema.methods.getJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });
// };

// // compare password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };
// const User = mongoose.model("User", userSchema);
// module.exports = User;

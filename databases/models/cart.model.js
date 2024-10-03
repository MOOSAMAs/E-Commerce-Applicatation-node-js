import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId , ref:'user'},
    cartItems:[{
        product:{type:mongoose.Types.ObjectId , ref:'product'},
        quantity:{type:Number , default:1},
        price:Number
    }],
    totalPrice:Number,
    priceAfterDiscount:Number,
    dicount:Number
},{
    timestamps:true
})

export const cartModel = mongoose.model('cart' , cartSchema)
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId , ref:'user'},
    cartItems:[{
        product:{type:mongoose.Types.ObjectId , ref:'product'},
        quantity:Number ,
        price:Number
    }],
    totalPrice:Number,
    shippingAddress:{
        street:String,
        city:String,
        phone:String
    },
    paymentMethod:{
        type:String,
        enum:['cash' , 'card'],
        default:'cash'
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    shippingAt:Date,
    isDeliverd:Boolean
},{
    timestamps:true
})

export const orderModel = mongoose.model('order' , orderSchema)
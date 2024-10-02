import mongoose from "mongoose"

const couponSchema = new mongoose.Schema({
    code:{
        type:String,
        trim:true,
        required:true
    },
    expireDate:{
        type:Date,
        required:true
    },
    discount:{
        type:Number,
        required:true,
    }
},
{
    timestamps:true
})

export const couponModel = mongoose.model('coupon' , couponSchema)
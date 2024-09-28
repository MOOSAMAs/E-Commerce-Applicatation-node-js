import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    comment:{
        type:String,
        minLength:5,
        maxLength:100,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'product'
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    }
},{
    timestamps:true
})

export const reviewModel = mongoose.model('review' , reviewsSchema)
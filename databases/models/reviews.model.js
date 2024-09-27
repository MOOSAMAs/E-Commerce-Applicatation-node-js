import mongoose from "mongoose";

const reviewsSchema = new mongoose.schema({
    comment:{
        type:String,
        require:true,
        minLength:5,
        maxLength:100
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'product'
    },
    reviews:{
        type:Number,
        min:1,
        max:5
    }
},{
    timestamps:true
})

const reviewModel = mongoose.model('review' , reviewsSchema)
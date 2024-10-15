import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        minLength:3,
        maxLength:50
    },
    img:{
        type:String,
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    }
},
{
    timestamps:true
})


export const categoryModel = mongoose.model('category' , categorySchema)
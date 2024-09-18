import mongoose from "mongoose";

const brandsSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    logo:{
        type:String
    },
    slug:{
        type:String,
        lowercase:true,
        require:true
    }
},
{
    timestamps:true
})

export const brandsModel = mongoose.model('brand' , brandsSchema)

import mongoose, { mongo } from "mongoose";

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

brandsSchema.post('init' , (doc)=>{
    doc.logo = process.env.BASE_URL+'/brands/' +doc.logo
})

export const brandsModel = mongoose.model('brand' , brandsSchema)

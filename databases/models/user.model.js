import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
        minLength:2,
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minLength:5
    },
    phone:{
        type:String,
        require:true,
    },
    profilePic: String,
    role:{
        type:String,
        enum:['user' , 'admin'],
        default:'user'
    },
    isActive:{
        type:Boolean,
        default:true
    },
    emailVerified:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})

export const userModel = mongoose.model('user' , userSchema)
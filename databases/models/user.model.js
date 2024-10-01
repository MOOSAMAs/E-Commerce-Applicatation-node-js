import mongoose from "mongoose";
import bcrypt from 'bcrypt'

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
    passChangedAt:Date,
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
    },
    wishlist:[{
        type:mongoose.SchemaTypes.ObjectId , 
        ref:'product'
    }],
    addresses:[{
        city:String,
        street:String,
        phone:String
    }]
},
{
    timestamps:true
})

userSchema.pre('save' , function () {
    this.password = bcrypt.hashSync(this.password , 8)
})

userSchema.pre('findOneAndUpdate' , function () {
    if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password , 8)
})

export const userModel = mongoose.model('user' , userSchema)
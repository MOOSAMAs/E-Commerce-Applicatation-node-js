const couponSchema = new mongoose.schema({
    code:{
        type:String,
        trim:true,
        require:true
    },
    expireDate:{
        type:Date,
        require:true
    },
    discount:{
        type:Number,
        require:true,
    }
},
{
    timestamps:true
})

export const couponModel = mongoose.model('coupon' , couponSchema)
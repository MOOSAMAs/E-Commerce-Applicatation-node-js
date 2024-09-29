import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        unique:true,
        require:true,
        minLength:3
    },
    slug:{
        type:String,
        require:true,
        lowercase:true
    },
    price:{
        type:Number,
        min:0,
        require:true
    },
    priceAfterDiscount:{
        type:Number,
        min:0
    },
    ratingAvg:{
        type:Number,
        min:1,
        max:5
    },
    ratingCount:{
        type:Number,
        min:0,
        default:0
    },
    description:{
        type:String,
        require:true,
        minLength:10,
        maxLenght:300,
        trim:true
    },
    quantity:{
        type:Number,
        require:true,
        min:0,
        default:0
    },
    sold:{
        type:Number,
        default:0,
        min:0
    },
    imgCover:String,
    images:[String],
    category:{
        type:String,
        require:true,
        ref:'category'
    },
    subCategory:{
        type:String,
        require:true,
        ref:'subcategory'
    },
    brand:{
        type:String,
        require:true,
        ref:'brand'
    }
},
{
    timestamps:true,
    toJSON: { virtuals: true }
})

productSchema.virtual('reviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product',
  });

productSchema.post('init' , (doc)=>{
    doc.images =doc.images.map((path => process.env.BASE_URL + '/products/' + path))
    doc.imgCover = process.env.BASE_URL + '/products/' + doc.imgCover
})

productSchema.pre(/^find/ , function () {
    this.populate('reviews')
})

export const productModel = mongoose.model('product' , productSchema)
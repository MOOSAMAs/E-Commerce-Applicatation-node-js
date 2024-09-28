import { catchError } from "../../middleware/errorHandle.js";
import { handleError } from "../../utils/customError.js";
import { deleteOne } from "../handlers/factore.handler.js";
import { apiFeatures } from "../../utils/apiFeatures.js";
import { reviewModel } from "../../../databases/models/reviews.model.js";

const addReviews = catchError(async (req , res , next)=>{
    req.body.user = req.user._id 
    let isReview = await reviewModel.findOne({user:req.user._id , product:req.body.product})
    if(isReview) 
        {
            return next(new handleError('You Recently review this product' , 409))
        }
    let result = new reviewModel(req.body)
    await result.save()
    res.status(201).json({message:'Review Added' , result})
})

const allReviews = catchError(async(req , res , next)=>{
    let ApiFeatures = new apiFeatures(reviewModel.find() , req.query)
    .filter().paginate().fields().search().sort()
    const result = await ApiFeatures.mongooseQuery
    res.status(201).json({message:'all Reviews',page:ApiFeatures.page , result})
})

const oneReview = catchError(async(req , res , next)=>{
    let {id} = req.params
    let result = await reviewModel.findById(id)
    if (!result) return next(new handleError('Review Not Found'))
    res.status(201).json({message:'Specific Reviews' , result})
})

const updateReviews = catchError(async(req , res , next)=>{
    const {id} = req.params
    const result = await reviewModel.findOneAndUpdate({ _id:id , user:req.user._id}, req.body , {new:true})
    !result &&  next(new handleError('Review Not Found or you not authorized to update that review' , 409))
    result &&  res.status(201).json({message:'Updated Successfully}' , result})
})

const deleteReviews = deleteOne(reviewModel)

export {
    addReviews,
    allReviews,
    oneReview,
    updateReviews,
    deleteReviews
}
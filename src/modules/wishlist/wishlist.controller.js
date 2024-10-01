import { userModel } from "../../../databases/models/user.model.js";
import { catchError } from "../../middleware/errorHandle.js";
import { handleError } from "../../utils/customError.js";

const addToWishlist = catchError(async(req , res , next)=>{
    let {product} = req.body
    const result = await userModel.findByIdAndUpdate(req.user._id , {$addToSet: {wishlist:product}} , {new:true})
    !result &&  next(new handleError('Wishlist Not Found' , 405))
    result &&  res.status(201).json({message:'added Successfully}' , result:result.wishlist})
})

const deleteFromWishlist = catchError(async(req , res , next)=>{
    let {product} = req.body
    const result = await userModel.findByIdAndUpdate(req.user._id , {$pull: {wishlist:product}} , {new:true})
    !result &&  next(new handleError('Wishlist Not Found' , 405))
    result &&  res.status(201).json({message:'added Successfully}' , result:result.wishlist})
})

const getAllWishlist = catchError(async(req , res , next)=>{
    const result = await userModel.findOne({_id:req.user._id}).populate('wishlist')
    !result &&  next(new handleError('Wishlist Not Found' , 405))
    result &&  res.status(201).json({message:'added Successfully}' , result:result.wishlist})
})


export {
addToWishlist,
deleteFromWishlist,
getAllWishlist
}
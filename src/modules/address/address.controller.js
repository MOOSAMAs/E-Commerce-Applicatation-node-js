import { userModel } from "../../../databases/models/user.model.js";
import { catchError } from "../../middleware/errorHandle.js";
import { handleError } from "../../utils/customError.js";

const addAdress = catchError(async(req , res , next)=>{
    const result = await userModel.findByIdAndUpdate(req.user._id , {$addToSet: {addresses:req.body}} , {new:true})
    !result &&  next(new handleError('address Not Found' , 405))
    result &&  res.status(201).json({message:'added Successfully}' , result:result.addresses})
})

const deleteAddress = catchError(async(req , res , next)=>{
    const result = await userModel.findByIdAndUpdate(req.user._id , {$pull: {addresses:{_id:req.body.addresses}}} , {new:true})
    !result &&  next(new handleError('address Not Found' , 405))
    result &&  res.status(201).json({message:'added Successfully}' , result:result.addresses})
})

const getAllAddress = catchError(async(req , res , next)=>{
    const result = await userModel.findOne({_id:req.user._id})
    !result &&  next(new handleError('address Not Found' , 405))
    result &&  res.status(201).json({message:'added Successfully}' , result:result.addresses})
})


export {
addAdress,
deleteAddress,
getAllAddress
}
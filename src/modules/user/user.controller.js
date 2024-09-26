import slugify from "slugify";
import { catchError } from "../../middleware/errorHandle.js";
import { handleError } from "../../utils/customError.js";
import { deleteOne } from "../handlers/factore.handler.js";
import { apiFeatures } from "../../utils/apiFeatures.js";
import { userModel } from "../../../databases/models/user.model.js";

const addUser = catchError(async (req , res , next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if (user) next(new handleError('this account alredy exist') , 409)
    const result = new userModel(req.body)
    await result.save()
    res.status(201).json({message:'user Added' , result})
})

const allUsers = catchError(async(req , res , next)=>{
    let ApiFeatures = new apiFeatures(userModel.find() , req.query)
    .filter().paginate().fields().search().sort()
    const result = await ApiFeatures.mongooseQuery
    res.status(201).json({message:'all users',page:ApiFeatures.page , result})
})

const oneUser = catchError(async(req , res , next)=>{
    const {id} = req.params
    const result = await userModel.findById(id)
    res.status(201).json({message:'Specific user' , result})
})

const updateUser = catchError(async(req , res , next)=>{
    const {id} = req.params
    req.body.passChangedAt = Date.now()
    const result = await userModel.findByIdAndUpdate(id , req.body , {new:true})
    !result && next(new handleError('user Not Found' , 401))
    result && res.status(201).json({message:'Updated Successfully}' , result})
})

const adminUpdateUser = catchError(async(req , res , next)=>{
    const {id} = req.params
    const result = await userModel.findByIdAndUpdate(id , req.body , {new:true})
    !result && next(new handleError('user Not Found' , 401))
    result && res.status(201).json({message:'Updated Successfully}' , result})
})

const deleteUser = deleteOne(userModel)

export {
    addUser,
    allUsers,
    oneUser,
    updateUser,
    deleteUser,
    adminUpdateUser
}
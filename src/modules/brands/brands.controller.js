import slugify from "slugify";
import { catchError } from "../../middleware/errorHandle.js";
import { brandsModel } from "../../../databases/models/brands.model.js";
import { handleError } from "../../utils/customError.js";
import { deleteOne } from "../handlers/factore.handler.js";

const addBrands = catchError(async (req , res , next)=>{
    const {name} = req.body
    const result = new brandsModel({name , slug:slugify(name) })
    await result.save()
    res.status(201).json({message:'Brand Added' , result})
})

const allBrands = catchError(async(req , res , next)=>{
    const result = await brandsModel.find({})
    res.status(201).json({message:'all Brands' , result})
})

const oneBrand = catchError(async(req , res , next)=>{
    const {id} = req.params
    const result = await brandsModel.findById(id)
    res.status(201).json({message:'Specific Brands' , result})
})

const updateBrands = catchError(async(req , res , next)=>{
    const {name} = req.body
    const {id} = req.params
    const result = await brandsModel.findByIdAndUpdate(id , {name , slug:slugify(name)} , {new:true})
    !result && next(new handleError('Brand Not Found' , 401))
    result && res.status(201).json({message:'Updated Successfully}' , result})
})

const deleteBrands = deleteOne(brandsModel)

export {
    addBrands,
    allBrands,
    oneBrand,
    updateBrands,
    deleteBrands
}
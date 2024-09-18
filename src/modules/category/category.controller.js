import slugify from 'slugify'
import { categoryModel } from "../../../databases/models/category.model.js"
import { handleError } from '../../utils/customError.js'
import { catchError } from '../../middleware/errorHandle.js'
import { deleteOne } from '../handlers/factore.handler.js'


const addCategory =catchError(async(req ,res , next)=>{
    let {name} = req.body
    const result = new categoryModel({name , slug:slugify(name)})
    await result.save()
    res.status(201).json({message:'Added Successfully' , result})
})

const allCategories = catchError(async(req , res , next)=>{
    const result = await categoryModel.find({})
    res.status(201).json({message:'all Category' , result})
})

const oneCategory = catchError(async(req , res, next)=>{
    let {id} = req.params
    const result = await categoryModel.findById(id)
    if (!result){
        return next(new handleError('Category Not Found' , 404))
    }
    res.status(201).json({message:'Specific Category' , result})
})

const deleteCategory = deleteOne(categoryModel)

const updateCategory = catchError(async(req , res , next)=>{
    let {id} = req.params
    let {name} = req.body
    const result = await categoryModel.findByIdAndUpdate(id , {name , slug:slugify(name)} , {new:true})
    if(!result){
       return next(new handleError('Category Not Found' , 404))
    }
    res.status(201).json({message:'Updated Successfully' , result})
})

export {
    addCategory,
    allCategories,
    oneCategory,
    deleteCategory,
    updateCategory
}
import slugify from 'slugify'
import { categoryModel } from "../../../databases/models/category.model.js"
import { handleError } from '../../utils/customError.js'
import { catchError } from '../../middleware/errorHandle.js'


const addCategory =catchError(async(req ,res , next)=>{
    let {name} = req.body
    const addedCateg = new categoryModel({name , slug:slugify(name)})
    await addedCateg.save()
    res.status(201).json({message:'Added Successfully' , addedCateg})
})

const allCategories = catchError(async(req , res , next)=>{
    const allCateg = await categoryModel.find({})
    res.status(201).json({message:'all Category' , allCateg})
})

const oneCategory = catchError(async(req , res, next)=>{
    let {id} = req.params
    const oneCateg = await categoryModel.findById(id)
    if (!oneCateg){
        return next(new handleError('Category Not Found' , 404))
    }
    res.status(201).json({message:'Specific Category' , oneCateg})
})

const deleteCategory = catchError(async(req , res , next)=>{
    let{id} = req.params
    const deleteCateg = await categoryModel.findByIdAndDelete(id)
    if(!deleteCateg){
       return next(new handleError('Category Not Found' , 404))
    }
    res.status(201).json({message:'Deleted Successfully' , deleteCateg})
})

const updateCategory = catchError(async(req , res , next)=>{
    let {id} = req.params
    let {name} = req.body
    const updateCateg = await categoryModel.findByIdAndUpdate(id , {name , slug:slugify(name)} , {new:true})
    if(!updateCateg){
       return next(new handleError('Category Not Found' , 404))
    }
    res.status(201).json({message:'Updated Successfully' , updateCateg})
})

export {
    addCategory,
    allCategories,
    oneCategory,
    deleteCategory,
    updateCategory
}
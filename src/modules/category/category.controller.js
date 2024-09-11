import slugify from 'slugify'
import { categoryModel } from "../../../databases/models/category.model.js"


const addCategory = async(req ,res)=>{
    let {name} = req.body
    const addedCateg = new categoryModel({name , slug:slugify(name)})
    await addedCateg.save()
    res.status(201).json({message:'Added Successfully' , addedCateg})
}

const allCategories = async(req , res)=>{
    const allCateg = await categoryModel.find({})
    res.status(201).json({message:'all Category' , allCateg})
}

const oneCategory = async(req , res)=>{
    let {id} = req.params
    const oneCateg = await categoryModel.findById(id)
    res.status(201).json({message:'Specific Category' , oneCateg})
}

const deleteCategory = async(req , res)=>{
    let{id} = req.params
    const deleteCateg = await categoryModel.findByIdAndDelete(id)
    res.status(201).json({message:'Deleted Successfully' , deleteCateg})
}

const updateCategory = async(req , res)=>{
    let {id} = req.params
    let {name} = req.body
    const updateCateg = await categoryModel.findByIdAndUpdate(id , {name , slug:slugify(name)})
    res.status(201).json({message:'Updated Successfully' , updateCateg})
}

export {
    addCategory,
    allCategories,
    oneCategory,
    deleteCategory,
    updateCategory
}
import slugify from "slugify";
import { subCategoryModel } from "../../../databases/models/subcategory.model.js";
import { catchError } from "../../middleware/errorHandle.js";

const addSubCategory = catchError(async (req , res , next)=>{
    const {name , category} = req.body
    const addSubCateg = new subCategoryModel({name , slug:slugify(name) , category})
    await addSubCateg.save()
    res.status(201).json({message:'SubCategory Added' , addSubCateg})
})

const allSubCategories = catchError(async(req , res , next)=>{
    let filter = {}
    if (req.params.categoryId){
        filter = {category:req.params.categoryId}
    }
    const allSubCateg = await subCategoryModel.find(filter)
    res.status(201).json({message:'all Category' , allSubCateg})
})

const oneSubCategory = catchError(async(req , res , next)=>{
    const {id} = req.params
    const oneSubCateg = await subCategoryModel.findById(id)
    res.status(201).json({message:'Specific Subcategory' , oneSubCateg})
})

const updateSubCategory = catchError(async(req , res , next)=>{
    const {name} = req.body
    const {id} = req.params
    const updateSubCateg = await subCategoryModel.findByIdAndUpdate(id , {name , slug:slugify(name)} , {new:true})
    !updateSubCateg && next(new handleError('subCategory Not Found' , 401))
    updateSubCateg && res.status(201).json({message:'Updated Successfully}' , updateSubCateg})
})

export {
    addSubCategory,
    allSubCategories,
    oneSubCategory,
    updateSubCategory
}
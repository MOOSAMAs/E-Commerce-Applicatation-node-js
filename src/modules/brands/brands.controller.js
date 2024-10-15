import slugify from "slugify";
import { catchError } from "../../middleware/errorHandle.js";
import { brandsModel } from "../../../databases/models/brands.model.js";
import { handleError } from "../../utils/customError.js";
import { deleteOne } from "../handlers/factore.handler.js";
import { apiFeatures } from "../../utils/apiFeatures.js";
import { uploadImageToCloudinary } from "../../utils/upload.img.cloud.js";

const addBrands = catchError(async (req , res , next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    if (req.file) {
        const logoUrl = await uploadImageToCloudinary(req.file.path, "brands/logos");
        req.body.logo = logoUrl;
      }
    const result = new brandsModel(req.body)
    await result.save()
    res.status(201).json({message:'Brand Added' , result})
})

const allBrands = catchError(async(req , res , next)=>{
    let ApiFeatures = new apiFeatures(brandsModel.find() , req.query)
    .filter().paginate().fields().search().sort()
    const result = await ApiFeatures.mongooseQuery
    res.status(201).json({message:'all Brands',page:ApiFeatures.page , result})
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
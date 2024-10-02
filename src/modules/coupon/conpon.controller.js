import qrcode from 'qrcode'
import { catchError } from "../../middleware/errorHandle.js";
import { handleError } from "../../utils/customError.js";
import { deleteOne } from "../handlers/factore.handler.js";
import { apiFeatures } from "../../utils/apiFeatures.js";
import { couponModel } from '../../../databases/models/coupon.model.js';

const addCoupons = catchError(async (req , res , next)=>{
    const result = new couponModel(req.body)
    await result.save()
    res.status(201).json({message:'Coupon Added' , result})
})

const allCoupons = catchError(async(req , res , next)=>{
    let ApiFeatures = new apiFeatures(couponModel.find() , req.query)
    .filter().paginate().fields().search().sort()
    const result = await ApiFeatures.mongooseQuery
    res.status(201).json({message:'all Coupons',page:ApiFeatures.page , result})
})

const oneCoupon = catchError(async(req , res , next)=>{
    const {id} = req.params
    const result = await couponModel.findById(id)
    let url = await qrcode.toDataURL(result.code)
    res.status(201).json({message:'Specific Coupon' , result , url})
})

const updateCoupons = catchError(async(req , res , next)=>{
    const {id} = req.params
    const result = await couponModel.findByIdAndUpdate(id ,req.body , {new:true})
    !result && next(new handleError('Coupon Not Found' , 401))
    result && res.status(201).json({message:'Updated Successfully}' , result})
})

const deleteCoupons = deleteOne(couponModel)

export {
    addCoupons,
    allCoupons,
    oneCoupon,
    updateCoupons,
    deleteCoupons
}
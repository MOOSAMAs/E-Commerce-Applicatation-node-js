import { catchError } from "../../middleware/errorHandle.js"
import { handleError } from "../../utils/customError.js"


export const deleteOne = (model)=>{
    return catchError(async(req , res , next)=>{
        let{id} = req.params
        const result = await model.findByIdAndDelete(id)
        if(!result){
           return next(new handleError('Document Not Found' , 404))
        }
        res.status(201).json({message:'Deleted Successfully' , result})
    })
}
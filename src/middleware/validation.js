import Joi from "joi"
import { globalError } from "./globalError.js"


export const validation = (schema)=>{
    return (req , res , next)=>{
        let inputs = {...req.body , ...req.params, ...req.query}
        let {error} = schema.validate(inputs , {abortEarly:false})
        if (error){
            let errors = error.details.map(details => details.message)
            res.json(errors)
        }else{
            next()
        }
    }
}
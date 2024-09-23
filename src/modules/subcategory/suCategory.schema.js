import Joi from 'joi'

const addSubCategorySchema = Joi.object({
    name:Joi.string().min(2).max(20).required()
})

const oneSubCategorySchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})

const updateSubCategorySchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    name:Joi.string().min(2).max(20).required()
})

export{
    addSubCategorySchema,
    oneSubCategorySchema,
    updateSubCategorySchema
}
import Joi from 'joi'

const addCategorySchema = Joi.object({
    name:Joi.string().min(2).max(20).required()
})

const oneCategorySchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})

const updateCategorySchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    name:Joi.string().min(2).max(20).required()
})

export{
    addCategorySchema,
    oneCategorySchema,
    updateCategorySchema
}
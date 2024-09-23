import Joi from 'joi'

const addBrandSchema = Joi.object({
    name:Joi.string().min(2).max(20).required()
})

const oneBrandSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
})

const updateBrandSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    name:Joi.string().min(2).max(20).required()
})

export{
    addBrandSchema,
    oneBrandSchema,
    updateBrandSchema
}
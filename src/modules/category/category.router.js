import express from 'express'
import * as category from './category.controller.js'
import subCategoryRouter from '../subcategory/subcategory.router.js'
import { validation } from '../../middleware/validation.js'
import { addCategorySchema, oneCategorySchema, updateCategorySchema } from './category.schema.js'
import { fileUpload } from '../../middleware/fileUpload.js'

const categoryRouter = express.Router()

categoryRouter.use('/:categoryId/subcategory' , subCategoryRouter)

categoryRouter.route('/')
.post(fileUpload('image' , 'category') ,validation(addCategorySchema),category.addCategory)
.get(category.allCategories)
categoryRouter.route('/:id')
.get(validation(oneCategorySchema) ,category.oneCategory)
.delete(validation(oneCategorySchema),category.deleteCategory)
.put(validation(updateCategorySchema),category.updateCategory)

export default categoryRouter

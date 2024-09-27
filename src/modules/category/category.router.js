import express from 'express'
import * as category from './category.controller.js'
import subCategoryRouter from '../subcategory/subcategory.router.js'
import { validation } from '../../middleware/validation.js'
import { addCategorySchema, oneCategorySchema, updateCategorySchema } from './category.schema.js'
import { fileUpload } from '../../middleware/fileUpload.js'
import { allowedTo, protectRoutes } from '../authentication/auth.controller.js'

const categoryRouter = express.Router()

categoryRouter.use('/:categoryId/subcategory' , subCategoryRouter)

categoryRouter.route('/')
.post(protectRoutes,allowedTo('admin') ,fileUpload('image' , 'category') ,validation(addCategorySchema),category.addCategory)
.get(category.allCategories)
categoryRouter.route('/:id')
.get(validation(oneCategorySchema) ,category.oneCategory)
.delete(protectRoutes,allowedTo('admin') ,validation(oneCategorySchema),category.deleteCategory)
.put(protectRoutes,allowedTo('admin') ,validation(updateCategorySchema),category.updateCategory)

export default categoryRouter

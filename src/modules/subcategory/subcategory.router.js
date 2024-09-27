import express from 'express'
import * as subcategory from './subcategory.controller.js'
import { addSubCategorySchema, oneSubCategorySchema, updateSubCategorySchema } from './suCategory.schema.js'
import { validation } from '../../middleware/validation.js'
import { allowedTo, protectRoutes } from '../authentication/auth.controller.js'

const subCategoryRouter = express.Router({mergeParams:true})

subCategoryRouter.route('/')
.post(protectRoutes,allowedTo('admin') ,validation(addSubCategorySchema),subcategory.addSubCategory)
.get(subcategory.allSubCategories)

subCategoryRouter.route('/:id')
.get(validation(oneSubCategorySchema),subcategory.oneSubCategory)
.put(protectRoutes,allowedTo('admin') ,validation(updateSubCategorySchema),subcategory.updateSubCategory)
.delete(protectRoutes,allowedTo('admin') ,validation(addSubCategorySchema),subcategory.deleteSubCategory)

export default subCategoryRouter
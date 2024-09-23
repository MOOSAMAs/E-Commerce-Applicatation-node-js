import express from 'express'
import * as subcategory from './subcategory.controller.js'
import { addSubCategorySchema, oneSubCategorySchema, updateSubCategorySchema } from './suCategory.schema.js'
import { validation } from '../../middleware/validation.js'

const subCategoryRouter = express.Router({mergeParams:true})

subCategoryRouter.route('/')
.post(validation(addSubCategorySchema),subcategory.addSubCategory)
.get(subcategory.allSubCategories)

subCategoryRouter.route('/:id')
.get(validation(oneSubCategorySchema),subcategory.oneSubCategory)
.put(validation(updateSubCategorySchema),subcategory.updateSubCategory)
.delete(validation(addSubCategorySchema),subcategory.deleteSubCategory)

export default subCategoryRouter
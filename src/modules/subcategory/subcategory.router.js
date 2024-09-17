import express from 'express'
import * as subcategory from './subcategory.controller.js'

const subCategoryRouter = express.Router({mergeParams:true})

subCategoryRouter.route('/')
.post(subcategory.addSubCategory)
.get(subcategory.allSubCategories)

subCategoryRouter.route('/:id')
.get(subcategory.oneSubCategory)
.put(subcategory.updateSubCategory)

export default subCategoryRouter
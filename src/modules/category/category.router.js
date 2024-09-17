import express from 'express'
import * as category from './category.controller.js'
import subCategoryRouter from '../subcategory/subcategory.router.js'

const categoryRouter = express.Router()

categoryRouter.use('/:categoryId/subcategory' , subCategoryRouter)

categoryRouter.route('/')
.post(category.addCategory)
.get(category.allCategories)
categoryRouter.route('/:id')
.get(category.oneCategory)
.delete(category.deleteCategory)
.put(category.updateCategory)

export default categoryRouter
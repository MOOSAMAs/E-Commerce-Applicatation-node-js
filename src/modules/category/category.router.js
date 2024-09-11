import express from 'express'
import { addCategory, allCategories, deleteCategory, oneCategory, updateCategory } from './category.controller.js'

const categoryRouter = express.Router()

categoryRouter.route('/')
.post(addCategory)
.get(allCategories)
categoryRouter.route('/:id')
.get(oneCategory)
.delete(deleteCategory)
.put(updateCategory)

export default categoryRouter
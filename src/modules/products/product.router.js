import express from 'express'
import * as product from './product.controller.js'
import { upoloadMixOfFiles } from '../../middleware/fileUpload.js'
import { protectRoutes } from '../authentication/auth.controller.js'

let data = [{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 7 }]
const productRouter = express.Router()

productRouter.route('/')
.post(protectRoutes ,upoloadMixOfFiles(data , 'products'),product.addProduct)
.get(protectRoutes ,product.allProducts)

productRouter.route('/:id')
.get(product.oneProduct)
.put(product.updateProduct)
.delete(product.deleteProduct)

export default productRouter

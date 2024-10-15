import express from 'express'
import * as product from './product.controller.js'
import { uploadMixOfFiles } from '../../middleware/fileUpload.js'
import { allowedTo, protectRoutes } from '../authentication/auth.controller.js'

let data = [{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 7 }]
const productRouter = express.Router()

productRouter.route('/')
.post(protectRoutes,allowedTo('user') ,uploadMixOfFiles(data , 'products'),product.addProduct)
.get(product.allProducts)

productRouter.route('/:id')
.get(product.oneProduct)
.put(protectRoutes,allowedTo('user'),product.updateProduct)
.delete(protectRoutes,allowedTo('admin'),product.deleteProduct)

export default productRouter

import express from 'express'
import * as product from './product.controller.js'
import { upoloadMixOfFiles } from '../../middleware/fileUpload.js'

let data = [{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 7 }]
const productRouter = express.Router()

productRouter.route('/')
.post(upoloadMixOfFiles(data , 'products'),product.addProduct)
.get(product.allProducts)

productRouter.route('/:id')
.get(product.oneProduct)
.put(product.updateProduct)
.delete(product.deleteProduct)

export default productRouter

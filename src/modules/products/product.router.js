import express from 'express'
import * as product from './product.controller.js'

const productRouter = express.Router()

productRouter.route('/')
.post(product.addProduct)
.get(product.allProducts)

productRouter.route('/:id')
.get(product.oneProduct)
.put(product.updateProduct)
.delete(product.deleteProduct)

export default productRouter

import express from 'express'
import * as brands from './brands.controller.js'

const brandsRouter = express.Router()

brandsRouter.route('/')
.post(brands.addBrands)
.get(brands.allBrands)

brandsRouter.route('/:id')
.get(brands.oneBrand)
.put(brands.updateBrands)
.delete(brands.deleteBrands)

export default brandsRouter

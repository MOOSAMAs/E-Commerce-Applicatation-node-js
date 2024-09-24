import express from 'express'
import * as brands from './brands.controller.js'
import { validation } from '../../middleware/validation.js'
import { addBrandSchema, oneBrandSchema, updateBrandSchema } from './brands.schema.js'
import { fileUpload } from '../../middleware/fileUpload.js'

const brandsRouter = express.Router()

brandsRouter.route('/')
.post(fileUpload('logo' , 'brands'),validation(addBrandSchema), brands.addBrands)
.get(brands.allBrands)

brandsRouter.route('/:id')
.get(validation(oneBrandSchema),brands.oneBrand)
.put(validation(updateBrandSchema),brands.updateBrands)
.delete(validation(oneBrandSchema),brands.deleteBrands)

export default brandsRouter

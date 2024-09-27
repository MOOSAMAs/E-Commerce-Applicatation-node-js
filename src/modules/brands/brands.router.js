import express from 'express'
import * as brands from './brands.controller.js'
import { validation } from '../../middleware/validation.js'
import { addBrandSchema, oneBrandSchema, updateBrandSchema } from './brands.schema.js'
import { fileUpload } from '../../middleware/fileUpload.js'
import { allowedTo, protectRoutes } from '../authentication/auth.controller.js'

const brandsRouter = express.Router()

brandsRouter.route('/')
.post(protectRoutes,allowedTo('admin') ,fileUpload('logo' , 'brands'),validation(addBrandSchema), brands.addBrands)
.get(brands.allBrands)

brandsRouter.route('/:id')
.get(validation(oneBrandSchema),brands.oneBrand)
.put(protectRoutes,allowedTo('admin') ,validation(updateBrandSchema),brands.updateBrands)
.delete(protectRoutes,allowedTo('admin') ,validation(oneBrandSchema),brands.deleteBrands)

export default brandsRouter

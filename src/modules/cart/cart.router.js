import express from 'express'
import { allowedTo, protectRoutes } from '../authentication/auth.controller.js'
import * as cart  from './cart.controller.js'

const cartRouter = express.Router()

cartRouter.route('/')
.post(protectRoutes , allowedTo('user') , cart.addProductToCart)

cartRouter.post('/applyCoupon' ,protectRoutes , allowedTo('user') , cart.applyCoupon)

cartRouter.route('/:id')
.delete(protectRoutes , allowedTo('user') , cart.deleteProductFromCart)
.put(protectRoutes , allowedTo('user') , cart.updateQuantity)


export default cartRouter
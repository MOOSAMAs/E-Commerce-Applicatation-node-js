import express from 'express'
import { allowedTo, protectRoutes } from '../authentication/auth.controller.js'
import * as cart  from './cart.controller.js'

const cartRouter = express.Router()

cartRouter.route('/')
.post(protectRoutes , allowedTo('user') , cart.addProductToCart)

export default cartRouter
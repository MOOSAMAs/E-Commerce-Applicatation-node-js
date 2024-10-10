import express from 'express'
import * as order from './order.controller.js'
import { allowedTo, protectRoutes } from '../authentication/auth.controller.js'

const orderRouter = express.Router()

orderRouter.route('/:id')
.post(protectRoutes , allowedTo('user') , order.createCashOrder)

orderRouter.route('/')
.get(protectRoutes , allowedTo('user') , order.getUserOrders)

orderRouter.route('/all')
.get(protectRoutes , allowedTo('user') , order.getAllOrders)

orderRouter.route('/checkOut/:id')
.post(protectRoutes , allowedTo('user') , order.checkoutSession)
export default orderRouter
import express from 'express'
import * as order from './order.controller.js'
import { allowedTo, protectRoutes } from '../authentication/auth.controller.js'

const orderRouter = express.Router()

orderRouter.route('/:id')
.post(protectRoutes , allowedTo('user') , order.createCashOrder)

export default orderRouter
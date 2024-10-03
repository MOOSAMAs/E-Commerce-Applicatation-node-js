import express from 'express'
import * as coupons from './coupon.controller.js'
import { allowedTo, protectRoutes } from '../authentication/auth.controller.js'

const couponsRouter = express.Router()

couponsRouter.route('/')
.post(protectRoutes,allowedTo('user') , coupons.addCoupons)
.get(coupons.allCoupons)

couponsRouter.route('/:id')
.get(coupons.oneCoupon)
.put(protectRoutes,allowedTo('user'),coupons.updateCoupons)
.delete(protectRoutes,allowedTo('user') ,coupons.deleteCoupons)

export default couponsRouter

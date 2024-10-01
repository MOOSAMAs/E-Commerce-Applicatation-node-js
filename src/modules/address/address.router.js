import express from 'express'
import * as address from './address.controller.js'
import { allowedTo, protectRoutes } from '../authentication/auth.controller.js'

const addressRouter = express.Router()
addressRouter.route('/')
.patch(protectRoutes,allowedTo('user') ,address.addAdress)
.delete(protectRoutes,allowedTo('user'),address.deleteAddress)
.get(protectRoutes,allowedTo('user'),address.getAllAddress)

export default addressRouter

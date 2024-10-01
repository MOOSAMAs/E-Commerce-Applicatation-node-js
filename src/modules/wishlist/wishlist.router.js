import express from 'express'
import * as wishlist from './wishlist.controller.js'
import { allowedTo, protectRoutes } from '../authentication/auth.controller.js'

const wishlistRouter = express.Router()
wishlistRouter.route('/')
.patch(protectRoutes,allowedTo('user') ,wishlist.addToWishlist)
.delete(protectRoutes,allowedTo('user'),wishlist.deleteFromWishlist)
.get(protectRoutes,allowedTo('user'),wishlist.getAllWishlist)

export default wishlistRouter

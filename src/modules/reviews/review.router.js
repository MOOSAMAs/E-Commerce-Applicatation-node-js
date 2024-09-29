import express from 'express'
import * as reviews from './review.controller.js'
import { allowedTo, protectRoutes } from '../authentication/auth.controller.js'
import { checkProductExists } from '../../middleware/productExist.js'

const reviewsRouter = express.Router()

reviewsRouter.route('/')
.post(protectRoutes,allowedTo('user'),checkProductExists, reviews.addReviews)
.get(reviews.allReviews)

reviewsRouter.route('/:id')
.get(reviews.oneReview)
.put(protectRoutes,allowedTo('user') ,reviews.updateReviews)
.delete(protectRoutes,allowedTo('admin' , 'user'),reviews.deleteReviews)

export default reviewsRouter

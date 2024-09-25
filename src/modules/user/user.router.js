import express from 'express'
import * as user from './user.controller.js'

const userRouter = express.Router()

userRouter.route('/')
.post(user.addUser)
.get(user.allUsers)

userRouter.route('/:id')
.get(user.oneUser)
.put(user.updateUser)
.delete(user.deleteUser)

userRouter.patch('/adminUpdateUser/:id' , user.adminUpdateUser)

export default userRouter

import express from 'express'
import authorizeMiddleware from '../middleware/auth.middleware.js'
import { userController } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.get('/', authorizeMiddleware, userController)

export default userRouter
import express from 'express'

const userRouter = express.Router()

userRouter.get('/', authorizeMiddleware,)

export default userRouter
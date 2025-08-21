import express from 'express'
import authRouter from './auth.route.js'
import bookRouter from './book.routes.js'
import borrowRouter from './borrow.routes.js'
import userRouter from './user.routes.js'
import feedbackRouter from './feedback.route.js'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/book',bookRouter)
router.use('/process', borrowRouter)
router.use('/user', userRouter)
router.use('/feedback', feedbackRouter)

export default router
import express from 'express'
import { getFeedback, submitFeedback } from '../controllers/feedback.controller.js'
import { VerifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/submit', VerifyJWT, submitFeedback)
router.get('/getFeedback', VerifyJWT, getFeedback)

export default router
import express from 'express'
import { borrowBook, returnBook, getBorrowBook, getBorrowedBookDetails, getBorrowedBookById, getBorrowBookByUserID, renewBook } from '../controllers/borrow.controller.js'
import { checkRole, isDeleted, VerifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/borrowBook/:bookId', VerifyJWT, checkRole(['borrower']),  borrowBook)
router.put('/returnBook/:borrowId', VerifyJWT, checkRole(['borrower']), returnBook)
router.get('/get', getBorrowBook)
router.get('/getBorrowedBook/:userId', getBorrowedBookById)
router.get('/getBorrowedDetailed', getBorrowedBookDetails)
router.get('/getBorrowBookByUserID/:userId', getBorrowBookByUserID)
router.put('/renew/:id', renewBook)

export default router
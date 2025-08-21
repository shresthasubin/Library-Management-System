import express from 'express'
import { addBook, getAllBook, updateBook, deleteBook } from '../controllers/book.controller.js'
import { checkRole, VerifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../utils/imageUpload.utils.js'
const router = express.Router()

router.post('/add', VerifyJWT, checkRole(['librarian']), upload.single('bookImage'), addBook)
router.get('/get', VerifyJWT, checkRole(['librarian', 'borrower']), getAllBook)
router.put('/update/:id', VerifyJWT, checkRole(['librarian']), upload.single('bookImage'), updateBook)
router.delete('/delete/:id', VerifyJWT, checkRole(['librarian']), deleteBook)

export default router
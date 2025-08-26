import express from 'express'
import { registerUser, deleteUser, getAllUser, updateUser, getUserById, toggleDeleteUser } from '../controllers/user.controller.js'
import { VerifyJWT, checkRole, isDeleted } from '../middlewares/auth.middleware.js'
import { upload } from '../utils/imageUpload.utils.js' 

const router = express.Router()

router.post('/register', upload.single('profileImage'), registerUser)
router.get('/get', [VerifyJWT, isDeleted(), checkRole(['librarian'])], getAllUser)
router.get('/getUser', [VerifyJWT, isDeleted(), checkRole(['librarian','borrower'])], getUserById)
router.put('/update/:id', VerifyJWT, isDeleted(), upload.single('profileImage'), updateUser)
router.delete('/delete/:id', [VerifyJWT, checkRole(['librarian'])], deleteUser)
router.delete('/put/:userId', [VerifyJWT, checkRole(['librarian'])], toggleDeleteUser)

export default router
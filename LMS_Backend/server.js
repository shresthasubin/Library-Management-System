import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './src/database/db.js'
import router from './src/routes/index.js'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import User from './src/models/user.model.js'
import cors from 'cors'

dotenv.config()

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))



// DB connection status
dbConnection()
.then(() => {
    app.listen(port, () => {
        console.log(`App is listening at http://localhost:${port}`)
    })
    seedLibrarian()
})
.catch(err => {
    console.log('Connection error', err.message)
    process.exit(1)
})

app.use('/api',router)

const seedLibrarian = async() => {
    try {
        const librarian = await User.findOne({email: 'librarian_admin@gmail.com'})
        if (!librarian) {
            const hashedPassword = await bcrypt.hash('librarian', 10)
    
            await User.create({
                name: 'Saint Gorden',
                email: 'librarian_admin@gmail.com',
                password: hashedPassword,
                role: 'librarian',
                profileImage: 'spider.png',
                isDeleted: false
            })
        }
    } catch (error) {
        console.log('Seed data failed', error.message)
    }
}

export default app
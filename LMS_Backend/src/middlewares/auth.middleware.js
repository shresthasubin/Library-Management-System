import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const VerifyJWT = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized user'
            })
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findById(decodedToken._id).select('-password')

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid token'
            })
        }

        req.user = user
        next()
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Token expired or not valid'
        })
    }
}

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                success: false,
                message: 'Not permitted'
            })
        }
        next()
    }
}

const isDeleted = () => {
    return (req, res, next) => {
        if (req.user.isDeleted) {
            return res.status(401).json({
                success: false,
                message: 'User has been deleted'
            })
        }
        next()
    }
}

export {VerifyJWT, checkRole, isDeleted}
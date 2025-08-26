import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    try {
        const {email, password, name} = req.body

        // check if user exist 
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: 'User with email already exist, please try with another email'
            })
        }

        const role = "borrower"

        // encrypting password
        const hashedPassword = await bcrypt.hash(password, 10);

        // setting profile image only if provided by user else default profile
        const profileImage = req.file?.path

        // creating and saving data 
        const userData = new User({email, password: hashedPassword, role, name, profileImage})
        await userData.save()

        // finding the same data to show user without password 
        const savedData = await User.findOne({ email: email}).select('-password')

        return res.status(201).json({
            success: true,
            message: 'User registered successfylly',
            data: savedData
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'server failed while registering user',
            error: err.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        const userExist = await User.findOne({email: email}).select('+password +isDeleted')
        if (userExist.isDeleted) {
            return res.status(401).json({
                success: false,
                message: 'User has been removed'
            })
        }
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: 'User with email doesnot exist, please register or try logging in with another account'
            })
        }

        const isMatch = await bcrypt.compare(password, userExist.password)

        if (!isMatch) {
            return res.status(400).json({
                success: 'false',
                message: 'Password Incorrect'
            })
        }

        const token = jwt.sign(
            {
                _id: userExist._id,
                email: userExist.email
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '1h'
            }
        )

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + 3_600_000),
            secure: process.env.NODE_ENV === 'production'
        })

        return res.status(201).json({
            success: true,
            message: 'Login Successful 🎉',
            data: {
                userExist,
                token
            }
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server failed while logging in user',
            error: err.message
        })
    }
}

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params
        // const user = await User.findByIdAndDelete(id)
        const user = await User.findById(id)
        if (user.role !== 'librarian') {
            user.isDeleted = true
        }
        await user.save()
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid id'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server failed while deleting user',
            error: err.message
        })
    }
}

const toggleDeleteUser = async (req, res) => {
    try {
        const {userId} = req.params
        const user = await User.findById(userId)
        let updateingUser;
        if (user.role !== 'librarian') {
            updateingUser = await User.findByIdAndUpdate(
                userId,
                {
                    isDeleted: !user.isDeleted
                },
                {
                    new: true,
                    runValidators: true
                }
            )
        } else {
            return res.status(400).json({
                success: false,
                message: 'Librarian cannot be deleted'
            })
        }

        if (!updateingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with id doesnot exist'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'User has been activated'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error: cannot toggle delete'
        })
    }
}

const getAllUser = async(req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: users
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server failed while retrieving users'
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.user?.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User with id not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'User with Id has been fetched',
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'No user found server error',
            error: err
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const user = req.body
        const {id} = req.params

        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10)
        }
        const profileImage = req.file?.path
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            {
                ...user, 
                role: req.user.role === 'librarian' ? 'librarian' : 'borrower',
                profileImage: profileImage
            }, 
            {
                new: true,
                runValidators: true
            }
        )

        if (! updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User with id not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server failed while updating user',
            error: err.message
        })
    }
}

const logoutUser = async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
    .clearCookie('token', options)
    .json({
        success: true,
        message: 'User logged out successful',
    })
}

export {registerUser, loginUser, deleteUser, getAllUser, updateUser, logoutUser, getUserById, toggleDeleteUser}
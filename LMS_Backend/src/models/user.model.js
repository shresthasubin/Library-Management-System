import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]

    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "borrower",
        enum: ["borrower", "librarian"]
    },
    name: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
export default User
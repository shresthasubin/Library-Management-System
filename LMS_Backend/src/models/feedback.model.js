import mongoose from 'mongoose'

const feedbackSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    feedback: {
        type: String
    },
    profileImage: {
        type: String,
        default: ''
    }
}, {timestamps: true})

const Feedback = mongoose.model('Feedback', feedbackSchema)
export default Feedback
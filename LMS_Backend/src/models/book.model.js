import mongoose, {Schema} from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        unique: true,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    available: {
        type: Number,
        default: 0
    },
    bookImage: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    }
}, {timestamps: true})

const Book = mongoose.model('Book', bookSchema)
export default Book
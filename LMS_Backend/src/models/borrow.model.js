import mongoose, {Schema} from 'mongoose';

const borrowSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: null
    },
    isReturned: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date
    }
}, {timestamps: true})

const Borrow = mongoose.model('Borrow', borrowSchema)
export default Borrow
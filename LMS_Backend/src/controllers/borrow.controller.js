import Book from "../models/book.model.js";
import Borrow from "../models/borrow.model.js";
import User from "../models/user.model.js";
import mongoose from 'mongoose';

const borrowBook = async (req, res) => {
    try {
        const {bookId} = req.params
        if (!bookId) {
            return res.status(400).json({
                success: false,
                message: 'Borrrow: Please provide ID of the book'
            })
        }

        const book = await Book.findById(bookId)
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Borrrow: Book with id not found'
            })
        }

        const user = await User.findById(req.user?._id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Borrrow: unauthorized user'
            })
        }

        const borrowLimit = await Borrow.find({userId: req.user._id, returnDate: null})
        if (borrowLimit.length >= 3) {
            return res.status(400).json({
                success: false,
                message: 'Book cannot be borrowed more than 3'
            })
        }

        const bookBorrowedAlready = await Borrow.findOne({
            userId: user._id,
            bookId: book._id,
            isReturned: false,
            returnDate: null
        })

        if (bookBorrowedAlready && bookBorrowedAlready.isReturned === false) {
            return res.status(400).json({
                success: false,
                message: 'Book has been already borrowed by user'
            })
        }

        if (book.available > 0) {
            book.available -= 1
            book.rating += 0.5
            await book.save()
        } else {
            return res.status(400).json({
                success: false,
                message: 'Book cannot be borrowed'
            })
        }
        const borrowDate = new Date()
        const borrow = new Borrow({
            bookId:book._id,
            userId:user._id,
            borrowDate: new Date(),
            returnDate: null,
            isReturned: false,
            dueDate : new Date(borrowDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        })  
        await borrow.save()

        return res.status(200).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'server error while borrowing book',
            error: err.message
        })
    }
}

const returnBook = async (req, res) => {
    try {
        const {borrowId} = req.params
        const returningBook = await Borrow.findById(borrowId)
        if (!returningBook) {
            return res.status(404).json({
                success: false,
                message: 'Return: Book with id has not been borrowed'
            })
        }

        const book = await Book.findById(returningBook.bookId)
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Return: Book with id not found'
            })
        }

        book.available += 1

        returningBook.returnDate = new Date()
        returningBook.isReturned = true

        await Promise.all([book.save(), returningBook.save()])

        return res.status(200).json({
            success: true,
            message: 'Book returned successfully'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server failed while returning books',
            error: err.message
        })
    }
}

const getBorrowBook = async(req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : null
        let borrowedBook;
        if (limit) {
            borrowedBook = await Borrow.find().limit(limit)
        } else {
            borrowedBook = await Borrow.find()
        }
        return res.status(200).json({
            success: true,
            message: 'Borrowed books fetched',
            data: borrowedBook
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Book borrowing failed server crash',
            error: error
        })
    }

}

const getBorrowedBookDetails = async (req, res) => {
    try {
        const borrow = await Borrow.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {$unwind: '$user'},
            {
                $lookup: {
                    from: 'books',
                    localField: 'bookId',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind: '$book'
            }
        ])

        return res.status(200).json({
            success: true,
            message: 'All book fetched',
            data: borrow
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'cannot retrieved borrowed book details',
            error: error.message
        })
    }
}

const getBorrowedBookById = async (req, res) =>{
    try {
        const {userId} = req.params
        const borrowedBook = await Borrow.find({userId: userId})
        if (!borrowedBook) {
            return res.status(404).json({
                success: false,
                message: 'User has not borrowed book'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Book fetched by id successfully',
            data: borrowedBook
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server failed in fetching book by id',
            error: err
        })
    }
}

const getBorrowBookByUserID = async (req, res) => {
    try {
        const {userId} = req.params
        const borrow = await Borrow.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'bookId',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind: '$book'
            },
            {
                $project:{
                    _id: 1,
                    bookId: 1,
                    userId: 1,
                    borrowDate: 1,
                    returnDate: 1,
                    isReturned: 1,
                    dueDate:1,
                    'book.title': 1,
                    'book.author': 1,
                    'book.rating': 1,
                    'book.bookImage': 1,
                    'book.description': 1,
                }
            }
        ])

        return res.status(200).json({
            success: true,
            message: 'book borrowed successfully through email',
            data: borrow
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed retrieving data through email',
            error: err
        })
    }
}

const renewBook = async(req, res) => {
    try {
        const {id} = req.params
        const borrowDate = new Date()
        const borrowedBook = await Borrow.findByIdAndUpdate(
            id,
            {
                borrowDate: borrowDate,
                dueDate: new Date(borrowDate.getTime() + 7 * 24 * 60 * 60 * 1000)
            }
        )

        if (!borrowedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Renewed successfully'
        })

    } catch (err) {
        console.log(err)
        return res.status(200).json({
            success: false,
            message: 'server failed while renewing book'
        })
    }
}
export { borrowBook, returnBook, getBorrowBook, getBorrowedBookDetails, getBorrowedBookById, getBorrowBookByUserID, renewBook }
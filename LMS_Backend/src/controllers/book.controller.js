import Book from '../models/book.model.js'
import Borrow from '../models/borrow.model.js'

const addBook = async (req, res) => {
    try {
        const {title, author, isbn, quantity, description} = req.body
        if (!title || !author || !isbn || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'All fields i.e. title, author, isbn and quantity must be filled out'
            })
        }

        const rating = 0
        const bookImage = req.file?.path

        const newBook = new Book({
            title,
            author,
            isbn,
            quantity,
            available: quantity,
            bookImage: bookImage,
            rating,
            description: description || 'No Description Given'
        })

        await newBook.save()

        return res.status(201).json({
            success: true,
            message: 'Book added successfully',
            data: newBook
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'cannot add book',
            error: err.message
        })
    }
}

const getAllBook = async (req, res) => {
    const limit = req.query?.limit ? parseInt(req.query.limit) : null
    let books
    if (limit) {
        books = await Book.find().sort({rating: -1}).limit(limit)
    } else {
        books = await Book.find()
    }
    return res.status(200).json({
        success: true,
        message: 'Books fetched successfully',
        data: books
    })
}

const updateBook = async (req, res) => {
    try {
        const {id} = req.params
        const book = await Borrow.find({bookId: id})
        const { title, author, isbn, quantity, description } = req.body
        const bookImage = req.file?.path

        const updatedBook = await Book.findByIdAndUpdate(id, {title, author, isbn, quantity, available: quantity - book.length, bookImage, description}, {new: true, runValidators: true})

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: 'Updating error: Book not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Serrver failed while updating book'
        })
    }
}

const deleteBook = async (req, res) => {
    try {
        const {id} = req.params
        const deleteBook = await Book.findByIdAndDelete(id)
        if (!deleteBook) {
            return res.status(400).json({
                success: false,
                message: 'While deleting, ID not found'
            })
        }
    
        return res.status(200).json({
            success: true,
            message: 'Successfully Deleted'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server failed while deleting book',
            error: error.response.data
        })
    }
}


export {addBook, getAllBook, updateBook, deleteBook}
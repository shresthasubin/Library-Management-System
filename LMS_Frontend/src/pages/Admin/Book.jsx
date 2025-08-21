import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/Admin/Sidebar.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaSearch, FaStar } from 'react-icons/fa'
import { publicAPI } from '../../utils/config.js'


const Book = () => {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")
  const regex = new RegExp(search, 'i')
  console.log(books)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    quantity: 0,
    description: ''
  })
  const [bookImage, setBookImage] = useState(null)
  const [editId, setEditId] = useState(null)

  const fetchBook = async () => {
    try {
      const res = await publicAPI.get('/book/get')
      setBooks(res.data.data)
    } catch (err) {
      console.error('Error fetching Book', err)
    }
  }

  const handleChange = (e) => {
    const {name, value, type, files} = e.target
    if (type === 'file') {
      setBookImage(files[0])
    } else {
      setFormData(prev => ({...prev, [name]:value}))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        console.log(key, value)
        data.append(key, value)
      })
      if(bookImage) {
        data.append('bookImage', bookImage)
      }

      if (editId) {
        await publicAPI.put(`/book/update/${editId}`, data)
        toast.success('Book updated successfully', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false
        })
      } else {
        await publicAPI.post(`/book/add`, data)
        toast.success('Book added successfully', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false
        })
      }
      setEditId(null)
      setFormData({
        title: '',
        author: '',
        isbn: '',
        quantity: 0,
        description: ''
      })
      fetchBook()
      setBookImage(null)
    } catch (error) {
      console.error('Error update || create', error)
      toast.error(error, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    }
  }

  const handleDelete = async (id) => {
    try {
      await publicAPI.delete(`/book/delete/${id}`)
      toast.success('Deleted Successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    } catch (error) {
      console.error('Failed deleting book', error)
      toast.error('Deletion failed', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    }
  }

  const handleEdit = (book) => {
    setEditId(book._id)
    setFormData({
      title: book.title || '',
      author: book.author || '',
      isbn: book.isbn || '',
      quantity: book.quantity || 0,
      description: book.description || '',
    })
  }

  const handleCancelEdit = () => {
    setEditId(null)
    setFormData({
      title: '',
      author: '',
      isbn: '',
      quantity: 0,
      description: ''
    })
  }
  

  useEffect(() => {
    fetchBook();
  },[])

  return (
    <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1 text-white flex flex-col gap-[30px]'>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className='flex flex-col gap-[8px]'>
          <div className='w-[650px] flex justify-between items-center'>
            <label>Title</label>
            <input 
              type="text"
              name='title'
              placeholder='Book Name...'
              value={formData.title} 
              onChange={handleChange}
              required
            />
          </div>
          <div className='w-[650px] flex justify-between items-center'>
            <label>Author</label>
            <input 
              type="text"
              name='author'
              placeholder='Author name...'
              value={formData.author} 
              onChange={handleChange}
              required
            />
          </div>
          <div className='w-[650px] flex justify-between items-center'>
            <label>ISBN</label>
            <input 
              type="text"
              name='isbn'
              placeholder='123*******'
              value={formData.isbn} 
              onChange={handleChange}
              required
            />
          </div>
          <div className='w-[650px] flex justify-between items-center'>
            <label>Quantity</label>
            <input 
              type="number"
              name='quantity'
              placeholder='0'
              value={formData.quantity} 
              onChange={handleChange}
              required
            />
          </div>
          <div className='w-[650px] flex justify-between items-center'>
            <label>Description</label>
            <textarea 
              type="text"
              name='description'
              placeholder='Book description...'
              value={formData.description} 
              onChange={handleChange}
              required
            />
          </div>
          <div className='w-[650px] flex justify-between items-center'>
            <label>Book Image</label>
            <input 
              type='file'
              name='bookImage'
              accept='image/*'
              onChange={handleChange}
              required
            />
          </div>
          <button type='submit' className='add-book-btn bg-[#4CAF50] w-[650px] rounded-[12px]'>{editId? 'EDIT BOOK':'ADD BOOK'}</button>
          {editId && <button type='submit' onClick={handleCancelEdit} className='h-[30px] font-bold hover:bg-red-700 bg-red-600 w-[650px] rounded-[12px]'>Cancel Edit</button>}
        </form>
        <div className='w-full flex flex-col gap-[16px]'>
          <p className='text-2xl font-bold'>Explore Books</p>
          <div className='relative'>
            <input type="text" value={search} placeholder='Search books here...' onChange={(e) => setSearch(e.target.value)} className='search-bar'/>
            <p className='absolute top-[12px] left-[12px] text-gray-500'><FaSearch/></p>
          </div>
          <div className='w-full h-fit flex flex-wrap gap-[24px]'>
            {
              books
              .filter(book => regex.test(book.title) || regex.test(book.author))
              .map((book) => {
                 return <div key={book._id} className='book-container'>
                  <img src={`http://localhost:3000/${book.bookImage}`} alt="book image" className='book-image w-full h-full rounded-[14px]'/>
                  <div className="book-overlay"></div>
                  <div className='book-text-container w-full flex flex-col gap-[4px]'>
                    <p className='font-[600] text-[20px] texxt-[#FFFFFF]'>{book.title}</p>
                    <p className='font-[600] text-sm italic text-[#CCCCCC]'>{book.author}</p>
                    <p className='text-[13px] font-[500] w-fit text-white bg-[#4CAF50] rounded-md'>Available: {book.available}/{book.quantity}</p>
                    <p className='text-[13px] font-[600] w-[40px] text-white bg-[#FFD60A] rounded-md flex gap-[4px] items-center justify-center'><FaStar/>{book.rating}</p>
                    <div className='flex justify-evenly gap-[4px]'>
                      <button type='button' className='edit-btn' onClick={() => handleEdit(book)}>Edit</button>
                      <button type='button' className='dlt-btn' onClick={() => handleDelete(book._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              })
            }
            {
              books.length === 0 && <p className='text-2xl font-bold'>No books found</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book

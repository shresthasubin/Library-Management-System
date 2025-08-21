import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/User/Sidebar'
import {privateAPI, publicAPI} from '../../utils/config.js'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { FaSearch, FaStar } from 'react-icons/fa'

const UserDashboard = () => {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const user = JSON.parse(Cookies.get('user'))
  const [borrowedBook, setBorrowedBook] = useState([])
  const regex = new RegExp(search, 'i');

  const borrowed = borrowedBook.filter(book => book.isReturned === false).length
  const returned = borrowedBook.filter(book => book.isReturned === true).length

  const fetchBook = async () => {
    const res = await publicAPI.get('/book/get')
    setBooks(res.data.data)
  }

  const fetchBorrowedBook = async () => {
    const res = await publicAPI.get(`/process/getBorrowedBook/${user._id}`)
    console.log(res.data.data)
    setBorrowedBook(res.data.data)
  }

  const handleBorrowBook = async (id) => {
    try {
      await privateAPI.post(`process/borrowBook/${id}`)
      toast.success('Book borrowed successfully',{
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
      fetchBook() 
      fetchBorrowedBook()
    } catch (err) {
      console.log(err.message)
      toast.error(err.response?.data.message || 'Book cannot be borrowed', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    }
  }

  useEffect(() => {
    fetchBook()
    fetchBorrowedBook()
  },[])

  return (
    <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1 text-white flex flex-col gap-[30px]'>
        <p className='text-3xl font-bold'>Welcome, <span className='text-[#4CAF50]'>{user.name}</span>!</p>
        <div className='status-content w-full h-[100px] flex justify-evenly items-center'>
          <div className='text-2xl font-bold text-[#4CAF50] flex items-center justify-center flex-col'>
            <p>{borrowed}</p>
            <p className='text-white font-semibold'>Borrow</p>
          </div>
          <div className='text-2xl font-bold text-[#4CAF50] flex items-center justify-center flex-col'>
            <p>{returned}</p>
            <p className='text-white font-semibold'>Return</p>
          </div>
        </div>
        <div className='relative'>
          <input type="text" value={search} placeholder='Search books here...' onChange={(e) => setSearch(e.target.value)} className='search-bar'/>
          <p className='absolute top-[12px] left-[12px] text-gray-500'><FaSearch/></p>
        </div>
        <div className='flex flex-wrap gap-[24px]'>
          {
            books
            .filter(book => regex.test(book.title) || regex.test(book.author))
            .map(book => {
              return<div key={book._id} className='book-container'>
                      <img src={`http://localhost:3000/${book.bookImage}`} alt="book image" className='book-image w-full h-full rounded-[14px]'/>
                      <div className="book-overlay"></div>
                      <div className='book-text-container w-full flex flex-col gap-[4px]'>
                        <p className='font-[600] text-[20px] texxt-[#FFFFFF]'>{book.title}</p>
                        <p className='font-[600] text-sm italic text-[#CCCCCC]'>{book.author}</p>
                        <p className='text-[13px] font-[500] w-fit text-white bg-[#4CAF50] rounded-md'>Available: {book.available}/{book.quantity}</p>
                        <p className='text-[13px] font-[600] w-[40px] text-white bg-[#FFD60A] rounded-md flex gap-[4px] items-center justify-center'><FaStar/>{book.rating}</p>
                        <div className='w-full flex justify-center'>
                          <button type='button' className='w-[230px] h-[32px] bg-[#4CAF50] hover:bg-[#43a047] rounded-[24px]' onClick={() => handleBorrowBook(book._id)}>Borrow</button>
                        </div>
                      </div>
                    </div>
              
            })
          }
        </div>
      </div>
    </div>
  )
}

export default UserDashboard

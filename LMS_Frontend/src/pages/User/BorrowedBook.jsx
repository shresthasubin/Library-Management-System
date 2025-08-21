import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/User/Sidebar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { publicAPI } from '../../utils/config'
import { toast } from 'react-toastify'
import { renewBook } from '../../../../LMS_Backend/src/controllers/borrow.controller'


const BorrowedBook = () => {
  const [borrowBook, setBorrowBook] = useState([])
  const user = JSON.parse(Cookies.get('user'))

  const fetchBorrowedBook = async () => {
    const res = await publicAPI.get(`/process/getBorrowBookByUserID/${user._id}`)
    console.log(res.data.data)
    setBorrowBook(res.data.data)
  }

  const handleReturn = async (id) => {
    try {
      await publicAPI.put(`/process/returnBook/${id}`)
      toast.success('Book has been returned',{
        position: 'top-right',
        autoClose: true,
        hideProgressBar: false
      })
      fetchBorrowedBook()
    } catch (error) {
      console.log(error)
      toast.error('Book cannot be returned', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    }
  }

  const handleRenew = async (id) => {
    try {
      await publicAPI.put(`process/renew/${id}`)
      toast.success('Book renewed successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    } catch (err) {
      console.log(err)
      toast.error(err.response.message || 'Book renewed failed', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    }
  }
  useEffect(() => {
    fetchBorrowedBook()
  }, [])
  
  return (
    <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1 text-white flex flex-col gap-[30px]'>
        <p className='text-2xl font-bold'>Book Borrowed</p>
        <div className='flex flex-col gap-[14px]'>
          {
            borrowBook
            .filter(book => book.isReturned === false)
            .map(book => {
              return <div key={book._id} className='w-full bg-[#0f172acc] rounded-[14px] flex gap-[14px]'>
                <img src={`http://localhost:3000/${book.book.bookImage}`} alt="book image" style={{borderRadius: '14px 0 0 14px'}} className='h-[250px] w-[180px]'/>
                <div className='flex flex-col gap-[3px]' style={{marginRight: '12px', marginBottom: '8px'}}>
                  <p><span className='text-lg font-bold'>Title:</span> <span className='text-xl font-bold'>{book.book.title}</span></p>
                  <p><span className='text-lg font-bold '>Author:</span> <span className='italic text-green-400'>{book.book.author}</span></p>
                  <p><span className='text-lg font-bold'>Description:</span> <span className='text-[14px] text-gray-300'>{book.book.description}</span></p>
                  <p><span className='text-[12px] font-bold'>Borrowed Date:</span> <span className='text-[12px] font-bold'>{new Date(book.borrowDate).toLocaleString()}</span></p>
                  <p><span className='text-[12px] font-bold'>Due Date:</span> <span className={`text-[12px] font-bold ${book.dueDate === new Date()? 'text-red-400':'text-green-400'}`}>{new Date(book.dueDate).toLocaleString()}</span></p>
                  <div className='self-end w-[410px] flex justify-between'>
                    <button type='button' onClick={() => handleReturn(book._id)} className='bg-red-600 w-[200px] ' style={{padding: '4px 16px', borderRadius: '24px', cursor: 'pointer'}}>Return</button>
                    <button type='button' onClick={() => handleRenew(book._id)} className='bg-green-600 w-[200px] ' style={{padding: '4px 16px', borderRadius: '24px', cursor: 'pointer'}}>Renew</button>

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

export default BorrowedBook

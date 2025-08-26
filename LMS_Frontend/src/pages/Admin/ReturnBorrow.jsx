import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import axios from 'axios'
import '../../table.css'
import { publicAPI } from '../../utils/config'

const ReturnBorrow = () => {
  const [borrowedBook, setBorrowedBook] = useState([])

  const fetchBorrowedBook = async () => {
    const res = await publicAPI.get('/process/getBorrowedDetailed')
    // console.log(res.data.data)
    setBorrowedBook(res.data.data)
  }

  useEffect(() => {
    fetchBorrowedBook()
  },[])

  return (
    <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1 text-white flex flex-col gap-[30px]'>
        <p className='text-2xl font-bold'>Borrowed Book Details</p>
        <div className='w-full'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='table-head'>Profile</th>
                <th className='table-head'>User</th>
                <th className='table-head'>Book</th>
                <th className='table-head'>Borrowed Date</th>
                <th className='table-head'>Borrow status</th>
                <th className='table-head'>Returned Date</th>
              </tr>
            </thead>
            <tbody>
              {
                borrowedBook.map((borrow) => {
                  return <tr key={borrow._id}>
                    <td className='table-body'>
                      <img src={`http://localhost:3000/${borrow.user.profileImage}`} className='h-[50px] w-[50px] rounded-full' alt="" />
                    </td>
                    <td className='table-body'>{borrow.user.name}</td>
                    <td className='table-body'>{borrow.book.title}</td>
                    <td className='table-body'>{new Date(borrow.borrowDate).toLocaleString()}</td>
                    <td className={`${borrow.isReturned? 'text-green-600' : 'text-red-600'}`} style={{border: '0.5px solid white',
                    padding: '8px 14px'}}>{borrow.isReturned ? 'returned' : 'not returned'}</td>
                    <td className='table-body'>{borrow.returnDate? new Date(borrow.returnDate).toLocaleString() : "--"}</td>
                  </tr>
                })
              }
            </tbody>
            <tbody>
              {
                borrowedBook.length === 0 && <p>Borrowed books not found</p>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ReturnBorrow

import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Admin/Sidebar.jsx'
import '../../admin-dashboard.css'
import axios from 'axios'
import PieChart from '../../components/Admin/PieChart.jsx'
import { FaBook, FaUser, FaUsers } from 'react-icons/fa'
import { publicAPI } from '../../utils/config.js'

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [activeUser, setActiveUser] = useState([])
  const [books, setBooks] = useState([])
  const [totalBooks, setTotalBook] = useState([])

  const fetchUser = async () => {
    try {
      const res = await publicAPI.get('/user/get')
      setUsers(res.data.data)
      setActiveUser(res.data.data.filter(user => user.isDeleted === false))
    } catch (error) {
      console.log('Error fetching users',error)
    }
  }

  const TotalBook = async () => {
    try {
      const res = await publicAPI.get('/book/get')
      setTotalBook(res.data.data)
    } catch (error) {
      console.log('Error fetching books',error)
    }
  }
  const fetchBook = async () => {
    try {
      const res = await publicAPI.get('/book/get?limit=5')
      setBooks(res.data.data)
    } catch (error) {
      console.log('Error fetching books',error)
    }
  }

  useEffect(() => {
    fetchUser()
    fetchBook()
    TotalBook()
  }, [])

  return (
    <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1 text-white flex flex-col gap-[30px]'>

        <h1 className='font-bold text-4xl'>Welcome Back, <span className='text-[#4CAF50]'>Admin</span>!</h1>

        <div className='status-content w-full h-fit flex justify-evenly'>
          <div className='flex flex-col justify-center items-center'>
            <p className='font-semibold text-3xl text-[#4CAF50]'>{users.length}</p>
            <p className='font-medium text-xl text-[#B0B3C0] flex gap-[4px] items-center'><FaUsers/>Users</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className='font-semibold text-3xl text-[#4CAF50]'>{activeUser.length}</p>
            <p className='font-medium text-xl text-[#B0B3C0] flex gap-[6px] items-center'><FaUser/>Active Users</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <p className='font-semibold text-3xl text-[#4CAF50]'>{totalBooks.length}</p>
            <p className='font-medium text-xl text-[#B0B3C0] flex gap-[4px] items-center'><FaBook/>Books</p>
          </div>
        </div>

          <p className='text-2xl font-bold mb-[5px]'>Most popular Books</p>
        <div className='w-full flex justify-evenly'>
          {
            books
            .map(book => {
              return <div key={book._id} className='relative popular-book'>
                <img src={`http://localhost:3000/${book.bookImage}`} alt="" className=' w-50 h-70 rounded-[8px] '/>
                <div className='overlay absolute w-full h-full'></div>
                <div className='details-text w-full absolute bottom-[0] left-[0]'>
                  <p className='text-[#f1f1f1]'>{book.title}</p>
                  <p className='text-[#B0B3C0] text-[12px] italic'>{book.author}</p>
                  <p className='desc-book'>{book.description}</p>
                </div>
              </div>
            })
          }
        </div>
        <div className='flex flex-col gap-[16px]'>
          <p className='text-xl font-bold'>Stats showing the returned and borrowed books</p>
          <div className='bg-[#2D2D44] h-[500px] w-full flex items-center justify-center flex-col gap-[10px]'>
            <p className='font-[400]'>The below pie chart shows the status of books that were returned and borrowed.</p>
            <PieChart/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard

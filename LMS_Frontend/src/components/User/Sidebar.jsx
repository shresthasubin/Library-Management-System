import React, { useState } from 'react'
import '../../sidebar.css'
import {NavLink, useNavigate} from 'react-router-dom'
import { FaTachometerAlt, FaBook, FaExchangeAlt, FaUsers, FaUserCircle, FaSignOutAlt, FaBookOpen, FaInfoCircle, FaEnvelope } from 'react-icons/fa'
import axios from 'axios'
import {toast} from 'react-toastify'
import Cookies from 'js-cookie'

const styles = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
}

const Sidebar = () => {
  const navigate = useNavigate()
  const handleLogout = async() => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/logout', {}, {withCredentials: true})
      Cookies.remove('token')
      Cookies.remove('user')
      toast.success('User has been logged out',{
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
      navigate('/login')
    } catch (error) {
      toast.error('Logout failed',{
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    }
  }
  return (
    <div className='sidebar-box'>
        <h1 className='text-white text-2xl font-[800] text-center '>Learn<span className='text-[#4CAF50]'>&Grow</span></h1>
        <h2 className='text-3xl pt-[2px] font-[600] text-white text-center bg-slate-700'>User</h2>
      <ul>
        <li className='w-full'><NavLink style={styles} className={({isActive}) => (isActive ? 'text-[#4CAF50]' : '')} to='/user-dashboard'><FaTachometerAlt/>Dashboard</NavLink></li>
        <li className='w-full'><NavLink style={styles} className={({isActive}) => (isActive ? 'text-[#4CAF50]' : '')} to='/borrow-book'><FaBookOpen/>Borrowed Books</NavLink></li>
        <li className='w-full'><NavLink style={styles} className={({isActive}) => (isActive ? 'text-[#4CAF50]' : '')} to='/about'><FaInfoCircle/>About</NavLink></li>
        <li className='w-full'><NavLink style={styles} className={({isActive}) => (isActive ? 'text-[#4CAF50]' : '')} to='/contact'><FaEnvelope/>Contact</NavLink></li>
        <li className='w-full'><NavLink style={styles} className={({isActive}) => (isActive ? 'text-[#4CAF50]' : '')} to='/user-profile'><FaUserCircle/>Profile</NavLink></li>
        <li className='w-full'><NavLink style={styles} to='/logout' className='text-red-600' onClick={() => handleLogout()}><FaSignOutAlt/>Logout</NavLink></li>
      </ul>
    </div>
  )
}

export default Sidebar

import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { publicAPI } from '../../utils/config'
import { FaSearch } from 'react-icons/fa'

const UserDetail = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const regex = new RegExp(search, 'i')

  const fetchUser = async() => {
    const res = await publicAPI.get('/user/get')
    setUsers(res.data.data)
  }

  const handleDelete = async (id) => {
    try {
      await publicAPI.delete(`/user/delete/${id}`)
      toast.success('Deletion complete', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    } catch (err) {
      toast.error('Cannot Delete user', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    }
  } 
  const handleToggleDelete = async (id) => {
    try {
      await publicAPI.delete(`/user/put/${id}`)
      toast.success('User Status changed', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    } catch (err) {
      toast.error('Cannot change user status', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    }
  } 

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1 text-white flex flex-col gap-[30px]'>
        <p className='font-bold text-2xl'>All User Details</p>
        <div className='relative'>
          <input type="text" value={search} placeholder='Search users here...' onChange={(e) => setSearch(e.target.value)} className='search-bar'/>
          <p className='absolute top-[12px] left-[12px] text-gray-500'><FaSearch/></p>
        </div>
        <div className='w-full'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='table-head'>Profile Image</th>
                <th className='table-head'>Name</th>
                <th className='table-head'>Email</th>
                <th className='table-head'>Role</th>
                <th className='table-head'>Control</th>
              </tr>
            </thead>
            <tbody>
              {
                users
                .filter(user => (regex.test(user.name) || regex.test(user.email)))
                .map((user) => {
                  return <tr key={user._id}>
                    <td className='table-body'><img src={`http://localhost:3000/${user.profileImage}`} alt="profile image" className='w-[50px] h-[50px] rounded-full'/></td>
                    <td className='table-body'>{user.name}</td>
                    <td className='table-body'>{user.email}</td>
                    <td className='table-body'>{user.role}</td>
                    <td className='table-body text-center'>
                      <button onClick={() => handleToggleDelete(user._id)} className={`${user.role === 'librarian'? 'bg-gray-700':user.isDeleted === false ? 'bg-red-600' : 'bg-green-600'} w-[100px] text-white font-bold rounded-[24px]`} disabled = {user.role === 'librarian' ? true : false}>{user.role === 'librarian'? 'Restricted' : user.isDeleted ? 'Activate' : 'Deactivate'}</button>
                    </td>
                  </tr>
                })
              }
              {
                users.length === 0 && <p>User not found</p>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserDetail

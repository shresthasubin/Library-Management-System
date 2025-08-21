import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/User/Sidebar'
import axios from 'axios'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { FaPen } from 'react-icons/fa'
import { publicAPI } from '../../utils/config'

const UserProfile = () => {
  const [userDetail, setUserDetail] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  })
  const [profileImage, setProfileImage] = useState(null)
  const handleChange = (e) => {
    const {name, value, type, files} = e.target
    if (type === 'file') {
      setProfileImage(files[0])
    } else {
      setFormData((prev) => ({...prev, [name]: value}))
    }
  }


  const fetchUser = async () => {
    const res = await axios.get('http://localhost:3000/api/user/getUser', {withCredentials: true})
    setUserDetail(res.data.data)
    // setProfileImage(res.data.data.profileImage)
    setFormData({
      name: res.data.data.name,
      email: res.data.data.email,
      role: res.data.data.role,
      profileImage: res.data.data.profileImage
    })
    console.log(res.data.data)
  }

  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      const data = new FormData()
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val)
        console.log(key,val)
      })

      if (profileImage) {
        data.append('profileImage', profileImage)
      }
      console.log(data)
      const res = await publicAPI.put(`/user/update/${userDetail._id}`, data)
      toast.success('Updated successfully',{
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
      fetchUser()
    } catch (err) {
      toast.error(err.response.data || err.message, {
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
        <p className='font-bold text-2xl'>Profile</p>
        <form onSubmit={handleUpdate} encType='multipart/form-data' style={{alignSelf: 'center'}} className='w-[500px] flex flex-col items-center gap-[12px]'>
          <div className='flex flex-col gap-[4px] items-center'>
            <img src={`http://localhost:3000/${formData.profileImage}`} alt="Profile Pic" className='h-[100px] w-[100px] border-1 rounded-full' />
            <label htmlFor="pp">
              <span className='flex gap-[8px] items-center'>Edit profile picture <FaPen/></span>
              <input type="file" name="profileImage" onChange={handleChange} id='pp' hidden />
            </label>
          </div>
          <div className='w-full flex flex-col gap-[4px]'>
            <label>Name</label>
            <input type="text" name='name' style={{width: '467px'}} value={formData.name} onChange={handleChange}/>
          </div>
          <div className='w-full flex flex-col gap-[4px]'>
            <label>Email</label>
            <input type="text" name='email' style={{width: '467px'}} value={formData.email} onChange={handleChange}/>
          </div>
          <div className='w-full flex flex-col gap-[4px]'>
            <label>Role</label>
            <input type="text" name='role' style={{width: '467px'}} value={formData.role} onChange={handleChange} readOnly/>
          </div>
          <button type='submit' className='bg-green-600 rounded-[24px] hover:bg-green-700' style={{padding: '4px 0', marginTop: '12px', width: '100%'}}>Update Profile</button>
        </form>
      </div>
    </div>
  )
}

export default UserProfile

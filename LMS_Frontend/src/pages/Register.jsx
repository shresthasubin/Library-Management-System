import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { publicAPI } from '../utils/config'

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        role: 'borrower'
    })
    const [profileImage, setProfileImage] = useState(null)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value, type, files} = e.target
        if (type === 'file') {
            setProfileImage(files[0])
        } else {
            setFormData((prev) => ({...prev, [name]: value}))
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const data = new FormData()
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value)
            })
            if(profileImage) {
                data.append('profileImage', profileImage)
            }
            
            await publicAPI.post('/user/register',
                data
            )
            toast.success('User registered successfully',{
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false
            })
            setFormData({
                email: '',
                name: '',
                password: '',
                role: 'borrower',
                profileImage: ""
            })
            setProfileImage(null)
            navigate('/login')
        } catch (err) {
            toast.error(err.response.data || err.message,{
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false
            })
        }
    }
  return (
    <div className='register-contaitner' >
        <form onSubmit={handleSubmit} encType='multipart/form-data' className='register-form'>
            <label>Name</label>
            <input 
                type="name" 
                name='name'
                value = {formData.name}
                onChange={handleChange}
                placeholder='John Doe'
                required
            />
            <label>Email</label>    
            <input 
                type="email" 
                name='email'
                value = {formData.email}
                onChange={handleChange}
                placeholder='johndoe@gmail.com'
                required
            />
            <label>Password</label>
            <div className='relative'>
                <input 
                    type={show ? "text" : "password"} 
                    name='password'
                    value = {formData.password}
                    onChange={handleChange}
                    placeholder='*********'
                    required
                />
                <button type='button' onClick={() => setShow(!show)} className='show-hide-btn absolute top-[25%] right-[10px]'>{!show ? <FaEyeSlash className='bg-none text-[#e2e2e2]'/> : <FaEye className='bg-none text-[#e2e2e2]'/>}</button>
            </div>
            <label>Role</label>
            <input 
                type="role" 
                name='role'
                value = {formData.role}
                onChange={handleChange}
                placeholder='role'
                readOnly    
            />
            <label>Choose Profile Picture</label>
            <input 
                type="file" 
                name='profileImage'
                accept='image/*'
                onChange={handleChange}
                required
            />
            <button type='submit' className='register-button '>Register</button>

            <Link to="/login" className='text-[#e2e2e2] text-[12px] underline decoration-[0.5px] underline-offset-2 text-center'>Already have account? Sign in</Link>
        </form>
    </div>
  )
}

export default Register

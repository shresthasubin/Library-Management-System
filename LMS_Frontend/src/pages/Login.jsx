import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { privateAPI } from '../utils/config'



const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const res = await privateAPI.post('/auth/login',
                formData
            )
            Cookies.set('token', res.data.data.token)
            Cookies.set('user', JSON.stringify(res.data.data.userExist))
            // console.log(res.data)
            toast.success('Login successfully',{
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false
            })

            const user = JSON.parse(Cookies.get('user'))
            if (user.role === 'librarian') {
                navigate('/admin-dashboard')
            } else if (user.role === 'borrower') {
                navigate('/user-dashboard')
            }
            setFormData({
                email: '',
                password: ''
            })
        } catch (err) {
            toast.error(err.message,{
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false
            })
        }
    }
  return (
    <div className='signin-container' >
        <form onSubmit={handleSubmit} className='signin-form'>
            <label>Email</label>
            <input 
                type="email" 
                name='email'
                value = {formData.email}
                onChange={e => handleChange(e)}
                placeholder='johndoe@gmail.com'
                required
            />
            <label>Password</label>
            <div className='relative'>
                <input 
                    type={show ? "text" : "password"} 
                    name='password'
                    value = {formData.password}
                    onChange={e => handleChange(e)}
                    placeholder='•••••••••'
                    required
                />
                <button type='button' onClick={() => setShow(!show)} className='show-hide-btn absolute top-[25%] right-[10px]'>{!show ? <FaEyeSlash className='bg-none text-[#e2e2e2]'/> : <FaEye className='bg-none text-[#e2e2e2]'/>}</button>
            </div>
            <button type='submit' className='signin-button '>Sign in</button>

            <Link to="/" className='text-[#e2e2e2] text-[12px] underline decoration-[0.5px] underline-offset-2 text-center'>Don't have an account? Register</Link>
        </form>
    </div>
  )
}

export default Login

import React, { useState } from 'react'
import Sidebar from '../../components/User/Sidebar'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import {privateAPI} from '../../utils/config.js'

const Contact = () => {
  const user = JSON.parse(Cookies.get('user'))
  const [formData, setFormData] = useState({
    email: '',
    feedback: '',
   
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      await privateAPI.post('/feedback/submit', {...formData,  name: user.name, profileImage: user.profileImage })

      toast.success('Feedback Submitted', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
      setFormData({
        email: '',
        feedback: ''
      })
    } catch (error) {
      toast.error('Cannot submit feedback', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false
      })
    }
  }

  return (
    <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1 text-white flex flex-col gap-[30px]'>
        <p className='text-3xl font-bold'>Contact</p>
        <div>
          <div>
            <p className='font-bold'>Contact Us Info</p>
            <ul>
              <li className='flex w-[300px] justify-between'><span className='text-neutral-400'>Email:</span><span className='font-medium text-neutral-300'>librarian_admin@gmail.com</span> </li>
              <li className='flex w-[300px] justify-between'><span className='text-neutral-400'>Phone:</span><span className='font-medium text-neutral-300'>+977 984-0000000</span> </li>
              <li className='flex w-[300px] justify-between'><span className='text-neutral-400'>Follow us on:</span><span className='font-medium text-neutral-300 flex gap-[8px]'><FaFacebook/> <FaInstagram/><FaTwitter/></span></li>
            </ul>
          </div>
          <div className='flex flex-col gap-[16px]' style={{marginTop: '16px'}}>
            <p>If you have any queries regarding our management system, then you can frrely send your <span className='font-bold'>feedback/suggestion</span> below!</p>
            <form className='flex flex-col gap-[16px]' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-[8px]'>
                <label>Email</label>
                <input type="text" name='email' value={formData.email} onChange={handleChange} placeholder='johndoe@gmail.com'/>
              </div>
              <div className='flex flex-col gap-[8px]'>
                <label>Feedback/Suggestion</label>
                <textarea placeholder='you can freely ask here...' name='feedback' value={formData.feedback} onChange={handleChange} style={{height: '150px'}}></textarea>
              </div>
              <button type='submit' className='w-[430px] bg-[#4CAF50] rounded-[24px]' style={{paddingTop: '4px'}}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

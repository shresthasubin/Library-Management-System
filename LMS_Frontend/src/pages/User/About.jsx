import React from 'react'
import Sidebar from '../../components/User/Sidebar'
import '../../about.css'

const About = () => {
  return (
     <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1 text-white flex flex-col gap-[30px]'>
        <p className='text-4xl font-bold'>Welcome to Learn<span className='text-[#4CAF50]'>&Grow</span></p>

        <div className=' h-[500px] flex justify-center items-center relative'>
            <p className='text-9xl font-extrabold relative z-2 w-full h-full flex justify-center items-center' style={{backdropFilter: 'blur(10px)'}}><span>Learn</span><span className='text-[#4CAF50]'>&Grow</span></p>
            <div className='box-animate-top w-[100px] h-[100px] absolute bg-white top-[20px] right-[60px] rounded-full' style={{boxShadow: '0 0 40px #4caf50', zIndex: '1'}}></div>
            <div className='box-animate-bottom w-[100px] h-[100px] absolute bg-white top-[120px] right-[420px] rounded-full' style={{boxShadow: '0 0 40px #4caf50', zIndex: '1'}}></div>
            <div className='box-animate-bottom w-[100px] h-[100px] absolute bg-[#4caf50] top-[120px] left-[60px] rounded-full' style={{boxShadow: '0 0 40px #eaeaeaff', zIndex: '1'}}></div>
            <div className='box-animate-top w-[100px] h-[100px] absolute bg-[#4caf50] top-[20px] left-[420px] rounded-full' style={{boxShadow: '0 0 40px #eaeaeaff', zIndex: '1'}}></div>
        </div>

        <div>
          <p className='text-3xl font-extrabold'>From Admin</p>
          <p className='text-xl text-neutral-400 font-medium'>Welcome to the <span className='font-bold text-2xl text-white'>Learn<span className='text-[#4caf50]'>&grow</span></span> Library Management System! This platform is designed to make your reading journey seamless and enjoyable. Here, you can search and borrow books, explore your borrowing history, and track upcoming due dates with ease. Our goal is to ensure that every user has quick and fair access to books while maintaining a well-organized borrowing system.</p>
        </div>
      </div>
    </div>
  )
}

export default About

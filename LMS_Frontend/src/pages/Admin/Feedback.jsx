import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import { publicAPI } from '../../utils/config'

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([])

    const fetchFeedBack = async () => {
        const res = await publicAPI.get('/feedback/getFeedback')
        setFeedbacks(res.data.data)
    } 

    useEffect(() => {
        fetchFeedBack()
    },[])

  return (
    <div className='flex gap-8'>
      <Sidebar/>
      <div className='content flex-1 text-white flex flex-col gap-[30px]'>
        <p className='text-3xl font-bold'>FeedBacks</p>
        <div>
            {
                feedbacks
                .map(feedback => {
                    return <div style={{borderBottom: '0.5px solid gray', margin: '12px 0'}}>
                        <div className='flex gap-[12px] items-center'>
                            <img src={`http://localhost:3000/${feedback.profileImage}`} className='w-[50px] h-[50px] rounded-full' alt="profile" />
                            <div className='flex flex-col'>
                                <p className='font-bold'>{feedback.name}</p>
                                <p className='text-[14px] text-neutral-400'>{feedback.email}</p>
                            </div>
                        </div>
                        <div className='text-neutral-300' style={{margin: '12px 50px'}}>
                            {feedback.feedback}
                        </div>
                    </div>
                })
            }
        </div>
        <div>
            {
                feedbacks.length === 0 && <p>Feedback not found</p>
            }
        </div>
      </div>
    </div>
  )
}

export default Feedback

import React from 'react'
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({children, allowedRoute}) => {
  const userCookie = Cookies.get('user')
  if (!userCookie) return <Navigate to='/' replace/>

  try {
    const user = JSON.parse(userCookie)

    if (allowedRoute.includes(user.role)) {
        return children;
    } else {
        return <Navigate to='/' replace/>
    }
  } catch (err) {
    console.log('Invalid Code', err)
    return <Navigate to='/' replace/>
  }
}

export default ProtectedRoute

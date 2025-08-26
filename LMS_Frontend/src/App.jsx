import React from 'react'
import Register from './pages/Register.jsx'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import Sidebar from './components/Admin/Sidebar.jsx'
import Book from './pages/Admin/Book.jsx'
import ReturnBorrow from './pages/Admin/ReturnBorrow.jsx'
import UserDetail from './pages/Admin/UserDetail.jsx'
import Profile from './pages/Admin/Profile.jsx'
import Cookies from 'js-cookie'
import ProtectedRoute from './utils/ProtectedRoute.jsx'
import UserProfile from './pages/User/UserProfile.jsx'
import BorrowedBook from './pages/User/BorrowedBook.jsx'
import UserDashboard from './pages/User/UserDashboard.jsx'
import About from './pages/User/About.jsx'
import Contact from './pages/User/Contact.jsx'
import Feedback from './pages/Admin/Feedback.jsx'


const App = () => {

  return (
    <>
      <ToastContainer/>
      {/* <Sidebar/> */}
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin-dashboard' element={
          <ProtectedRoute allowedRoute={["librarian"]}>
            <AdminDashboard/>
          </ProtectedRoute>
        }/>
        <Route path='/book' element={<Book/>}/>
        <Route path='/return-borrow' element={<ReturnBorrow/>}/>
        <Route path='/userDetail' element={<UserDetail/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/feedback' element={<Feedback/>}/>
        <Route path='/user-dashboard' element={
          <ProtectedRoute allowedRoute={["borrower"]}>
            <UserDashboard/>
          </ProtectedRoute>
        }/>
        <Route path='/user-profile' element={<UserProfile/>}/>
        <Route path='/borrow-book' element={<BorrowedBook/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      {/* <Register/> */}
      {/* <Login/> */}
    </>
  )
}

export default App

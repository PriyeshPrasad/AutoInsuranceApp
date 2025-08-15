import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import EmailVerify from './pages/emailverify'
import ResetPassword from './pages/resetpassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/emailverify' element={<EmailVerify/>}/>
        <Route path='/resetpassword' element={<ResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default App

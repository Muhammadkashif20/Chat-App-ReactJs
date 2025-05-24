import React from 'react'
import { BrowserRouter, Route, Routes,  } from 'react-router-dom'
import ChatHome from './ChatHome'
import Signup from './auth/Signup'
import Login from './auth/Login'
import Layout from './auth/Layout'

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <div style={{ display: 'flex', height: '100vh' }}>
       
         <Layout/>
        <div style={{ flex: 1 }}>
      <Routes>
        <Route path="/" element={<ChatHome />} />
        <Route path="/login" element={ <Login  /> }/>
        <Route path="/signup" element={ <Signup /> }/>
      </Routes>
    </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

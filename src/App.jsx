import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatHome from './ChatHome'
import Sidebar from './Sidebar'

import ProtectedRoute from './ProtectedRoute'
import Signup from './auth/Signup'
import Login from './auth/Login'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ width: '250px', borderRight: '1px solid #ddd' }}>
          <Sidebar />
        </div>
        <div style={{ flex: 1 }}>
      <Routes>
        <Route path="/" element={<ChatHome />} />
        <Route path="/login" element={ <ProtectedRoute><Login  /></ProtectedRoute>} />
        <Route path="/signup" element={ <ProtectedRoute><Signup /></ProtectedRoute>} />
      </Routes>
    </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

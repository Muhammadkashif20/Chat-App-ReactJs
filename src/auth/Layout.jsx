import React from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from "../Sidebar"
const Layout = () => {
      const location=useLocation()
  const hideSidebar= location.pathname === '/login' && location.pathname === '/signup'
  return (
         <div style={{ display: 'flex', height: '100vh' }}>
       {!hideSidebar && (
        <div style={{ width: '250px', borderRight: '1px solid #ddd' }}>
          <Sidebar />
          </div>)}
    </div>
  )
}

export default Layout

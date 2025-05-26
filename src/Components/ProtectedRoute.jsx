import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const authData=JSON.parse(localStorage.getItem("formData"))
  return authData ? children : <Navigate to={"/"}></Navigate>
}

export default ProtectedRoute

import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
     const formData = JSON.parse(localStorage.getItem("formData"));
  const googleFormData = JSON.parse(localStorage.getItem("googleFormData"));
  return formData || googleFormData ? children : <Navigate to={"/"}></Navigate>
}

export default ProtectedRoute

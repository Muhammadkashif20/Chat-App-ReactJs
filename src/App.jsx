import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatHome from "./Components/ChatHome";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Layout from "./auth/Layout";
import Loader from "./Components/Loader";
import ProtectedRoute from "./Components/ProtectedRoute";
import '@ant-design/v5-patch-for-react-19';
import Profile from "./Components/Profile";
const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
    const formData = JSON.parse(localStorage.getItem("formData"));
  const googleFormData = JSON.parse(localStorage.getItem("googleFormData"));
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <BrowserRouter>
        <div style={{ display: "flex", height: "100vh" }}>
          <Layout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/chatHome" element={<ProtectedRoute><ChatHome  isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

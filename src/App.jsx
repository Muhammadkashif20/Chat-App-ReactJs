import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatHome from "./Components/ChatHome";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Layout from "./auth/Layout";
import Loader from "./Components/Loader";
import Settings from "./Components/Settings";

const App = () => {
  const [loading, setLoading] = useState(true);
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
          <Layout />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/chatHome" element={<ChatHome />} />
              <Route path="/settings" element={<Settings />} />
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

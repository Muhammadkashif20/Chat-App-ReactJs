import React from 'react';
import { UserOutlined, MessageOutlined, SettingOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate= useNavigate();
  const formData = JSON.parse(localStorage.getItem("formData"));
  console.log("formData=>",formData)
  const googleFormData = JSON.parse(localStorage.getItem("googleFormData"));
  console.log("googleFormData=>",googleFormData)
    const handleLogout = () => {
    localStorage.removeItem("formData");
    localStorage.removeItem("googleFormData");
    navigate("/");
  };
  const userName = formData?.fullname || googleFormData?.displayName || "Guest";
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-white via-blue-50 to-indigo-100 shadow-xl flex flex-col">
      {/* Logo / Title */}
      <div className="px-6 py-5 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow">
        💬 M.K ChatApp
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4 px-5 py-4 border-b border-blue-100 bg-white shadow-sm">
        <div className="w-12 h-12 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-xl">
          <UserOutlined />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{userName}</h4>
          <p className="text-sm text-green-500">● Online</p>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-5 space-y-3 text-gray-800 font-medium">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-all"  onClick={() => navigate("/chatHome")}>
          <MessageOutlined />
          <span>Chats</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-all"  onClick={() => navigate("/profile")} >
          <SettingOutlined />
          <span>Settings</span>
        </div>
        {googleFormData || formData ? (
          <div
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 cursor-pointer transition-all text-red-600"
            onClick={handleLogout}
          >
            <LogoutOutlined />
            <span>Logout</span>
          </div>
        ) : (
          <div
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-all"
            onClick={() => navigate("/")}
          >
            <LoginOutlined />
            <span>Login</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

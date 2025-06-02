import React, { useState } from 'react';
import {
  UserOutlined,
  MessageOutlined,
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
  ProfileOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const formData = JSON.parse(localStorage.getItem("formData"));
  const googleFormData = JSON.parse(localStorage.getItem("googleFormData"));
  const handleLogout = () => {
    localStorage.removeItem("formData");
    localStorage.removeItem("googleFormData");
    navigate("/");
  };
  const userName = formData?.fullname || googleFormData?.displayName || "Guest";
  const userPhoto = googleFormData?.photoURL || null;

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 h-screen bg-gradient-to-b from-white via-blue-50 to-indigo-100 shadow-xl flex flex-col relative`}
    >
      {/* Logo */}
      <div className="px-6 py-5 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow text-center">
        💬
        {isSidebarOpen && <span className="ml-2">M.K ChatApp</span>}
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4 px-5 py-4 border-b border-blue-100 bg-white shadow-sm">
        <Avatar
          size={48}
          src={userPhoto}
          icon={!userPhoto && <UserOutlined />}
          className="border-4 border-white shadow-md"
        />
        {isSidebarOpen && (
          <div>
            <h4 className="font-semibold text-gray-800">{userName}</h4>
            <p className="text-sm text-green-500">● Online</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 p-5 space-y-3 text-gray-800 font-medium">
        <div
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-all"
          onClick={() => navigate("/chatHome")}
        >
          <MessageOutlined />
          {isSidebarOpen && <span>Chats</span>}
        </div>
        <div
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-all"
          onClick={() => navigate("/profile")}
        >
          <UserOutlined />
          {isSidebarOpen && <span>Profile</span>}
        </div>
        {googleFormData || formData ? (
          <div
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 cursor-pointer transition-all text-red-600"
            onClick={handleLogout}
          >
            <LogoutOutlined />
            {isSidebarOpen && <span>Logout</span>}
          </div>
        ) : (
          <div
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-all"
            onClick={() => navigate("/")}
          >
            <LoginOutlined />
            {isSidebarOpen && <span>Login</span>}
          </div>
        )}
      </div>

      <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:${!isSidebarOpen}`}>
        <button
          onClick={toggleSidebar}
          className="text-xl p-3 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-blue-100 transition duration-300 relative group"
        >
          {isSidebarOpen ? <LeftOutlined /> : <RightOutlined />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

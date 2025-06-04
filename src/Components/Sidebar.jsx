import React, { useState } from 'react';
import {
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';

const Sidebar = ({isSidebarOpen,setIsSidebarOpen}) => {
  const navigate = useNavigate();
  const formData = JSON.parse(localStorage.getItem('formData'));
  const googleFormData = JSON.parse(localStorage.getItem('googleFormData'));

  const handleLogout = () => {
    localStorage.removeItem('formData');
    localStorage.removeItem('googleFormData');
    navigate('/');
  };

  const userName = formData?.fullname || googleFormData?.displayName || 'Guest';
  const userPhoto = googleFormData?.photoURL || null;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
    const sidebarWidthClass = isSidebarOpen ? 'w-64 sm:w-64' : 'w-16 sm:w-24';


  return (
    <div
      className={`${isSidebarOpen ? 'w-64' : 'w-24'} h-screen bg-gradient-to-b from-white via-blue-50 to-indigo-100 shadow-xl flex flex-col relative transition-all duration-300 ${sidebarWidthClass}`}
    >
      {/* Logo / Title */}
      <div className="px-6 py-5 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow whitespace-nowrap overflow-hidden">
        <span className="px-2">💬</span>{isSidebarOpen && ' M.K ChatApp'}
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
          <div className="whitespace-nowrap overflow-hidden">
            <h4 className="font-semibold text-gray-800">{userName}</h4>
            <p className="text-sm text-green-500">● Online</p>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-3 space-y-2 text-gray-800 font-medium">
        <div
          className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-all ${isSidebarOpen ? "justify-start" : "justify-center"}` }
          onClick={() => navigate('/chatHome')}
        >
          <MessageOutlined/>
          {isSidebarOpen && <span>Chats</span>}
        </div>
        <div
          className= {`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-all ${isSidebarOpen ? "justify-start" : "justify-center"}`}
          onClick={() => navigate('/profile')}
        >
          <UserOutlined />
          {isSidebarOpen && <span>Profile</span>}
        </div>
        {googleFormData || formData ? (
          <div
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 cursor-pointer transition-all text-red-600 ${isSidebarOpen ? "justify-start" : "justify-center"}`}
            onClick={handleLogout}
          >
            <LogoutOutlined />
            {isSidebarOpen && <span>Logout</span>}
          </div>
        ) : (
          <div
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-all"
            onClick={() => navigate('/')}
          >
            <LoginOutlined />
            {isSidebarOpen && <span>Login</span>}
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <button
          onClick={toggleSidebar}
          className="text-indigo-600 bg-white border border-indigo-200 shadow-md hover:bg-indigo-50 py-3 px-4 rounded-full transition-all"
        >
          {isSidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

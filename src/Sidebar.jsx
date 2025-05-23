import React from 'react';
import { UserOutlined, MessageOutlined, SettingOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-white via-blue-50 to-indigo-100 shadow-xl flex flex-col">
      
      {/* Logo / Title */}
      <div className="px-6 py-5 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow">
        💬 M.K Chatapp
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4 px-5 py-4 border-b border-blue-100 bg-white shadow-sm">
        <div className="w-12 h-12 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-xl">
          <UserOutlined />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">Kashif</h4>
          <p className="text-sm text-green-500">● Online</p>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-5 space-y-3 text-gray-800 font-medium">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-all">
          <MessageOutlined />
          <span>Chats</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition-all">
          <SettingOutlined />
          <span>Settings</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100   cursor-pointer transition-all">
          <LoginOutlined />
          <span>Login</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

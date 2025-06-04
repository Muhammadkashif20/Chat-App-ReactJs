import React from "react";
import { Avatar } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

const Profile = ({ isSidebarOpen }) => {
  const formData = JSON.parse(localStorage.getItem("formData"));
  const googleFormData = JSON.parse(localStorage.getItem("googleFormData"));
  const userName = formData?.fullname || googleFormData?.displayName || "Guest";
  const userEmail = formData?.email || googleFormData?.email || "Not provided";
  const userPhoto = googleFormData?.photoURL || null;

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        isSidebarOpen ? "ml-0" : "ml-[-10rem]"
      }`}
    >
      <div className="min-h-screen w-full max-w-md sm:max-w-lg bg-white rounded-xl shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-28 sm:h-32 bg-gradient-to-r from-blue-400 to-indigo-500">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <Avatar
              size={96}
              sm={{ size: 120 }}
              src={userPhoto}
              icon={!userPhoto && <UserOutlined />}
              className="border-4 border-white shadow-md"
            />
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 px-6 pb-8 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 truncate">
            {userName}
          </h1>
          <p className="text-gray-500 mt-1 truncate">{userEmail}</p>

          {/* Account Type Badge */}
          <div className="mt-3 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold select-none">
            {googleFormData ? "Google User" : "Standard User"}
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 mt-6 mb-6 text-sm sm:text-base">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-medium text-gray-800">
                1.2K
              </div>
              <div className="text-gray-500">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-medium text-gray-800">
                48
              </div>
              <div className="text-gray-500">Chats</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-medium text-gray-800">
                12
              </div>
              <div className="text-gray-500">Groups</div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t border-gray-100 px-6 py-4 space-y-3 text-gray-600 text-sm sm:text-base">
          <div className="flex items-center gap-3 truncate">
            <MailOutlined className="text-gray-400 flex-shrink-0" />
            <span className="truncate">{userEmail}</span>
          </div>
          <div className="flex items-center gap-3 truncate">
            <UserOutlined className="text-gray-400 flex-shrink-0" />
            <span>{googleFormData ? "Google Account" : "Email Account"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

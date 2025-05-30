import React from "react";
import { Card, Button, Descriptions, message } from "antd";
import { LogoutOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

const ProfilePage = ({ user }) => {
  const { fullname, email } = user || {};

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logged out successfully!");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-white flex items-center justify-center px-4">
      <Card
        className="w-full max-w-md shadow-xl rounded-2xl"
        bordered={false}
        bodyStyle={{ padding: 24 }}
      >
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Profile Info
          </h2>

          <Descriptions column={1} bordered={false} size="small">
            <Descriptions.Item label={<UserOutlined />}>
              {fullname || "Guest User"}
            </Descriptions.Item>
            <Descriptions.Item label={<MailOutlined />}>
              {email || "No email provided"}
            </Descriptions.Item>
          </Descriptions>

          <Button
            type="primary"
            icon={<LogoutOutlined />}
            danger
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-600 hover:to-blue-600"
          >
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;

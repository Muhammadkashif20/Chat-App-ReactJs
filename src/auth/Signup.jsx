import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
const { Title, Text } = Typography;
const Signup = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (values) => {
    console.log("fullname: ", values.fullname);
    console.log("email: ", values.email);
    console.log("password:", values.password);
    console.log("Form Values for register: ", values);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      const user = userCredential.user;
      console.log("User signed up: ", user);

      await setDoc(doc(db, "users", user.uid), {
        fullname: values.fullname,
        email: values.email,
        uid: user.uid,
      });

      message.success("Account created successfully!");
      navigate("/login");
      }    
      catch (error) {
      console.log("Error code: ", error.code);
      console.log("Error message: ", error.message);
      message.error(error.code);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl transition-all duration-300">
        <Title level={2} className="text-center text-green-600 mb-6">
          Create Your Account 🎉
        </Title>
        <Text className="block text-center text-gray-600 mb-6">
          Please fill the details to sign up
        </Text>

        <Form layout="vertical" onFinish={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input
              size="large"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              prefix={<UserOutlined className="text-gray-400" />}
              className="rounded-lg"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your email address"
              prefix={<MailOutlined className="text-gray-400" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your password"
              prefix={<LockOutlined className="text-gray-400" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg"
            />
          </Form.Item>

          {/* Signup Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Sign Up
            </Button>
          </Form.Item>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;

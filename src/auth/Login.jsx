import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { auth } from "./firebase";
const { Title, Text } = Typography;
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (values) => {
    console.log("email: ", email);
    console.log("password:", password);
    console.log("Form Values for login: ", values);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed in: ", user);
        const userDoc = await getDoc(doc(db, "chatUsers", user.uid));
        const userData = userDoc.data();
        console.log("userData=>", userData);
        const loginData = localStorage.setItem(
          "formData",
          JSON.stringify(userData)
        );
        console.log("loginData=>", loginData);
        message.success("Account Login successfully!");
        navigate("/chatHome");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("Error code: ", errorCode);
        const errorMessage = error.message;
        message.error(errorCode);
        console.log("Error message: ", errorMessage);
      });
  };
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log("User signed in with Result Google: ", result.user);
        await setDoc(doc(db, "chatgoogleUsers", user.uid), {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
        const userDoc = await getDoc(doc(db, "chatgoogleUsers", user.uid));
        const googleUserData = userDoc.data();
        console.log("googleUserData=>", googleUserData);
        const loginData = localStorage.setItem(
          "googleFormData",
          JSON.stringify(googleUserData)
        );
        console.log("loginData=>", loginData);
        message.success("Login successful!");
        navigate("/chatHome");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("Error code: ", errorCode);
        const errorMessage = error.message;
        message.error(errorCode);
        console.log("Error message: ", errorMessage);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">      
      <div className="w-full  max-w-md bg-white p-10 rounded-2xl shadow-2xl transition-all duration-300">
        <Title level={2} className="text-center text-blue-600 mb-6">
          Welcome Back 👋
        </Title>
        <Text className="block text-center text-gray-600 mb-6">
          Please enter your login details
        </Text>

        <Form
          layout="vertical"
          onFinish={handleLoginSubmit}
          className="space-y-4"
        >
          {/* Email or Username */}
          <Form.Item
            label="Email"
            name="username"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              size="large"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<UserOutlined className="text-gray-400" />}
              className="rounded-lg"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              prefix={<LockOutlined className="text-gray-400" />}
              className="rounded-lg"
            />
          </Form.Item>

          {/* Login Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Login
            </Button>
          </Form.Item>
          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-sm text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Google Button */}
          <Button
            onClick={handleGoogleLogin}
            type="default"
            size="large"
            block
            className="flex items-center justify-center gap-2 rounded-lg border-gray-300"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </Button>
          {/* Signup Link */}
          <div className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

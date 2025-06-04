import React, { useEffect, useState } from "react";
import {
  SendOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { GoogleGenAI } from "@google/genai";
import APIKey from "../auth/Apikey";
import { formatMessageContent } from "./FormatMessage";
import { message } from "antd";

const ChatHome = ({ isSidebarOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const formData = JSON.parse(localStorage.getItem("formData"));
  const googleFormData = JSON.parse(localStorage.getItem("googleFormData"));
  const userName = formData?.fullname || googleFormData?.displayName || "Guest";
  const userEmail = formData?.email || googleFormData?.email || "Guest";

  const handleSendMsg = async () => {
    if (!inputValue.trim()) {
      message.error("Please enter a message before sending.");
      return;
    }
    setIsSending(true);
    const userMessage = { sender: "user", text: inputValue };
    setMessages((prev) => [...(prev || []), userMessage]);
    const userInput = inputValue;
    setInputValue("");

    try {
      const ai = new GoogleGenAI({ apiKey: APIKey });
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: userInput,
      });

      const text = response.text || "No response received.";
      const aiMessage = { sender: "ai", text };
      setMessages((prev) => {
        const updateMsg = [...(prev || []), aiMessage];
        localStorage.setItem(`Chat-${userEmail}`, JSON.stringify(updateMsg));
        return updateMsg;
      });
    } catch (error) {
      console.error("Error generating AI response:", error);
      const errorMessage = {
        sender: "ai",
        text: "Error generating AI response! Please try again later.",
      };
      setMessages((prev) => [...(prev || []), errorMessage]);
    }

    setIsSending(false);
  };

  useEffect(() => {
    const getMessages = JSON.parse(localStorage.getItem(`Chat-${userEmail}`));
    setMessages(getMessages);
  }, []);

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-white transition-all duration-300 ${isSidebarOpen ? "ml-0" : "ml-[-10rem]"}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 md:px-6 py-4 md:py-5 shadow-md text-lg md:text-2xl font-bold tracking-wide flex justify-between items-center">
        <span>🤖 AI Chat Assistant</span>
        <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 px-3 md:px-4 py-1.5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          👤 {userName}
        </span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 md:space-y-5">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 md:px-6 py-3 rounded-3xl max-w-[90%] md:max-w-[75%] text-sm md:text-base shadow-md ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                  : "bg-white border border-blue-100 text-gray-800"
              }`}
            >
              {formatMessageContent(msg.text)}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-3 md:px-4 py-3 md:py-4 shadow-inner">
        <div className="flex items-center gap-3 relative">
          <span className="absolute left-4 text-blue-500 text-xl">
            <PaperClipOutlined />
          </span>

          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendMsg();
              }
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="w-full pl-12 pr-12 py-3 md:py-4 border border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm md:text-base bg-gray-50"
            placeholder="Type your message..."
            disabled={isSending}
          />

          <button
            onClick={handleSendMsg}
            className="absolute right-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-600 hover:to-blue-600 text-white px-3 py-2 rounded-full shadow transition cursor-pointer"
            disabled={isSending}
          >
            {isSending ? (
              <div className="w-6 h-6 bg-white rounded-md animate-pulse flex items-center justify-center text-blue-600 font-semibold text-xs">
                AI
              </div>
            ) : (
              <SendOutlined className="text-lg" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHome;

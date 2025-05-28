import React, { useState } from "react";
import {
  PaperClipOutlined,
  SendOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { GoogleGenAI } from "@google/genai";
import APIKey from "../auth/Apikey";
import { formatMessageContent } from "./FormatMessage";

const ChatHome = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false); // New state

  const formData = JSON.parse(localStorage.getItem("formData"));
  const googleFormData = JSON.parse(localStorage.getItem("googleFormData"));
  const userName = formData?.fullname || googleFormData?.displayName || "Guest";

  const handleSendMsg = async () => {
    if (!inputValue.trim() || isSending) return;

    setIsSending(true); // Sending start
    console.log("Message sent:", inputValue);
    const userMessage = { sender: "user", text: inputValue };
    const userInput = inputValue;
    setInputValue("");
    setMessages((prev) => [...prev, userMessage]);

    try {
      const ai = new GoogleGenAI({ apiKey: APIKey });
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: userInput,
      });
      const text = response.text;
      console.log("AI result:", response);
      console.log("Text from AI:", text);
      const aiMessage = { sender: "ai", text: text };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      const errorMessage = { sender: "ai", text: "AI se response nahi aya." };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsSending(false); // Sending done
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-100 via-blue-100 to-white w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-5 shadow-md text-2xl font-bold tracking-wide flex justify-between items-center">
        <span>🤖 AI Chat Assistant</span>
        <span className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-1.5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          👤 {userName}
        </span>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-6 py-3 rounded-3xl max-w-[75%] text-sm shadow-md ${
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
      <div className="border-t bg-white px-4 py-5 shadow-inner">
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
            className="flex-1 pl-12 pr-12 py-5 border border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm bg-gray-50"
            placeholder="Type your message..."
            disabled={isSending} // Input disable during sending (optional)
          />

          <button
            onClick={handleSendMsg}
            className="absolute right-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-600 hover:to-blue-600 text-white px-3 py-2 rounded-full shadow transition"
            disabled={isSending} // Disable button while sending
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

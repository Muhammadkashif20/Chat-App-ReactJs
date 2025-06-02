import { message } from "antd";
import React, { useState } from "react";

export const formatMessageContent = (text) => {
  const parts = text?.split("```");

  
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      message.success("Code copied to clipboard!");
    });
  };

  return parts?.map((part, index) => {
    if (index % 2 === 1) {
      const codeText = part.trim();
      return (
        <div key={index} className="mb-4 relative">
          <pre className="bg-gray-900 text-blue-300 p-4 rounded-md text-xs overflow-x-auto whitespace-pre-wrap">
            <code>{codeText}</code>
          </pre>
          <button
            onClick={() => copyToClipboard(codeText)}
            className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
          >
            Copy
          </button>
        </div>
      );
    } else {
      return (
        <p key={index} className="whitespace-pre-wrap text-sm my-2">
          {part.trim()}
        </p>
      );
    }
  });
};

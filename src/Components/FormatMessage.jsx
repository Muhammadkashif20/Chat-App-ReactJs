import React from "react";

export const formatMessageContent = (text) => {
  const parts = text.split("```"); 
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <pre
          key={index}
          className="bg-gray-900 text-blue-300 p-4 rounded-md text-xs overflow-x-auto mb-2"
        >
          <code>{part.trim()}</code>
        </pre>
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

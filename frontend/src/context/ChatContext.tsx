"use client";

import React, { createContext, useState, useContext } from "react";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used inside ChatProvider");
  return context;
};

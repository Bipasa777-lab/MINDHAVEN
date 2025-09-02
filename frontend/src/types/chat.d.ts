// types/chat.d.ts

export interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "peer";
  text: string;
  timestamp: string; // ISO date string
}

export interface ChatSession {
  id: string;
  participants: string[]; // user IDs
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

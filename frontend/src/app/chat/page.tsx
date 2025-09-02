// src/app/chat/page.tsx
"use client";
import ChatBox from "@/components/ChatBox";

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h2 className="text-2xl font-semibold mb-4">AI First-Aid Chat</h2>
      <p className="text-sm text-gray-600 mb-6">Quick coping ideas — not a replacement for professional help.</p>
      <ChatBox />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi, I’m here to help. How are you feeling today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      // Replace with your actual AI chat endpoint when ready
      // const { data } = await api.post("/ai-chat/message", { message: text });
      // const reply = data?.reply ?? "…";
      const reply = "Thanks for sharing. Can you tell me a bit more?";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn’t reach the server." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="mb-2 text-lg font-semibold">Support Chat</CardHeader>
      <CardContent>
        <div className="h-72 overflow-y-auto rounded-lg border p-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={m.role === "user" ? "text-right mb-2" : "text-left mb-2"}
            >
              <span
                className={
                  m.role === "user"
                    ? "inline-block rounded-2xl bg-blue-600 px-3 py-2 text-white"
                    : "inline-block rounded-2xl bg-gray-100 px-3 py-2"
                }
              >
                {m.content}
              </span>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="Type your message…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <Button onClick={send} disabled={loading}>
            {loading ? "Sending…" : "Send"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

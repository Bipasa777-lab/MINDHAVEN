// src/app/auth/forgot-password.tsx
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api, { setAuthToken } from "@/lib/api";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch {
      alert("Failed to request reset — try again later.");
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-14">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-3">Forgot password</h2>
        {sent ? (
          <p className="text-sm text-gray-600">If that email exists we sent a reset link.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <Button type="submit" className="w-full">Send reset link</Button>
          </form>
        )}
      </div>
    </div>
  );
}

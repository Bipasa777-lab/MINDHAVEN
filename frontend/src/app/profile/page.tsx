// src/app/profile/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { api, setAuthToken } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    setAuthToken(token);
    (async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user ?? res.data);
      } catch {
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    })();
  }, [router]);

  if (!user) return <div className="p-6">Loading profile…</div>;

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="card p-6">
        <h2 className="text-2xl font-semibold mb-2">Your Profile</h2>
        <div className="text-sm text-gray-700 mb-4">
          <strong>Name:</strong> {user.name || user.email} <br />
          <strong>Email:</strong> {user.email}
        </div>

        <button
          className="btn-danger"
          onClick={() => {
            localStorage.removeItem("token");
            setAuthToken(undefined);
            router.push("/");
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

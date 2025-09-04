"use client";

import { useEffect, useState } from "react";
import AnalyticsChart from "@/components/AnalyticsChart";
import api, { setAuthToken } from "@/lib/api"; // ✅ import default api

type Point = {
  label: string;
  users?: number;
  bookings?: number;
  chats?: number;
};

export default function AnalyticsPage() {
  const [data, setData] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // ✅ Tell TypeScript what we expect from the API
        const res = await api.get<Point[]>("/admin/metrics");
        setData(res || []); // ✅ res is already JSON, no `.data`
      } catch (err) {
        console.error("Failed to load metrics", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <h2 className="text-2xl font-semibold mb-4">Anonymous Analytics</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AnalyticsChart data={data} />
      )}
    </div>
  );
}

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

export function setAuthToken(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;

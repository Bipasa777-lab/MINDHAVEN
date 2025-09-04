"use client";

import { useEffect, useState } from "react";
import AnalyticsChart from "@/components/AnalyticsChart";
import api from "@/lib/api";

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
        const res = await api.get("/admin/metrics");
        setData(res.data || []);
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
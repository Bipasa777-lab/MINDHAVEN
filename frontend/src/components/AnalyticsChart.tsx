"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Point = { label: string; users?: number; bookings?: number; chats?: number };

export default function AnalyticsChart({ data }: { data: Point[] }) {
  const fallback = [
    { label: "Mon", users: 10, bookings: 2, chats: 30 },
    { label: "Tue", users: 14, bookings: 3, chats: 40 },
    { label: "Wed", users: 12, bookings: 4, chats: 35 },
    { label: "Thu", users: 18, bookings: 6, chats: 50 },
    { label: "Fri", users: 22, bookings: 8, chats: 58 },
    { label: "Sat", users: 15, bookings: 5, chats: 40 },
    { label: "Sun", users: 9, bookings: 2, chats: 25 },
  ];

  const rows = data?.length ? data : fallback;

  return (
    <Card className="w-full">
      <CardHeader className="text-lg font-semibold">Weekly Overview</CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#2563eb" dot={false} />
            <Line type="monotone" dataKey="bookings" stroke="#16a34a" dot={false} />
            <Line type="monotone" dataKey="chats" stroke="#f59e0b" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

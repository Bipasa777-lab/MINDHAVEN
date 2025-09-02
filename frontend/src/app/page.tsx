// src/app/page.tsx
"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-2xl bg-[var(--card-bg)] p-12 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">MindHaven</h1>
        <p className="text-lg text-gray-600 mb-6">
          Campus-focused digital mental health: AI first-aid, confidential bookings, and peer support.
        </p>

        <div className="flex gap-3">
          <Link href="/auth/register"><button className="btn-primary">Get Started</button></Link>
          <Link href="/auth/login"><button className="btn-secondary">Login</button></Link>
          <Link href="/chat"><button className="btn-secondary">Open Chat</button></Link>
        </div>
      </div>

      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="card p-6">AI First Aid — breathing & grounding</div>
        <div className="card p-6">Confidential Booking — campus counsellors</div>
        <div className="card p-6">Peer Support Forum — moderated</div>
      </section>
    </div>
  );
}

// src/app/booking/page.tsx
"use client";
import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h2 className="text-2xl font-semibold mb-4">Confidential Booking</h2>
      <p className="text-sm text-gray-600 mb-6">Book a private session with campus counsellors.</p>
      <BookingForm />
    </div>
  );
}

// types/booking.d.ts

export interface Booking {
  id: string;
  userId: string;
  resourceId: string;
  date: string;       // "2025-09-02"
  time: string;       // "14:00"
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface BookingRequest {
  resourceId: string;
  date: string;
  time: string;
}

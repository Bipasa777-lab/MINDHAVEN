"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

const schema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Invalid phone"),
  date: z.string().min(1, "Choose date"),
  time: z.string().min(1, "Choose time"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    setMessage("");
    try {
      // Combine date + time into ISO
      const startTime = new Date(`${values.date}T${values.time}:00`);
      await api.post("/bookings", {
        clientName: values.fullName,
        email: values.email,
        phone: values.phone,
        startTime,
        notes: values.notes || "",
      });
      setStatus("ok");
      setMessage("Booking created successfully.");
      reset();
    } catch (e: any) {
      setStatus("error");
      setMessage(e?.response?.data?.message || "Failed to create booking.");
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-lg font-semibold">Confidential Booking</CardHeader>
      <CardContent>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input placeholder="Full Name" {...register("fullName")} />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <Input placeholder="Email" type="email" {...register("email")} />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input placeholder="Phone" {...register("phone")} />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input type="date" {...register("date")} />
              {errors.date && (
                <p className="mt-1 text-xs text-red-600">{errors.date.message}</p>
              )}
            </div>
            <div>
              <Input type="time" {...register("time")} />
              {errors.time && (
                <p className="mt-1 text-xs text-red-600">{errors.time.message}</p>
              )}
            </div>
          </div>
          <div>
            <Input placeholder="Notes (optional)" {...register("notes")} />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Booking…" : "Book Session"}
          </Button>
        </form>

        {message && (
          <div
            className={
              "mt-3 text-sm " +
              (status === "ok" ? "text-green-700" : status === "error" ? "text-red-700" : "")
            }
          >
            {message}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Your information is private and encrypted in transit.
      </CardFooter>
    </Card>
  );
}

// src/app/auth/register.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api, { setAuthToken } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormValues = { name: string; email: string; password: string; };

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { isSubmitting } = formState;

  async function onSubmit(values: FormValues) {
    try {
      const res = await api.post("/auth/register", values);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
      }
      router.push("/profile");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-14">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-3">Create account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div><Input placeholder="Full name" {...register("name", { required: true })}/></div>
          <div><Input placeholder="Email" {...register("email", { required: true })}/></div>
          <div><Input type="password" placeholder="Password" {...register("password", { required: true, minLength: 6 })}/></div>
          <div><Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Creating…" : "Create account"}</Button></div>
        </form>
      </div>
    </div>
  );
}

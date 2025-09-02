// src/app/auth/login.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api, setAuthToken } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormValues = { email: string; password: string; };

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { isSubmitting, errors } = formState;

  async function onSubmit(values: FormValues) {
    try {
      const res = await api.post("/auth/login", values);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
      }
      // Optionally fetch user or rely on AuthProvider to do it when token exists
      router.push("/profile");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-14">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-3">Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div><Input placeholder="Email" {...register("email", { required: true })}/></div>
          <div><Input type="password" placeholder="Password" {...register("password", { required: true })}/></div>
          <div><Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Signing in…" : "Sign in"}</Button></div>
        </form>
        <div className="mt-3 text-sm"><a href="/auth/forgot-password" className="text-blue-600">Forgot password?</a></div>
      </div>
    </div>
  );
}

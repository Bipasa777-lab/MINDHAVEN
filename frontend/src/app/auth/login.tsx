import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api, { setAuthToken } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormValues = { email: string; password: string };

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { isSubmitting, errors } = formState;

  async function onSubmit(values: FormValues) {
    try {
      const res = await api.post("/auth/login", values);
      const token = res.data.token;

      if (token) {
        setAuthToken(token);
        router.push("/dashboard"); // ✅ redirect after login
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Email" {...register("email")} />
      <Input placeholder="Password" type="password" {...register("password")} />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border"
      >

        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="text-slate-500 mt-2">
          Login to ResumeIQ
        </p>

        <div className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border p-3 outline-none"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border p-3 outline-none"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-3 text-white hover:bg-indigo-700"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <p className="text-center text-sm">

            Don't have an account?

            <Link
              href="/signup"
              className="ml-2 text-indigo-600"
            >
              Signup
            </Link>

          </p>

        </div>

      </form>

    </main>
  );
}
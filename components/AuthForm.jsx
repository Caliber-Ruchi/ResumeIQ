"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }) {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      let result;

      if (mode === "signup") {
        result = await supabase.auth.signUp({
          email,
          password,
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      if (result.error) {
        throw result.error;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-2xl p-8 shadow-sm space-y-5"
    >
      <div>
        <label className="text-sm font-medium">
          Email
        </label>

        <input
          className="mt-2 w-full rounded-lg border p-3"
          type="email"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Password
        </label>

        <input
          className="mt-2 w-full rounded-lg border p-3"
          type="password"
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 py-3 text-white hover:bg-indigo-700 transition"
      >
        {loading
          ? "Please wait..."
          : mode==="signup"
          ? "Create Account"
          : "Login"}
      </button>
    </form>
  );
}
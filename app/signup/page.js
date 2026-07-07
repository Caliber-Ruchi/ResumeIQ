"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {

    const router = useRouter();

    const supabase = createClient();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleSignup(e) {

        e.preventDefault();

        setLoading(true);

        setError("");

        const { data, error } = await supabase.auth.signUp({

            email,

            password

        });

        if (error) {

            setError(error.message);

            setLoading(false);

            return;

        }

        if (data.user) {

            const { error: profileError } = await supabase
                .from("profiles")
                .insert({
                    id: data.user.id,
                    email: data.user.email,
                    plan: "FREE",
                });

            if (profileError) {
                console.error(profileError);
                setError(profileError.message);
                setLoading(false);
                return;
            }
        }

        setLoading(false);

        router.push("/dashboard");

        router.refresh();

    }

    return (

        <main className="min-h-screen flex items-center justify-center bg-slate-50">

            <form

                onSubmit={handleSignup}

                className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border"

            >

                <h1 className="text-3xl font-bold">

                    Create Account

                </h1>

                <p className="mt-2 text-slate-500">

                    Start improving your resume today.

                </p>

                <div className="mt-8 space-y-5">

                    <input

                        type="email"

                        placeholder="Email"

                        className="w-full rounded-lg border p-3"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                        required

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        className="w-full rounded-lg border p-3"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                        required

                    />

                    {error && (

                        <p className="text-red-500">

                            {error}

                        </p>

                    )}

                    <button

                        disabled={loading}

                        className="w-full rounded-lg bg-indigo-600 py-3 text-white"

                    >

                        {

                            loading

                                ?

                                "Creating..."

                                :

                                "Create Account"

                        }

                    </button>

                    <p className="text-center text-sm">

                        Already have an account?

                        <Link

                            href="/login"

                            className="ml-2 text-indigo-600"

                        >

                            Login

                        </Link>

                    </p>

                </div>

            </form>

        </main>

    )

}
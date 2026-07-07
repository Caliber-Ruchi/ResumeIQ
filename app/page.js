import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-20">
        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="rounded-full border bg-indigo-50 px-4 py-2 text-sm text-indigo-600">
              AI Powered ATS Resume Review
            </span>

            <h1 className="mt-8 text-6xl font-bold leading-tight">
              Beat ATS.
              <br />
              Land More
              <span className="text-indigo-600"> Interviews.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-gray-600">
              Upload your resume, compare it against any job description,
              and receive recruiter-grade ATS feedback powered by Gemini AI.
            </p>

            <div className="mt-10 flex gap-4">
              <Link
                href="/signup"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
              >
                Get Started
              </Link>

              <a
                href="#pricing"
                className="rounded-xl border px-6 py-3"
              >
                Pricing
              </a>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-xl">
            <h3 className="text-xl font-semibold">
              ATS Score
            </h3>

            <div className="mt-6 flex items-center justify-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-indigo-600 text-5xl font-bold">
                87
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              <div className="rounded-xl bg-gray-50 p-4">
                ✓ Strong keyword match
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                ✓ Good formatting
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                ✓ Recruiter recommendations
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
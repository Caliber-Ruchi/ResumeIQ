"use client";

export default function PricingPage() {

  async function handleUpgrade() {

    const res = await fetch("/api/checkout", {
      method: "POST",
    });

    const data = await res.json();

    window.location.href = data.url;
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="rounded-3xl bg-white shadow-xl p-10 max-w-md w-full">

        <h1 className="text-3xl font-bold">
          ResumeIQ Pro
        </h1>

        <p className="mt-4 text-slate-600">
          Unlimited AI resume reviews
        </p>

        <div className="mt-8">

          <span className="text-5xl font-bold">
            $9.99
          </span>

          <span className="text-slate-500">
            /one time
          </span>

        </div>

        <button
          onClick={handleUpgrade}
          className="mt-10 w-full rounded-xl bg-indigo-600 py-4 text-white hover:bg-indigo-700"
        >
          Upgrade Now
        </button>

      </div>

    </main>
  );
}
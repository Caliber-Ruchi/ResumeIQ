"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600"
        >
          ResumeIQ
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-gray-600 hover:text-black">
            Features
          </a>

          <a href="#pricing" className="text-sm text-gray-600 hover:text-black">
            Pricing
          </a>

          <Link
            href="/login"
            className="text-sm font-medium text-gray-700"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
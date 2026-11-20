
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#f7f9f8]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="hidden flex-col justify-between bg-emerald-800 p-12 text-white lg:flex">
          <Link href="/login" className="text-3xl font-black tracking-tight">
            TradeBridge<span className="text-emerald-300">.</span>
          </Link>

          <div className="max-w-lg">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              🔐
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Get back to your TradeBridge account.
            </h1>

            <p className="mt-6 text-lg leading-8 text-emerald-100">
              Your marketplace connections, listings and opportunities
              are waiting for you.
            </p>
          </div>

          <p className="text-sm text-emerald-200">
            Buy. Sell. Exchange. Connect.
          </p>
        </section>

        <section className="flex items-center justify-center px-5 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <Link
              href="/login"
              className="text-2xl font-black tracking-tight text-emerald-700 lg:hidden"
            >
              TradeBridge<span className="text-gray-900">.</span>
            </Link>

            <div className="mt-12 lg:mt-0">
              <Link
                href="/login"
                className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-emerald-700"
              >
                <span>←</span> Back to login
              </Link>

              {submitted ? (
                <div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
                    ✓
                  </div>

                  <h2 className="mt-7 text-3xl font-bold text-gray-900">
                    Request received
                  </h2>

                  <p className="mt-4 leading-7 text-gray-600">
                    Your demo password-reset request for{" "}
                    <strong>{email}</strong> has been recorded on this
                    screen.
                  </p>

                  <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                    This is a frontend demonstration. No email has been
                    sent and your password has not been changed.
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setEmail("");
                    }}
                    className="mt-7 w-full rounded-xl bg-emerald-700 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-800"
                  >
                    Try another email
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
                    Account recovery
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-900">
                    Forgot your password?
                  </h2>

                  <p className="mt-3 leading-7 text-gray-500">
                    Enter the email address associated with your
                    TradeBridge account.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                      >
                        Email address
                      </label>

                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                      />
                    </div>

                    {error && (
                      <p className="text-sm font-medium text-red-600">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-emerald-700 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-800"
                    >
                      Continue
                    </button>
                  </form>

                  <div className="mt-7 rounded-xl border border-gray-200 bg-white p-4 text-xs leading-6 text-gray-500">
                    Password recovery is currently in demo mode. Real
                    email recovery will be activated with Supabase.
                  </div>

                  <p className="mt-8 text-center text-sm text-gray-500">
                    Remember your password?{" "}
                    <Link
                      href="/login"
                      className="font-bold text-emerald-700 hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

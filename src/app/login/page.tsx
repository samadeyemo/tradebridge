
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const storedUser = localStorage.getItem("tradebridge_demo_user");

    if (!storedUser) {
      setError("No demo account found. Please register first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.email.toLowerCase() !== email.trim().toLowerCase()) {
      setError("Email address does not match your registered account.");
      return;
    }

    // Demo only: no real password verification.
    setLoading(true);

    const session = {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      loggedIn: true,
    };

    if (rememberMe) {
      localStorage.setItem("tradebridge_demo_session", JSON.stringify(session));
    } else {
      sessionStorage.setItem("tradebridge_demo_session", JSON.stringify(session));
    }

    router.push("/dashboard");
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Branding section */}
        <section className="relative hidden overflow-hidden bg-emerald-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-800/40 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-700/30 blur-3xl" />

          <Link href="/" className="relative text-2xl font-black tracking-tight">
            Trade<span className="text-emerald-400">Bridge</span>
          </Link>

          <div className="relative max-w-lg">
            <span className="mb-5 inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300">
              YOUR MARKETPLACE STARTS HERE
            </span>

            <h1 className="text-5xl font-bold leading-tight">
              Welcome back to smarter trading.
            </h1>

            <p className="mt-6 text-lg leading-8 text-emerald-100/75">
              Sign in to discover products, manage your listings, connect
              with buyers and sellers, and make better exchanges.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Discover products from different sellers",
                "Manage your buying and selling activities",
                "Connect with people and exchange value",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                    ✓
                  </span>
                  <span className="text-sm text-emerald-100/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-sm text-emerald-100/50">
            © {2026} TradeBridge. All rights reserved.
          </p>
        </section>

        {/* Login form */}
        <section className="flex items-center justify-center px-5 py-12 sm:px-10">
          <div className="w-full max-w-md">

            <Link
              href="/"
              className="mb-10 inline-block text-2xl font-black tracking-tight text-emerald-950 lg:hidden"
            >
              Trade<span className="text-emerald-600">Bridge</span>
            </Link>

            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Sign in to TradeBridge
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Enter your account details to continue where you left off.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email address
                </label>

                <input
                  className={inputClass}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    className={`${inputClass} pr-20`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-emerald-700"
                />
                Remember me
              </label>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-emerald-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">NEW TO TRADEBRIDGE?</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <Link
              href="/register"
              className="block w-full rounded-xl border border-gray-200 bg-white py-3.5 text-center text-sm font-semibold text-gray-700 transition hover:border-emerald-600 hover:text-emerald-700"
            >
              Create an account
            </Link>

            <p className="mt-8 text-center text-xs leading-5 text-gray-400">
              Demo authentication only. Password verification will be
              implemented when real authentication is connected.
            </p>

          </div>
        </section>
      </div>
    </main>
  );
}

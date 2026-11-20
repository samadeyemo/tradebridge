
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserProfile = {
  fullName: string;
  email: string;
  phone: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const session =
      localStorage.getItem("tradebridge_demo_session") ||
      sessionStorage.getItem("tradebridge_demo_session");

    if (!session) {
      router.replace("/login");
      return;
    }

    try {
      const user = JSON.parse(session);

      if (!user.loggedIn || !user.email) {
        router.replace("/login");
        return;
      }

      setProfile({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    } catch {
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

    setMessage("");
    setError("");
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!profile.fullName.trim() || !profile.phone.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    setSaving(true);

    try {
      const localSession = localStorage.getItem(
        "tradebridge_demo_session"
      );

      const temporarySession = sessionStorage.getItem(
        "tradebridge_demo_session"
      );

      const activeSession = localSession || temporarySession;

      if (!activeSession) {
        router.replace("/login");
        return;
      }

      const updatedUser = {
        ...JSON.parse(activeSession),
        fullName: profile.fullName.trim(),
        phone: profile.phone.trim(),
      };

      if (localSession) {
        localStorage.setItem(
          "tradebridge_demo_session",
          JSON.stringify(updatedUser)
        );
      } else {
        sessionStorage.setItem(
          "tradebridge_demo_session",
          JSON.stringify(updatedUser)
        );
      }

      const registeredUser = localStorage.getItem(
        "tradebridge_demo_user"
      );

      if (registeredUser) {
        const original = JSON.parse(registeredUser);

        localStorage.setItem(
          "tradebridge_demo_user",
          JSON.stringify({
            ...original,
            fullName: updatedUser.fullName,
            phone: updatedUser.phone,
          })
        );
      }

      setMessage("Your profile has been updated successfully.");
    } catch {
      setError("Unable to update your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("tradebridge_demo_session");
    sessionStorage.removeItem("tradebridge_demo_session");
    router.replace("/login");
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="text-2xl font-black text-emerald-950">
            Trade<span className="text-emerald-600">Bridge</span>
          </Link>

          <Link
            href="/dashboard"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10">

        {/* Page heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Account Settings
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Profile summary */}
          <section className="h-fit rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-4xl font-bold text-emerald-800">
                {profile.fullName.charAt(0).toUpperCase()}
              </div>

              <h2 className="mt-4 text-lg font-bold text-gray-900">
                {profile.fullName}
              </h2>

              <p className="mt-1 break-all text-sm text-gray-500">
                {profile.email}
              </p>

              <span className="mt-4 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
                Active Demo Account
              </span>
            </div>

            <div className="my-6 border-t border-gray-100" />

            <nav className="space-y-2 text-sm">
              <Link
                href="/dashboard"
                className="block rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50"
              >
                Dashboard
              </Link>

              <Link
                href="/marketplace"
                className="block rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50"
              >
                Marketplace
              </Link>

              <Link
                href="/sell"
                className="block rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50"
              >
                My Listings
              </Link>

              <button
                onClick={handleLogout}
                className="w-full rounded-xl px-4 py-3 text-left text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </nav>
          </section>

          {/* Edit profile */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 lg:col-span-2">

            <div className="mb-7">
              <h2 className="text-lg font-bold text-gray-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Update your contact and personal details.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  className={inputClass}
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  className={`${inputClass} cursor-not-allowed bg-gray-50`}
                  type="email"
                  value={profile.email}
                  disabled
                />

                <p className="mt-2 text-xs text-gray-400">
                  Email changes will be managed through authentication later.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  className={inputClass}
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
                  required
                />
              </div>

              {message && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                  {message}
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                <Link
                  href="/dashboard"
                  className="rounded-xl border border-gray-200 px-6 py-3 text-center text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-emerald-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </form>
          </section>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          © {2026} TradeBridge. All rights reserved.
        </p>
      </div>
    </main>
  );
}

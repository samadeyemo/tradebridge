
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type DemoUser = {
  fullName: string;
  email: string;
  phone?: string;
};

const quickActions = [
  {
    title: "Buy Products",
    description: "Explore available products",
    icon: "🛍️",
    href: "/marketplace",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Sell Products",
    description: "List something for sale",
    icon: "📦",
    href: "/sell",
    color: "bg-blue-50 text-blue-700",
  },
  {
    title: "Exchange",
    description: "Trade with other people",
    icon: "🔄",
    href: "/marketplace",
    color: "bg-purple-50 text-purple-700",
  },
];

const recentProducts = [
  {
    name: "Product listings will appear here",
    category: "Marketplace",
    status: "Coming soon",
    price: "—",
    icon: "📦",
  },
  {
    name: "Your buying activity",
    category: "Purchases",
    status: "Coming soon",
    price: "—",
    icon: "🛒",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
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

    try {
      const session = JSON.parse(activeSession);

      if (!session.loggedIn || !session.email) {
        router.replace("/login");
        return;
      }

      setUser(session);
    } catch {
      localStorage.removeItem("tradebridge_demo_session");
      sessionStorage.removeItem("tradebridge_demo_session");
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("tradebridge_demo_session");
    sessionStorage.removeItem("tradebridge_demo_session");
    router.replace("/login");
  }

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-700" />
          <p className="text-sm text-gray-500">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  const firstName = user.fullName.split(" ")[0] || "Trader";

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">

          <Link href="/" className="text-2xl font-black tracking-tight text-emerald-950">
            Trade<span className="text-emerald-600">Bridge</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/marketplace" className="text-sm font-medium text-gray-600 hover:text-emerald-700">
              Marketplace
            </Link>
            <Link href="/sell" className="text-sm font-medium text-gray-600 hover:text-emerald-700">
              Sell
            </Link>
            <Link href="/dashboard" className="text-sm font-semibold text-emerald-700">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-800">
                {user.fullName}
              </p>
              <p className="text-xs text-gray-400">Customer account</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
              {firstName.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-600 md:hidden"
              aria-label="Toggle navigation"
            >
              ☰
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="border-t border-gray-100 bg-white p-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm font-medium text-gray-600">
              <Link href="/dashboard" onClick={() => setMobileMenu(false)}>Dashboard</Link>
              <Link href="/marketplace" onClick={() => setMobileMenu(false)}>Marketplace</Link>
              <Link href="/sell" onClick={() => setMobileMenu(false)}>Sell Products</Link>
              <button onClick={handleLogout} className="text-left text-red-600">Sign out</button>
            </nav>
          </div>
        )}
      </header>

      <div className="mx-auto flex max-w-[1600px]">

        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-64px)] w-64 shrink-0 border-r border-gray-200 bg-white p-6 lg:block">
          <p className="mb-5 text-xs font-bold uppercase tracking-wider text-gray-400">
            Workspace
          </p>

          <nav className="space-y-2">
            <Link href="/dashboard" className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
              <span>▦</span> Overview
            </Link>

            <Link href="/marketplace" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
              <span>🛍️</span> Marketplace
            </Link>

            <Link href="/sell" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
              <span>📦</span> My Listings
            </Link>

            <Link href="/marketplace" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
              <span>🔄</span> Exchanges
            </Link>
          </nav>

          <div className="my-8 border-t border-gray-100" />

          <p className="mb-5 text-xs font-bold uppercase tracking-wider text-gray-400">
            Account
          </p>

          <nav className="space-y-2">
            <Link href="/dashboard" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
              <span>👤</span> My Profile
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <span>↪</span> Sign Out
            </button>
          </nav>

          <div className="mt-16 rounded-2xl bg-emerald-950 p-5 text-white">
            <p className="text-sm font-bold">Trade smarter.</p>
            <p className="mt-2 text-xs leading-5 text-emerald-100/70">
              Discover opportunities and connect with people through TradeBridge.
            </p>
            <Link href="/marketplace" className="mt-4 block text-xs font-semibold text-emerald-300">
              Explore marketplace →
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">

          {/* Welcome */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-emerald-700">
                CUSTOMER DASHBOARD
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Welcome back, {firstName} 👋
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Here's what's happening with your TradeBridge account.
              </p>
            </div>

            <Link
              href="/sell"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/10 transition hover:bg-emerald-800"
            >
              + List a Product
            </Link>
          </div>

          {/* Account summary */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {[
              { label: "Active Listings", value: "0", icon: "📦", note: "Your products for sale" },
              { label: "Total Purchases", value: "0", icon: "🛍️", note: "Products purchased" },
              { label: "Exchanges", value: "0", icon: "🔄", note: "Successful exchanges" },
              { label: "Account Status", value: "Active", icon: "✓", note: "Demo account" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                    {item.icon}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                  {item.value}
                </h2>

                <p className="mt-1 text-xs text-gray-400">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="mb-8">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900">Quick actions</h2>
              <p className="mt-1 text-sm text-gray-500">
                What would you like to do today?
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                >
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-xl ${action.color}`}>
                    {action.icon}
                  </div>

                  <h3 className="font-bold text-gray-900 group-hover:text-emerald-700">
                    {action.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {action.description}
                  </p>

                  <p className="mt-5 text-sm font-semibold text-emerald-700">
                    Get started →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 xl:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">Recent activity</h2>
                  <p className="mt-1 text-xs text-gray-400">
                    Your latest marketplace activities
                  </p>
                </div>

                <span className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
                  All activity
                </span>
              </div>

              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.name} className="flex items-center gap-4 rounded-xl border border-gray-100 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-xl">
                      {product.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-400">
                        {product.category}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                        {product.status}
                      </span>
                      <p className="mt-2 text-sm font-semibold text-gray-700">
                        {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-center">
                <p className="text-sm text-emerald-800">
                  Your marketplace activity will appear here as you trade.
                </p>
              </div>
            </div>

            {/* Profile card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="font-bold text-gray-900">Your account</h2>
              <p className="mt-1 text-xs text-gray-400">
                Your demo profile information
              </p>

              <div className="my-6 flex flex-col items-center border-b border-gray-100 pb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-800">
                  {firstName.charAt(0).toUpperCase()}
                </div>

                <h3 className="mt-4 font-bold text-gray-900">
                  {user.fullName}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  TradeBridge Member
                </p>

                <span className="mt-3 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  ● Active
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400">Email address</p>
                  <p className="mt-1 break-all text-sm font-medium text-gray-800">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Phone number</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {user.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="mt-7 w-full rounded-xl border border-red-100 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Sign out
              </button>
            </div>
          </div>

          <footer className="mt-10 border-t border-gray-200 py-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} TradeBridge. Buy, Sell and Exchange.
          </footer>

        </section>
      </div>
    </main>
  );
}

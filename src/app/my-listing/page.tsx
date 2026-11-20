
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Listing = {
  id: string;
  name: string;
  price: number;
  category: string;
  status: string;
  image?: string;
};

export default function MyListingsPage() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [listings, setListings] = useState<Listing[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

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

      setUserName(user.fullName || "Seller");

      // Demo listing storage. Real seller listings will come later.
      const storedListings = localStorage.getItem(
        "tradebridge_demo_listings"
      );

      if (storedListings) {
        const allListings: Listing[] = JSON.parse(storedListings);

        setListings(
          allListings.filter(
            (listing: any) => listing.sellerEmail === user.email
          )
        );
      }
    } catch {
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  function deleteListing(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmed) return;

    const updated = listings.filter((item) => item.id !== id);

    setListings(updated);

    const stored = localStorage.getItem("tradebridge_demo_listings");

    if (stored) {
      const allListings = JSON.parse(stored);
      const remaining = allListings.filter(
        (item: Listing) => item.id !== id
      );

      localStorage.setItem(
        "tradebridge_demo_listings",
        JSON.stringify(remaining)
      );
    }
  }

  function handleLogout() {
    localStorage.removeItem("tradebridge_demo_session");
    sessionStorage.removeItem("tradebridge_demo_session");
    router.replace("/login");
  }

  const filteredListings =
    filter === "All"
      ? listings
      : listings.filter((item) => item.status === filter);

  const activeCount = listings.filter(
    (item) => item.status === "Active"
  ).length;

  const pendingCount = listings.filter(
    (item) => item.status === "Pending"
  ).length;

  const soldCount = listings.filter(
    (item) => item.status === "Sold"
  ).length;

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading your listings...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">

          <Link href="/" className="text-2xl font-black text-emerald-950">
            Trade<span className="text-emerald-600">Bridge</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-gray-600 md:flex">
            <Link href="/dashboard" className="hover:text-emerald-700">
              Dashboard
            </Link>
            <Link href="/marketplace" className="hover:text-emerald-700">
              Marketplace
            </Link>
            <Link href="/my-listings" className="font-semibold text-emerald-700">
              My Listings
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-9">

        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Seller Workspace
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              My Listings
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Welcome, {userName}. Manage your products and listings.
            </p>
          </div>

          <Link
            href="/sell"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/10 transition hover:bg-emerald-800"
          >
            + Add New Product
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {[
            { label: "Total Listings", value: listings.length, icon: "📦" },
            { label: "Active", value: activeCount, icon: "🟢" },
            { label: "Pending", value: pendingCount, icon: "⏳" },
            { label: "Sold", value: soldCount, icon: "✓" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <span>{stat.icon}</span>
              </div>

              <p className="mt-4 text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Listings section */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center">

            <div>
              <h2 className="font-bold text-gray-900">
                Your Products
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Manage and monitor your marketplace listings.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "Active", "Pending", "Sold"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                    filter === status
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {filteredListings.length === 0 ? (
            <div className="px-5 py-20 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-4xl">
                📦
              </div>

              <h3 className="mt-6 text-lg font-bold text-gray-900">
                {listings.length === 0
                  ? "You haven't listed any products yet"
                  : `No ${filter.toLowerCase()} listings found`}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Start selling on TradeBridge. Add your first product and
                make it available to potential buyers.
              </p>

              <Link
                href="/sell"
                className="mt-7 inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Create Your First Listing
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredListings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-center"
                >

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                    {listing.image ? (
                      <img
                        src={listing.image}
                        alt={listing.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">📦</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {listing.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {listing.category}
                    </p>

                    <p className="mt-2 font-bold text-emerald-700">
                      ₦{listing.price.toLocaleString("en-NG")}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      listing.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : listing.status === "Sold"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {listing.status}
                    </span>

                    <button
                      onClick={() => deleteListing(listing.id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>

        {/* Seller information */}
        <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
          <h3 className="font-bold text-emerald-950">
            Grow your business on TradeBridge
          </h3>

          <p className="mt-2 text-sm leading-6 text-emerald-800">
            Create clear product listings, upload quality images and
            provide accurate descriptions to help buyers make informed decisions.
          </p>

          <Link
            href="/sell"
            className="mt-4 inline-block text-sm font-bold text-emerald-800 hover:underline"
          >
            List another product →
          </Link>
        </div>

        <footer className="mt-10 border-t border-gray-200 py-6 text-center text-xs text-gray-400">
          © {2026} TradeBridge. Buy, Sell and Exchange.
        </footer>

      </div>
    </main>
  );
}

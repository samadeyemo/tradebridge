
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Listing = {
  id: number;
  name: string;
  category: string;
  price: number;
  location: string;
  status: "Active" | "Paused" | "Sold";
  views: number;
  offers: number;
  image: string;
};

const initialListings: Listing[] = [
  {
    id: 1,
    name: "Apple iPhone 13 Pro",
    category: "Electronics",
    price: 650000,
    location: "Lagos",
    status: "Active",
    views: 245,
    offers: 8,
    image:
      "https://images.unsplash.com/photo-1632633173522-5cb7b6d7c7a3?w=600",
  },
  {
    id: 2,
    name: "Modern Office Chair",
    category: "Furniture",
    price: 185000,
    location: "Abuja",
    status: "Active",
    views: 128,
    offers: 4,
    image:
      "https://images.unsplash.com/photo-1505843490701-5be5d6c4c5c8?w=600",
  },
  {
    id: 3,
    name: "Toyota Corolla 2015",
    category: "Automobiles",
    price: 12500000,
    location: "Port Harcourt",
    status: "Paused",
    views: 512,
    offers: 12,
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600",
  },
  {
    id: 4,
    name: "Samsung Smart Television",
    category: "Electronics",
    price: 420000,
    location: "Ibadan",
    status: "Sold",
    views: 189,
    offers: 6,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600",
  },
];

const formatPrice = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

export default function SellerDashboard() {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const activeListings = listings.filter(
    (item) => item.status === "Active"
  ).length;

  const totalViews = listings.reduce(
    (total, item) => total + item.views,
    0
  );

  const totalOffers = listings.reduce(
    (total, item) => total + item.offers,
    0
  );

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [listings, search, filter]);

  function toggleStatus(id: number) {
    setListings((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Active" ? "Paused" : "Active",
            }
          : item
      )
    );
  }

  function deleteListing(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this listing?"
    );

    if (confirmed) {
      setListings((current) =>
        current.filter((item) => item.id !== id)
      );
    }
  }

  const navigation = [
    "Overview",
    "My Listings",
    "Offers",
    "Orders",
    "Messages",
    "Performance",
  ];

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-[#172033]">
      <div className="flex min-h-screen flex-col lg:flex-row">

        {/* SIDEBAR */}
        <aside className="w-full border-b border-gray-200 bg-white p-5 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
          <Link
            href="/"
            className="mb-8 flex items-center gap-2 text-2xl font-extrabold tracking-tight"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#102b46] text-white">
              T
            </span>
            <span>
              Trade<span className="text-[#16a36a]">Bridge</span>
            </span>
          </Link>

          <div className="mb-6 rounded-2xl bg-[#f1f5f9] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Seller account
            </p>
            <p className="mt-2 font-bold">Welcome back!</p>
            <p className="mt-1 text-sm text-gray-500">
              Manage your marketplace activity.
            </p>
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Seller menu
          </p>

          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {navigation.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeTab === item
                    ? "bg-[#102b46] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-8 hidden rounded-2xl border border-[#d8eee3] bg-[#f0faf5] p-4 lg:block">
            <p className="font-bold text-[#126b48]">
              Grow your business
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Keep your listings updated and respond quickly to interested buyers.
            </p>
            <Link
              href="/sell"
              className="mt-4 inline-block text-sm font-bold text-[#138657]"
            >
              Add a product →
            </Link>
          </div>

          <Link
            href="/marketplace"
            className="mt-6 inline-block text-sm font-semibold text-gray-500 hover:text-[#16a36a]"
          >
            ← Back to marketplace
          </Link>
        </aside>

        {/* MAIN CONTENT */}
        <section className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">

          {/* HEADER */}
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Seller workspace
              </p>
              <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                {activeTab}
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Manage your products, offers and marketplace activities.
              </p>
            </div>

            <Link
              href="/sell"
              className="inline-flex items-center justify-center rounded-xl bg-[#16a36a] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#128555]"
            >
              + Create Listing
            </Link>
          </div>

          {/* OVERVIEW STATS */}
          {activeTab === "Overview" && (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    label: "Total Listings",
                    value: listings.length,
                    detail: "Products in your workspace",
                  },
                  {
                    label: "Active Listings",
                    value: activeListings,
                    detail: "Currently visible",
                  },
                  {
                    label: "Total Product Views",
                    value: totalViews.toLocaleString(),
                    detail: "Across your listings",
                  },
                  {
                    label: "Offers Received",
                    value: totalOffers,
                    detail: "Interest from buyers",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm font-medium text-gray-500">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-3xl font-extrabold">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      {stat.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-5 xl:grid-cols-3">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold">
                        Recent Listings
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        A quick look at your products.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("My Listings")}
                      className="text-sm font-bold text-[#16a36a]"
                    >
                      View all →
                    </button>
                  </div>

                  <div className="mt-5 space-y-4">
                    {listings.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold">
                            {item.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.category} · {item.location}
                          </p>
                          <p className="mt-1 font-bold text-[#16a36a]">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <StatusBadge status={item.status} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#102b46] p-6 text-white">
                  <p className="text-sm font-medium text-gray-300">
                    Marketplace tip
                  </p>
                  <h2 className="mt-3 text-xl font-bold">
                    Better photos attract more buyers.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-gray-300">
                    Upload clear photos from different angles, provide honest
                    product descriptions and disclose any visible defects.
                  </p>
                  <Link
                    href="/sell"
                    className="mt-6 inline-flex rounded-xl bg-[#16a36a] px-4 py-3 text-sm font-bold text-white hover:bg-[#128555]"
                  >
                    List a product →
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* MY LISTINGS */}
          {activeTab === "My Listings" && (
            <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold">
                    Manage your listings
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    View and manage the products you've listed.
                  </p>
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#16a36a] sm:max-w-xs"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {["All", "Active", "Paused", "Sold"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      filter === item
                        ? "bg-[#102b46] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                {filteredListings.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-full rounded-xl object-cover sm:w-28"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold">{item.name}</h3>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.category} · {item.location}
                      </p>
                      <p className="mt-2 font-extrabold text-[#16a36a]">
                        {formatPrice(item.price)}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {item.views} views · {item.offers} offers
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      {item.status !== "Sold" && (
                        <button
                          onClick={() => toggleStatus(item.id)}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold hover:bg-gray-50"
                        >
                          {item.status === "Active" ? "Pause" : "Activate"}
                        </button>
                      )}
                      <button
                        onClick={() => deleteListing(item.id)}
                        className="rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {filteredListings.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="font-bold">No listings found</p>
                    <p className="mt-2 text-sm text-gray-500">
                      Try another search or filter.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* OTHER DASHBOARD SECTIONS */}
          {activeTab !== "Overview" &&
            activeTab !== "My Listings" && (
              <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="mx-auto max-w-lg py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef7f2] text-2xl font-bold text-[#16a36a]">
                    {activeTab === "Offers"
                      ? "O"
                      : activeTab === "Orders"
                      ? "D"
                      : activeTab === "Messages"
                      ? "M"
                      : "P"}
                  </div>
                  <h2 className="mt-5 text-xl font-bold">
                    {activeTab}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    This section is part of the TradeBridge seller workspace.
                    We'll build its full functionality in a later stage when
                    we connect the marketplace database.
                  </p>
                  <button
                    onClick={() => setActiveTab("Overview")}
                    className="mt-6 rounded-xl bg-[#102b46] px-5 py-3 text-sm font-bold text-white hover:bg-[#193d60]"
                  >
                    Back to Overview
                  </button>
                </div>
              </div>
            )}

          <p className="mt-10 text-center text-xs text-gray-400">
            © 2026 TradeBridge. All rights reserved.
          </p>
        </section>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: Listing["status"] }) {
  const styles = {
    Active: "bg-green-50 text-green-700",
    Paused: "bg-yellow-50 text-yellow-700",
    Sold: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

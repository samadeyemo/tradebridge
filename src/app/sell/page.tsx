
"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

type Listing = {
  id: number;
  name: string;
  category: string;
  price: number;
  location: string;
  description: string;
  status: "Active" | "Pending" | "Sold";
  views: number;
  offers: number;
  image: string;
  images: string[];
  sellerEmail: string;
  createdAt: string;
};

type Session = {
  fullName: string;
  email: string;
  phone?: string;
  loggedIn: boolean;
};

const STORAGE_KEY = "tradebridge_demo_listings";

const categories = [
  "Electronics",
  "Phones & Tablets",
  "Computers",
  "Furniture",
  "Fashion",
  "Automobiles",
  "Home & Kitchen",
  "Property",
  "Agriculture",
  "Other",
];

const formatPrice = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const maxSize = 1200;
        const scale = Math.min(
          1,
          maxSize / Math.max(image.width, image.height)
        );

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Could not process this image."));
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };

      image.onerror = () => reject(new Error("Invalid image file."));
      image.src = reader.result as string;
    };

    reader.onerror = () => reject(new Error("Could not read image."));
    reader.readAsDataURL(file);
  });
}

export default function SellerDashboard() {
  const [user, setUser] = useState<Session | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    location: "",
    description: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const savedSession =
      localStorage.getItem("tradebridge_demo_session") ||
      sessionStorage.getItem("tradebridge_demo_session");

    if (!savedSession) {
      window.location.href = "/login";
      return;
    }

    try {
      const parsed = JSON.parse(savedSession) as Session;

      if (!parsed.loggedIn || !parsed.email) {
        window.location.href = "/login";
        return;
      }

      setUser(parsed);

      const savedListings = localStorage.getItem(STORAGE_KEY);

      if (savedListings) {
        const allListings: Listing[] = JSON.parse(savedListings);

        setListings(
          allListings.filter(
            (listing) =>
              listing.sellerEmail?.toLowerCase() ===
              parsed.email.toLowerCase()
          )
        );
      }

      setLoading(false);
    } catch {
      window.location.href = "/login";
    }
  }, []);

  const activeListings = listings.filter(
    (item) => item.status === "Active"
  ).length;

  const soldListings = listings.filter(
    (item) => item.status === "Sold"
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

  function saveListings(updated: Listing[]) {
    if (!user) return;

    const existing: Listing[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    const otherSellers = existing.filter(
      (item) =>
        item.sellerEmail?.toLowerCase() !==
        user.email.toLowerCase()
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...otherSellers, ...updated])
    );

    setListings(updated);
  }

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (!files.length) return;

    if (images.length + files.length > 5) {
      setFormError("You can upload a maximum of 5 product images.");
      return;
    }

    const invalidFile = files.find(
      (file) =>
        !file.type.startsWith("image/") ||
        file.size > 8 * 1024 * 1024
    );

    if (invalidFile) {
      setFormError(
        "Please upload valid images smaller than 8MB each."
      );
      return;
    }

    setFormError("");
    setImageLoading(true);

    try {
      const compressed = await Promise.all(
        files.map((file) => compressImage(file))
      );

      setImages((current) => [...current, ...compressed]);
    } catch {
      setFormError("One or more images could not be uploaded.");
    } finally {
      setImageLoading(false);
    }
  }

  function removeImage(index: number) {
    setImages((current) =>
      current.filter((_, imageIndex) => imageIndex !== index)
    );
  }

  function handleCreateListing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setNotice("");

    if (!user) return;

    if (
      !form.name.trim() ||
      !form.category ||
      !form.price ||
      !form.location.trim() ||
      !form.description.trim()
    ) {
      setFormError("Please complete all product information.");
      return;
    }

    const price = Number(form.price);

    if (!Number.isFinite(price) || price <= 0) {
      setFormError("Enter a valid product price.");
      return;
    }

    if (images.length < 3) {
      setFormError("Please upload at least 3 product images.");
      return;
    }

    const newListing: Listing = {
      id: Date.now(),
      name: form.name.trim(),
      category: form.category,
      price,
      location: form.location.trim(),
      description: form.description.trim(),
      status: "Active",
      views: 0,
      offers: 0,
      image: images[0],
      images,
      sellerEmail: user.email,
      createdAt: new Date().toISOString(),
    };

    try {
      saveListings([newListing, ...listings]);

      setForm({
        name: "",
        category: "",
        price: "",
        location: "",
        description: "",
      });

      setImages([]);
      setActiveTab("My Listings");
      setFilter("All");
      setSearch("");
      setNotice("Your product listing has been published successfully.");
    } catch {
      setFormError(
        "Could not save this listing. Try using smaller images."
      );
    }
  }

  function updateStatus(id: number, status: Listing["status"]) {
    const updated = listings.map((item) =>
      item.id === id ? { ...item, status } : item
    );

    saveListings(updated);
  }

  function deleteListing(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this listing?"
    );

    if (!confirmed) return;

    saveListings(listings.filter((item) => item.id !== id));
    setNotice("Listing deleted successfully.");
  }

  function logout() {
    localStorage.removeItem("tradebridge_demo_session");
    sessionStorage.removeItem("tradebridge_demo_session");
    window.location.href = "/login";
  }

  const navigation = [
    "Overview",
    "My Listings",
    "Create Listing",
  ];

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm text-gray-500">
        Loading seller workspace...
      </div>
    );
  }

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
            <p className="mt-2 font-bold">
              {user.fullName || "Welcome back!"}
            </p>
            <p className="mt-1 break-all text-xs text-gray-500">
              {user.email}
            </p>
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Seller menu
          </p>

          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {navigation.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  setNotice("");
                }}
                className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeTab === item
                    ? "bg-[#102b46] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item === "Create Listing" ? "+ Create Listing" : item}
              </button>
            ))}
          </nav>

          <div className="mt-8 hidden rounded-2xl border border-[#d8eee3] bg-[#f0faf5] p-4 lg:block">
            <p className="font-bold text-[#126b48]">
              Grow your business
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Clear pictures and honest descriptions help buyers make
              confident decisions.
            </p>
            <button
              onClick={() => setActiveTab("Create Listing")}
              className="mt-4 text-sm font-bold text-[#138657]"
            >
              Add a product →
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 lg:flex-col">
            <Link
              href="/marketplace"
              className="text-sm font-semibold text-gray-500 hover:text-[#16a36a]"
            >
              ← Back to marketplace
            </Link>
            <Link
              href="/my-listings"
              className="text-sm font-semibold text-gray-500 hover:text-[#16a36a]"
            >
              Open My Listings →
            </Link>
            <button
              onClick={logout}
              className="text-left text-sm font-semibold text-red-500 hover:text-red-700"
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Seller workspace
              </p>
              <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                {activeTab}
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Manage your products and marketplace activities.
              </p>
            </div>

            <button
              onClick={() => {
                setActiveTab("Create Listing");
                setNotice("");
              }}
              className="inline-flex items-center justify-center rounded-xl bg-[#16a36a] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#128555]"
            >
              + Create Listing
            </button>
          </div>

          {notice && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800">
              {notice}
            </div>
          )}

          {/* OVERVIEW */}
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
                    detail: "Currently available",
                  },
                  {
                    label: "Products Sold",
                    value: soldListings,
                    detail: "Completed sales",
                  },
                  {
                    label: "Total Views",
                    value: totalViews.toLocaleString(),
                    detail: `${totalOffers} offers received`,
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
                        Your latest products.
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
                    {listings.slice(0, 4).map((item) => (
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

                    {listings.length === 0 && (
                      <div className="py-10 text-center">
                        <p className="font-bold">No products yet</p>
                        <p className="mt-2 text-sm text-gray-500">
                          Your published products will appear here.
                        </p>
                        <button
                          onClick={() => setActiveTab("Create Listing")}
                          className="mt-5 rounded-xl bg-[#16a36a] px-5 py-3 text-sm font-bold text-white"
                        >
                          Create your first listing
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#102b46] p-6 text-white">
                  <p className="text-sm font-medium text-gray-300">
                    Marketplace tip
                  </p>
                  <h2 className="mt-3 text-xl font-bold">
                    Great photos build buyer confidence.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-gray-300">
                    Upload at least three clear pictures from different
                    angles. Provide accurate descriptions and disclose
                    product defects.
                  </p>
                  <button
                    onClick={() => setActiveTab("Create Listing")}
                    className="mt-6 rounded-xl bg-[#16a36a] px-4 py-3 text-sm font-bold text-white hover:bg-[#128555]"
                  >
                    List a product →
                  </button>
                </div>
              </div>
            </>
          )}

          {/* CREATE LISTING */}
          {activeTab === "Create Listing" && (
            <form
              onSubmit={handleCreateListing}
              className="mt-8 grid gap-6 xl:grid-cols-3"
            >
              <div className="space-y-6 xl:col-span-2">
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                  <h2 className="text-lg font-bold">
                    Product information
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Provide accurate details about the item you want to sell.
                  </p>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Product name *
                      </label>
                      <input
                        required
                        maxLength={100}
                        value={form.name}
                        onChange={(event) =>
                          setForm({ ...form, name: event.target.value })
                        }
                        placeholder="e.g. Apple iPhone 13 Pro"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#16a36a]"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Category *
                        </label>
                        <select
                          required
                          value={form.category}
                          onChange={(event) =>
                            setForm({
                              ...form,
                              category: event.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#16a36a]"
                        >
                          <option value="">Select category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Price (₦) *
                        </label>
                        <input
                          required
                          type="number"
                          min="1"
                          value={form.price}
                          onChange={(event) =>
                            setForm({ ...form, price: event.target.value })
                          }
                          placeholder="Enter price"
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#16a36a]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Location *
                      </label>
                      <input
                        required
                        value={form.location}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            location: event.target.value,
                          })
                        }
                        placeholder="e.g. Port Harcourt, Rivers State"
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#16a36a]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Product description *
                      </label>
                      <textarea
                        required
                        minLength={20}
                        maxLength={2000}
                        rows={6}
                        value={form.description}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            description: event.target.value,
                          })
                        }
                        placeholder="Describe the product, its condition, features and any important details..."
                        className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#16a36a]"
                      />
                      <p className="mt-1 text-right text-xs text-gray-400">
                        {form.description.length}/2000 characters
                      </p>
                    </div>
                  </div>
                </div>

                {/* IMAGE UPLOAD */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                  <h2 className="text-lg font-bold">Product images</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload 3–5 genuine pictures of your product.
                  </p>

                  <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center transition hover:border-[#16a36a] hover:bg-green-50">
                    <span className="text-3xl">📷</span>
                    <span className="mt-3 font-bold text-gray-800">
                      {imageLoading ? "Processing images..." : "Upload product images"}
                    </span>
                    <span className="mt-1 text-xs text-gray-500">
                      JPG, PNG or WebP · Maximum 8MB each
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={imageLoading || images.length >= 5}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      Uploaded images
                    </p>
                    <span className="text-xs text-gray-500">
                      {images.length}/5 · Minimum 3
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {images.map((image, index) => (
                      <div
                        key={`${index}-${image.slice(0, 20)}`}
                        className="relative aspect-square overflow-hidden rounded-xl border border-gray-200"
                      >
                        <img
                          src={image}
                          alt={`Product image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        {index === 0 && (
                          <span className="absolute bottom-2 left-2 rounded-lg bg-[#102b46] px-2 py-1 text-[10px] font-bold text-white">
                            Main image
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-red-600 shadow"
                          aria-label="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PUBLISH PANEL */}
              <div className="space-y-5">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold">Publish listing</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Review your product details before publishing.
                  </p>

                  <div className="mt-5 rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-semibold text-gray-500">
                      PRODUCT
                    </p>
                    <p className="mt-2 break-words font-bold">
                      {form.name || "Your product name"}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      {form.category || "Product category"}
                    </p>
                    <p className="mt-3 text-xl font-extrabold text-[#16a36a]">
                      {form.price && Number(form.price) > 0
                        ? formatPrice(Number(form.price))
                        : "₦0"}
                    </p>
                  </div>

                  {formError && (
                    <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={imageLoading}
                    className="mt-5 w-full rounded-xl bg-[#16a36a] px-5 py-3.5 font-bold text-white transition hover:bg-[#128555] disabled:opacity-50"
                  >
                    Publish Listing →
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setForm({
                        name: "",
                        category: "",
                        price: "",
                        location: "",
                        description: "",
                      });
                      setImages([]);
                      setFormError("");
                    }}
                    className="mt-3 w-full rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Clear form
                  </button>
                </div>

                <div className="rounded-2xl border border-[#d8eee3] bg-[#f0faf5] p-5">
                  <h3 className="font-bold text-[#126b48]">
                    Listing guidelines
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
                    <li>✓ Use genuine product pictures.</li>
                    <li>✓ Describe the actual condition.</li>
                    <li>✓ Set a realistic price.</li>
                    <li>✓ Include accurate location details.</li>
                    <li>✓ Do not list prohibited items.</li>
                  </ul>
                </div>
              </div>
            </form>
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
                    Manage your published products.
                  </p>
                </div>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#16a36a] sm:max-w-xs"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {["All", "Active", "Pending", "Sold"].map((item) => (
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

                    <div className="flex flex-wrap gap-2">
                      {item.status !== "Sold" && (
                        <button
                          onClick={() =>
                            updateStatus(item.id, "Sold")
                          }
                          className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold hover:bg-gray-50"
                        >
                          Mark Sold
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
                      Create a product listing to get started.
                    </p>
                    <button
                      onClick={() => setActiveTab("Create Listing")}
                      className="mt-5 rounded-xl bg-[#16a36a] px-5 py-3 text-sm font-bold text-white"
                    >
                      Create Listing
                    </button>
                  </div>
                )}
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
    Pending: "bg-yellow-50 text-yellow-700",
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

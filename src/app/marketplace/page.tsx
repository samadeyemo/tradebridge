
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  id: string | number;
  name: string;
  category: string;
  price: number;
  location: string;
  type: string;
  condition: string;
  images: string[];
  createdAt?: string;
};

type SavedListing = {
  id: string | number;
  name: string;
  category: string;
  price: number;
  location: string;
  description?: string;
  status: string;
  image?: string;
  images?: string[];
  createdAt?: string;
};

const demoProducts: Product[] = [
  {
    id: 1,
    name: "Toyota Corolla 2015",
    category: "Automobiles",
    price: 12500000,
    location: "Lagos",
    type: "Cash or Trade",
    condition: "Used",
    images: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    category: "Electronics",
    price: 1250000,
    location: "Abuja",
    type: "Cash or Trade",
    condition: "Foreign Used",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 3,
    name: "Modern Living Room Sofa",
    category: "Furniture",
    price: 850000,
    location: "Ibadan",
    type: "Cash Only",
    condition: "New",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1550581190-9f4c7e7c3e6c?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 4,
    name: "Premium Rice - 50kg",
    category: "Agriculture",
    price: 85000,
    location: "Kano",
    type: "Cash or Trade",
    condition: "New",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 5,
    name: "HP EliteBook Laptop",
    category: "Electronics",
    price: 650000,
    location: "Lagos",
    type: "Cash or Trade",
    condition: "Used",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 6,
    name: "Cement - 50 Bags",
    category: "Building Materials",
    price: 475000,
    location: "Port Harcourt",
    type: "Cash Only",
    condition: "New",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1513467655676-561b7d489a88?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 7,
    name: "Honda CR-V 2018",
    category: "Automobiles",
    price: 18500000,
    location: "Abuja",
    type: "Cash or Trade",
    condition: "Foreign Used",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 8,
    name: "Executive Office Desk",
    category: "Furniture",
    price: 320000,
    location: "Lagos",
    type: "Cash or Trade",
    condition: "New",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85",
    ],
  },
];

const categories = [
  "All Categories",
  "Automobiles",
  "Electronics",
  "Furniture",
  "Agriculture",
  "Building Materials",
];

const formatPrice = (price: number) =>
  `₦${price.toLocaleString("en-NG")}`;

function getSavedProducts(): Product[] {
  try {
    const saved = localStorage.getItem("tradebridge_demo_listings");

    if (!saved) return [];

    const listings: SavedListing[] = JSON.parse(saved);

    if (!Array.isArray(listings)) return [];

    return listings
      .filter(
        (listing) =>
          listing &&
          listing.status === "Active" &&
          listing.name &&
          Number.isFinite(Number(listing.price))
      )
      .map((listing) => {
        const images = Array.isArray(listing.images)
          ? listing.images.filter(
              (image): image is string => typeof image === "string"
            )
          : [];

        if (images.length === 0 && listing.image) {
          images.push(listing.image);
        }

        return {
          id: `seller-${listing.id}`,
          name: listing.name,
          category: listing.category || "Other",
          price: Number(listing.price),
          location: listing.location || "Location not specified",
          type: "Not specified",
          condition: "Seller listing",
          images,
          createdAt: listing.createdAt,
        };
      });
  } catch (error) {
    console.error("Unable to load marketplace listings:", error);
    return [];
  }
}

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All Locations");
  const [tradeType, setTradeType] = useState("All Types");
  const [sort, setSort] = useState("newest");
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadListings = () => {
      setSellerProducts(getSavedProducts());
    };

    loadListings();

    window.addEventListener("storage", loadListings);
    window.addEventListener("focus", loadListings);

    return () => {
      window.removeEventListener("storage", loadListings);
      window.removeEventListener("focus", loadListings);
    };
  }, []);

  const products = useMemo(
    () => [...sellerProducts, ...demoProducts],
    [sellerProducts]
  );

  const locations = useMemo(
    () => [
      "All Locations",
      ...Array.from(
        new Set(products.map((product) => product.location).filter(Boolean))
      ).sort(),
    ],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const searchTerm = search.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.location.toLowerCase().includes(searchTerm);

      const matchesCategory =
        category === "All Categories" ||
        product.category === category;

      const matchesLocation =
        location === "All Locations" ||
        product.location === location;

      const matchesTrade =
        tradeType === "All Types" ||
        (tradeType === "Barter Available" &&
          product.type === "Cash or Trade") ||
        (tradeType === "Cash Only" &&
          product.type === "Cash Only");

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesTrade
      );
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
      result = [...result].sort((a, b) => {
        const dateA = a.createdAt
          ? new Date(a.createdAt).getTime()
          : 0;
        const dateB = b.createdAt
          ? new Date(b.createdAt).getTime()
          : 0;

        return dateB - dateA;
      });
    }

    return result;
  }, [products, search, category, location, tradeType, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setLocation("All Locations");
    setTradeType("All Types");
    setSort("newest");
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#102b46]">
      {/* HEADER */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Trade<span className="text-[#20b486]">Bridge</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <Link href="/" className="hover:text-[#20b486]">
              Home
            </Link>

            <Link href="/marketplace" className="text-[#20b486]">
              Marketplace
            </Link>

            <Link href="/about" className="hover:text-[#20b486]">
              About
            </Link>
          </nav>

          <Link
            href="/sell"
            className="rounded-full bg-[#102b46] px-5 py-3 text-sm font-bold text-white hover:bg-[#20b486]"
          >
            Sell a Product
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#102b46] px-5 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#20b486]">
            Discover opportunities
          </p>

          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-5xl">
            Find what you need.
            <br />
            Trade what you have.
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-blue-100">
            Explore products from people and businesses across Nigeria.
            Buy with cash, exchange products or negotiate a combination
            of both.
          </p>

          <div className="mt-9 flex max-w-3xl flex-col gap-3 rounded-2xl bg-white p-3 sm:flex-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What are you looking for?"
              aria-label="Search products"
              className="min-w-0 flex-1 rounded-xl px-4 py-4 text-sm text-gray-900 outline-none"
            />

            <button
              onClick={resetFilters}
              className="rounded-xl bg-[#20b486] px-8 py-4 font-bold text-white hover:bg-[#15966e]"
            >
              Reset filters
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-black">Explore categories</h2>
          <p className="mt-2 text-sm text-gray-500">
            Browse the marketplace by product category.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                category === item
                  ? "border-[#102b46] bg-[#102b46] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#20b486]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* LISTINGS */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-black">Available listings</h2>
            <p className="mt-2 text-sm text-gray-500">
              Discover products available for purchase and exchange.
            </p>
          </div>

          <p className="text-sm font-semibold text-gray-600">
            {filteredProducts.length} listings found
          </p>
        </div>

        {/* FILTERS */}
        <div className="mb-8 grid gap-3 rounded-2xl border border-gray-200 bg-white p-5 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-500">
              LOCATION
            </label>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:border-[#20b486]"
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-gray-500">
              TRANSACTION TYPE
            </label>

            <select
              value={tradeType}
              onChange={(e) => setTradeType(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:border-[#20b486]"
            >
              <option>All Types</option>
              <option>Barter Available</option>
              <option>Cash Only</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-gray-500">
              SORT BY
            </label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:border-[#20b486]"
            >
              <option value="newest">Newest listings</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
            </select>
          </div>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link
                href={`/marketplace/${product.id}`}
                key={product.id}
                className="block overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#20b486]"
              >
                <div className="relative h-52 overflow-hidden bg-[#edf3f7]">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No product image
                    </div>
                  )}

                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#102b46]">
                    {product.condition}
                  </span>

                  <span className="absolute bottom-3 right-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white">
                    {product.images.length} photos
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#20b486]">
                    {product.category}
                  </p>

                  <h3 className="mt-2 min-h-12 font-bold text-[#102b46]">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-xl font-black">
                    {formatPrice(product.price)}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-4">
                    <span className="text-xs text-gray-500">
                      {product.location}
                    </span>

                    <span className="rounded-full bg-[#e8f8f1] px-2 py-1 text-[10px] font-bold text-[#15966e]">
                      {product.type}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf3f7] text-2xl font-semibold text-[#102b46]"
              aria-hidden="true"
            >
              ?
            </div>

            <h3 className="mt-4 text-xl font-bold">
              No matching listings found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or adjust your filters.
            </p>

            <button
              onClick={resetFilters}
              className="mt-5 rounded-full bg-[#102b46] px-6 py-3 text-sm font-bold text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-[#102b46] px-5 py-8 text-center text-sm text-blue-100">
        © 2026 TradeBridge. All rights reserved.
      </footer>
    </main>
  );
}


"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Toyota Corolla 2015",
    category: "Automobiles",
    price: 12500000,
    location: "Lagos",
    type: "Cash or Trade",
    condition: "Used",
    images: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A well-maintained Toyota Corolla 2015 suitable for everyday driving. A practical vehicle with comfortable seating and reliable performance.",
    features: [
      "Automatic transmission",
      "Air conditioning",
      "Petrol engine",
      "Clean interior",
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
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A premium smartphone listing with a modern design and advanced mobile features. Contact the seller to confirm storage, condition and accessories.",
    features: [
      "Large display",
      "Advanced camera",
      "Android smartphone",
      "Portable design",
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
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1550581190-9f4c7e7c3e6c?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A modern sofa designed for a comfortable living room. Its contemporary style makes it suitable for homes and offices.",
    features: [
      "Modern design",
      "Comfortable seating",
      "Living room furniture",
      "New condition",
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
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A 50kg bag of rice listed for sale or exchange. Buyers should confirm the brand, packaging and available quantity with the seller.",
    features: [
      "50kg package",
      "Agricultural product",
      "New stock",
      "Bulk purchase enquiries",
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
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A business-class laptop listing suitable for office work, productivity and everyday computing. Confirm the exact specifications with the seller.",
    features: [
      "Business laptop",
      "Portable design",
      "Keyboard and touchpad",
      "Suitable for office work",
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
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1513467655676-561b7d489a88?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A building materials listing for 50 bags of cement. Contact the seller to confirm the cement brand, availability and delivery arrangements.",
    features: [
      "50 bags",
      "Building material",
      "New stock",
      "Bulk order",
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
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A Honda CR-V 2018 vehicle listing available for purchase or trade negotiation. Buyers should arrange an inspection and verify vehicle documents.",
    features: [
      "SUV body type",
      "2018 model",
      "Spacious interior",
      "Vehicle inspection recommended",
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
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "An executive office furniture listing suitable for a professional workspace, home office or business environment.",
    features: [
      "Office furniture",
      "Modern workspace style",
      "Professional design",
      "New condition",
    ],
  },
];

const formatPrice = (price: number) =>
  `₦${price.toLocaleString("en-NG")}`;

function ProductDetailsContent() {
  const params = useParams<{ id: string }>();
  const productId = Number(params.id);

  const product = products.find((item) => item.id === productId);

  const [activeImage, setActiveImage] = useState(0);
  const [showOffer, setShowOffer] = useState(false);
  const [offerMessage, setOfferMessage] = useState("");
  const [cashAmount, setCashAmount] = useState("");

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f9fc] px-5">
        <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-black text-[#102b46]">
            Product not found
          </h1>

          <p className="mt-3 text-gray-500">
            This listing does not exist or may have been removed.
          </p>

          <Link
            href="/marketplace"
            className="mt-6 inline-block rounded-full bg-[#102b46] px-6 py-3 font-bold text-white"
          >
            Return to Marketplace
          </Link>
        </div>
      </main>
    );
  }

  const submitOffer = () => {
    if (!offerMessage.trim()) {
      window.alert("Please describe what you want to offer.");
      return;
    }

    window.alert(
      "This is a demo. Offer submission will be connected when the backend is ready."
    );

    setShowOffer(false);
    setOfferMessage("");
    setCashAmount("");
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
            href="/marketplace"
            className="rounded-full bg-[#102b46] px-5 py-3 text-sm font-bold text-white hover:bg-[#20b486]"
          >
            Browse Products
          </Link>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="mx-auto max-w-7xl px-5 py-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#20b486]">
          Home
        </Link>

        <span className="mx-2">/</span>

        <Link href="/marketplace" className="hover:text-[#20b486]">
          Marketplace
        </Link>

        <span className="mx-2">/</span>

        <span className="font-semibold text-[#102b46]">
          {product.name}
        </span>
      </div>

      {/* PRODUCT DETAILS */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 lg:grid-cols-2">
        {/* PRODUCT IMAGE GALLERY */}
        <div>
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <img
              src={product.images[activeImage]}
              alt={`${product.name} - photo ${activeImage + 1}`}
              className="h-[350px] w-full object-cover sm:h-[500px]"
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`View product photo ${index + 1}`}
                aria-pressed={activeImage === index}
                className={`relative overflow-hidden rounded-xl border-2 transition ${
                  activeImage === index
                    ? "border-[#20b486] ring-2 ring-[#20b486]/20"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="h-24 w-full object-cover sm:h-32"
                />

                <span className="absolute bottom-2 right-2 rounded-full bg-black/65 px-2 py-1 text-xs font-bold text-white">
                  {index + 1}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Select a photo to view it. These are demonstration gallery images.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#e8f8f1] px-4 py-2 text-sm font-bold text-[#15966e]">
              {product.condition}
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#102b46]">
              {product.category}
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#102b46]">
              {product.type}
            </span>
          </div>
        </div>

        {/* PRODUCT INFORMATION */}
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#20b486]">
            {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            Location: {product.location}, Nigeria
          </p>

          <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm font-semibold text-gray-500">
              Listing price
            </p>

            <p className="mt-2 text-3xl font-black text-[#102b46]">
              {formatPrice(product.price)}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Contact the seller to confirm availability and final terms.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() =>
                  window.alert(
                    "Checkout will be connected when payment services are integrated."
                  )
                }
                className="rounded-xl bg-[#20b486] px-5 py-4 font-bold text-white transition hover:bg-[#15966e]"
              >
                Buy with Cash
              </button>

              <button
                onClick={() => setShowOffer(true)}
                className="rounded-xl border-2 border-[#102b46] px-5 py-4 font-bold text-[#102b46] transition hover:bg-[#102b46] hover:text-white"
              >
                Make an Offer
              </button>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-8">
            <h2 className="text-xl font-black">About this product</h2>

            <p className="mt-4 leading-8 text-gray-600">
              {product.description}
            </p>
          </div>

          {/* FEATURES */}
          <div className="mt-8">
            <h2 className="text-xl font-black">Product information</h2>

            <ul className="mt-4 space-y-3">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <span className="h-2 w-2 rounded-full bg-[#20b486]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* CONDITION REMINDER */}
          <div className="mt-8 rounded-2xl border border-[#d8eee5] bg-[#f0faf5] p-5">
            <h2 className="font-black text-[#102b46]">
              Before you buy or barter
            </h2>

            <p className="mt-2 text-sm leading-7 text-gray-600">
              Review all available product photos, ask the seller about
              defects or repairs, and arrange an inspection where appropriate.
              Do not rely on photos alone to verify product condition.
            </p>
          </div>

          {/* SELLER INFORMATION */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-black">Seller information</h2>

            <p className="mt-3 font-bold">TradeBridge Demo Seller</p>

            <p className="mt-2 text-sm text-gray-500">
              {product.location}, Nigeria
            </p>

            <p className="mt-4 text-xs leading-6 text-gray-500">
              Seller identity, ratings and verification details will appear
              here when real seller accounts are connected.
            </p>
          </div>
        </div>
      </section>

      {/* OFFER MODAL */}
      {showOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5 py-8">
          <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">
                Make an Offer
              </h2>

              <button
                onClick={() => setShowOffer(false)}
                className="text-2xl font-bold text-gray-500 hover:text-red-500"
                aria-label="Close offer window"
              >
                ×
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Tell the seller what you would like to exchange for{" "}
              <strong>{product.name}</strong>.
            </p>

            <label className="mt-6 block text-sm font-bold">
              Describe your offer
            </label>

            <textarea
              value={offerMessage}
              onChange={(e) => setOfferMessage(e.target.value)}
              placeholder="Describe the product you want to exchange..."
              rows={5}
              className="mt-2 w-full rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-[#20b486]"
            />

            <label className="mt-5 block text-sm font-bold">
              Additional cash offer (₦) — optional
            </label>

            <input
              type="number"
              min="0"
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
              placeholder="Enter additional cash amount"
              className="mt-2 w-full rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-[#20b486]"
            />

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={submitOffer}
                className="flex-1 rounded-xl bg-[#20b486] px-5 py-4 font-bold text-white hover:bg-[#15966e]"
              >
                Submit Offer
              </button>

              <button
                onClick={() => setShowOffer(false)}
                className="rounded-xl border border-gray-200 px-5 py-4 font-bold text-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#102b46] px-5 py-8 text-center text-sm text-blue-100">
        © 2026 TradeBridge. All rights reserved.
      </footer>
    </main>
  );
}

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
          <p className="font-semibold text-[#102b46]">
            Loading product...
          </p>
        </main>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}

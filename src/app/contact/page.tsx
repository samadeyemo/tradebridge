
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const recipient = "support@tradebridge.com";

    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;

    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#102b46]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Trade<span className="text-[#20b486]">Bridge</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <Link href="/" className="hover:text-[#20b486]">Home</Link>
            <Link href="/marketplace" className="hover:text-[#20b486]">Marketplace</Link>
            <Link href="/about" className="hover:text-[#20b486]">About</Link>
            <Link href="/contact" className="text-[#20b486]">Contact</Link>
          </nav>

          <Link
            href="/sell"
            className="rounded-full bg-[#102b46] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#20b486]"
          >
            Start Selling
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#102b46] px-5 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#20b486]">
            Get in touch
          </p>

          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            We're here to help you move forward.
          </h1>

          <p className="mt-6 max-w-2xl leading-8 text-blue-100">
            Have a question, need assistance or want to share feedback?
            Send us a message. We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        {/* CONTACT DETAILS */}
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#20b486]">
            Contact information
          </p>

          <h2 className="mt-4 text-3xl font-black">
            Let's talk.
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Whether you're buying, selling, exploring product exchanges
            or experiencing a problem, we're interested in hearing from you.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8f8f1] text-xl text-[#15966e]">
                ✉
              </div>
              <div>
                <h3 className="font-bold">Email support</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Replace with your official support email.
                </p>
                <p className="mt-2 text-sm font-semibold text-[#15966e]">
                  support@tradebridge.com
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8f8f1] text-xl text-[#15966e]">
                ◷
              </div>
              <div>
                <h3 className="font-bold">Support hours</h3>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Support availability will be announced as our
                  customer support operations are established.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8f8f1] text-xl text-[#15966e]">
                ⌖
              </div>
              <div>
                <h3 className="font-bold">Our reach</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Connecting buyers and sellers across Nigeria.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-[#102b46] p-7 text-white">
            <h3 className="text-xl font-black">
              Need to find something?
            </h3>

            <p className="mt-3 text-sm leading-6 text-blue-100">
              Browse available products and discover opportunities
              on TradeBridge.
            </p>

            <Link
              href="/marketplace"
              className="mt-6 inline-block rounded-full bg-[#20b486] px-6 py-3 text-sm font-bold text-white hover:bg-[#15966e]"
            >
              Explore Marketplace
            </Link>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm md:p-10">
          <h2 className="text-2xl font-black">
            Send us a message
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Complete the form below to contact our team.
          </p>

          {submitted && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
            >
              Your email application has been opened. Please send
              the message from your email application to complete
              your enquiry.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold">
                Full name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-200 px-4 py-4 text-sm outline-none transition focus:border-[#20b486]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                Email address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-4 text-sm outline-none transition focus:border-[#20b486]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                Subject
              </label>
              <select
                required
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm outline-none focus:border-[#20b486]"
              >
                <option value="">Select a subject</option>
                <option value="General enquiry">General enquiry</option>
                <option value="Buying a product">Buying a product</option>
                <option value="Selling a product">Selling a product</option>
                <option value="Product exchange">Product exchange</option>
                <option value="Account assistance">Account assistance</option>
                <option value="Report a problem">Report a problem</option>
                <option value="Partnership enquiry">Partnership enquiry</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                Your message
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                placeholder="Tell us how we can help..."
                className="w-full resize-y rounded-xl border border-gray-200 px-4 py-4 text-sm outline-none transition focus:border-[#20b486]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#102b46] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#20b486]"
            >
              Open Email to Send Message
            </button>

            <p className="text-xs leading-5 text-gray-400">
              This demo form opens your default email application.
              It does not yet send or store messages directly on TradeBridge.
            </p>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-5 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#20b486]">
              Frequently asked questions
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Need a quick answer?
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              {
                question: "How do I sell on TradeBridge?",
                answer:
                  "Create an account, visit the Sell page, provide your product details and upload product images.",
              },
              {
                question: "Can I exchange products instead of paying cash?",
                answer:
                  "TradeBridge is designed to support buying, selling and product exchange opportunities. Confirm exchange terms directly with the other party.",
              },
              {
                question: "How do I report a suspicious listing?",
                answer:
                  "Contact the TradeBridge support team with the listing details. A dedicated reporting workflow will be added to the platform.",
              },
              {
                question: "How do I get help with my account?",
                answer:
                  "Send us a message using the contact form and select Account assistance as your subject.",
              },
            ].map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-gray-200 bg-[#f7f9fc] p-6"
              >
                <summary className="cursor-pointer list-none font-bold marker:hidden">
                  <div className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-xl text-[#20b486] transition group-open:rotate-45">
                      +
                    </span>
                  </div>
                </summary>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b2036] px-5 py-10 text-blue-100">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Link href="/" className="text-2xl font-black text-white">
              Trade<span className="text-[#20b486]">Bridge</span>
            </Link>
            <p className="mt-2 text-sm text-blue-200">
              Connecting people. Creating opportunities.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/" className="hover:text-[#20b486]">Home</Link>
            <Link href="/marketplace" className="hover:text-[#20b486]">Marketplace</Link>
            <Link href="/about" className="hover:text-[#20b486]">About</Link>
            <Link href="/contact" className="hover:text-[#20b486]">Contact</Link>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-blue-300">
          © 2026 TradeBridge. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

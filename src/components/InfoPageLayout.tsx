
import Link from "next/link";
import type { ReactNode } from "react";

type InfoPageLayoutProps = {
  title: string;
  description: string;
  updated?: string;
  children: ReactNode;
};

const links = [
  { label: "Help Center", href: "/help-center" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Buyer & Seller Policy", href: "/buyer-seller-policy" },
];

export default function InfoPageLayout({
  title,
  description,
  updated = "20 November 2026",
  children,
}: InfoPageLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-[#102b46]"
          >
            Trade<span className="text-[#20b486]">Bridge</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <Link href="/" className="hover:text-[#20b486]">
              Home
            </Link>
            <Link href="/marketplace" className="hover:text-[#20b486]">
              Marketplace
            </Link>
            <Link href="/about" className="hover:text-[#20b486]">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#20b486]">
              Contact
            </Link>
          </nav>

          <Link
            href="/marketplace"
            className="rounded-lg bg-[#20b486] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#159b70]"
          >
            Explore Marketplace
          </Link>
        </div>
      </header>

      {/* Page heading */}
      <section className="bg-[#102b46] px-5 py-16 text-white md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#72e0bd]">
            TradeBridge Support & Information
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 md:text-lg">
            {description}
          </p>

          <p className="mt-5 text-xs text-slate-300">
            Last updated: {updated}
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[250px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
            Support & Policies
          </h2>

          <nav className="space-y-1">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#102b46]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <p className="font-bold text-[#102b46]">
              Need more help?
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Contact our support team if you cannot find the answer you need.
            </p>

            <Link
              href="/contact"
              className="mt-3 inline-flex text-sm font-bold text-emerald-700 hover:underline"
            >
              Contact TradeBridge →
            </Link>
          </div>
        </aside>

        {/* Page content */}
        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:text-[#102b46] prose-a:text-emerald-700">
            {children}
          </div>
        </article>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/"
              className="text-xl font-extrabold text-[#102b46]"
            >
              Trade<span className="text-[#20b486]">Bridge</span>
            </Link>

            <p className="mt-1 text-sm text-slate-500">
              Connecting buyers and sellers with confidence.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-emerald-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-7xl text-xs text-slate-400">
          © 2026 TradeBridge. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

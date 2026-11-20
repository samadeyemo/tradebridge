
import Link from "next/link";

const benefits = [
  {
    number: "01",
    title: "Buy with confidence",
    description:
      "Discover products and opportunities from individuals and businesses across Nigeria.",
  },
  {
    number: "02",
    title: "Sell with visibility",
    description:
      "Give your products a wider audience and connect with potential customers.",
  },
  {
    number: "03",
    title: "Trade beyond cash",
    description:
      "Explore opportunities to exchange products and negotiate deals that work for both parties.",
  },
];

const steps = [
  {
    number: "01",
    title: "Explore",
    description:
      "Browse available products across different categories and locations.",
  },
  {
    number: "02",
    title: "Connect",
    description:
      "Find products that interest you and connect with the people offering them.",
  },
  {
    number: "03",
    title: "Negotiate",
    description:
      "Discuss the price, exchange terms and other details directly with the other party.",
  },
  {
    number: "04",
    title: "Complete your deal",
    description:
      "Agree on the final terms and arrange a safe way to complete your transaction.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#102b46]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Trade<span className="text-[#20b486]">Bridge</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <Link href="/" className="hover:text-[#20b486]">
              Home
            </Link>

            <Link
              href="/marketplace"
              className="hover:text-[#20b486]"
            >
              Marketplace
            </Link>

            <Link href="/about" className="text-[#20b486]">
              About
            </Link>
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
      <section className="relative overflow-hidden bg-[#102b46] px-5 py-24 text-white md:py-32">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#20b486]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#20b486]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#20b486]">
            About TradeBridge
          </p>

          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Connecting people.
            <br />
            Creating opportunities.
            <br />
            <span className="text-[#20b486]">
              Making trade easier.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
            TradeBridge is a marketplace designed to help individuals
            and businesses discover products, connect with one another,
            and explore opportunities to buy, sell and exchange value.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/marketplace"
              className="rounded-full bg-[#20b486] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#15966e]"
            >
              Explore Marketplace
            </Link>

            <Link
              href="/sell"
              className="rounded-full border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-[#102b46]"
            >
              List Your Product
            </Link>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#20b486]">
            Who we are
          </p>

          <h2 className="text-3xl font-black leading-tight md:text-4xl">
            A better way to discover and exchange value.
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Finding the right buyer, seller or trading opportunity
            should not be unnecessarily difficult. TradeBridge aims
            to make these connections easier through one accessible
            marketplace.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Whether you are an individual looking to sell an item,
            a business seeking new customers, or someone interested
            in exchanging products, TradeBridge brings opportunities
            together in one place.
          </p>
        </div>

        <div className="relative">
          <div className="rounded-3xl bg-[#e8f8f1] p-8 md:p-12">
            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wider text-[#20b486]">
                Our approach
              </p>

              <h3 className="mt-4 text-3xl font-black">
                More ways to trade.
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Buy what you need, sell what you have, or explore
                exchanges that create value for everyone involved.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#f7f9fc] p-4">
                  <p className="text-2xl font-black text-[#20b486]">
                    Buy
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Discover products
                  </p>
                </div>

                <div className="rounded-xl bg-[#f7f9fc] p-4">
                  <p className="text-2xl font-black text-[#20b486]">
                    Sell
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Reach potential buyers
                  </p>
                </div>

                <div className="col-span-2 rounded-xl bg-[#102b46] p-4 text-white">
                  <p className="text-2xl font-black">
                    Exchange
                  </p>
                  <p className="mt-1 text-xs text-blue-100">
                    Explore alternative ways to complete a deal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="bg-white px-5 py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-[#102b46] p-9 text-white md:p-12">
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-[#20b486] text-xl font-black">
              M
            </div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#20b486]">
              Our mission
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Make trade more accessible.
            </h2>

            <p className="mt-5 leading-8 text-blue-100">
              To make it easier for people and businesses to discover
              opportunities, connect with potential trading partners,
              and exchange value through an accessible marketplace.
            </p>
          </div>

          <div className="rounded-3xl bg-[#e8f8f1] p-9 md:p-12">
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-[#102b46] text-xl font-black text-white">
              V
            </div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#15966e]">
              Our vision
            </p>

            <h2 className="mt-4 text-3xl font-black">
              A connected trading community.
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              To become a trusted destination where individuals and
              businesses can find opportunities, build relationships,
              and participate in a more connected trading ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#20b486]">
            Why TradeBridge
          </p>

          <h2 className="text-3xl font-black md:text-4xl">
            Built around better trading opportunities.
          </h2>

          <p className="mt-4 leading-7 text-gray-500">
            A marketplace experience that brings buying, selling
            and exchange opportunities together.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.number}
              className="rounded-2xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-sm font-black text-[#20b486]">
                {benefit.number}
              </p>

              <h3 className="mt-6 text-xl font-black">
                {benefit.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-500">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white px-5 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#20b486]">
              How it works
            </p>

            <h2 className="text-3xl font-black md:text-4xl">
              From discovery to deal.
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              Getting started on TradeBridge is straightforward.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f8f1] font-black text-[#15966e]">
                  {step.number}
                </div>

                <h3 className="mt-6 text-xl font-black">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST AND SAFETY */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#20b486]">
              Trade responsibly
            </p>

            <h2 className="text-3xl font-black md:text-4xl">
              Better opportunities start with informed decisions.
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              TradeBridge is designed to help people discover and
              connect around trading opportunities. Every buyer and
              seller should take reasonable steps to verify products,
              identities and transaction details before completing
              a deal.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8">
            <h3 className="text-xl font-black">
              Smart trading practices
            </h3>

            <ul className="mt-6 space-y-5 text-sm leading-6 text-gray-600">
              <li className="flex gap-3">
                <span className="font-black text-[#20b486]">✓</span>
                Verify products and inspect items before payment or exchange.
              </li>

              <li className="flex gap-3">
                <span className="font-black text-[#20b486]">✓</span>
                Confirm the identity and contact details of the other party.
              </li>

              <li className="flex gap-3">
                <span className="font-black text-[#20b486]">✓</span>
                Agree on prices, delivery and exchange conditions in advance.
              </li>

              <li className="flex gap-3">
                <span className="font-black text-[#20b486]">✓</span>
                Use safe meeting places and secure payment methods.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#102b46] px-5 py-20 text-center text-white md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#20b486]">
            Your next opportunity starts here
          </p>

          <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
            Ready to discover a better way to trade?
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-7 text-blue-100">
            Explore available products, connect with sellers, or
            introduce your own products to the marketplace.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/marketplace"
              className="rounded-full bg-[#20b486] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#15966e]"
            >
              Explore Marketplace
            </Link>

            <Link
              href="/register"
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-[#102b46]"
            >
              Join TradeBridge
            </Link>
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
            <Link href="/" className="hover:text-[#20b486]">
              Home
            </Link>

            <Link href="/marketplace" className="hover:text-[#20b486]">
              Marketplace
            </Link>

            <Link href="/about" className="hover:text-[#20b486]">
              About
            </Link>

            <Link href="/sell" className="hover:text-[#20b486]">
              Sell
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-blue-300">
          © 2026 TradeBridge. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

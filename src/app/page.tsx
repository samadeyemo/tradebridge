
const categories = [
  { icon: "🚗", name: "Vehicles", count: "Automobiles & parts" },
  { icon: "📱", name: "Electronics", count: "Phones & gadgets" },
  { icon: "🛋️", name: "Furniture", count: "Home & office" },
  { icon: "🏗️", name: "Building", count: "Materials & tools" },
  { icon: "🌾", name: "Agriculture", count: "Farm products" },
  { icon: "👗", name: "Fashion", count: "Clothing & accessories" },
];

const products = [
  {
    name: "Toyota Corolla 2018",
    category: "Vehicles",
    price: "₦12,500,000",
    location: "Lagos, Nigeria",
    condition: "Foreign used",
    icon: "🚘",
    color: "bg-slate-100",
    trade: "Cash or Trade",
  },
  {
    name: "iPhone 14 Pro Max",
    category: "Electronics",
    price: "₦950,000",
    location: "Abuja, Nigeria",
    condition: "UK used",
    icon: "📱",
    color: "bg-violet-50",
    trade: "Cash or Trade",
  },
  {
    name: "Modern Living Room Set",
    category: "Furniture",
    price: "₦780,000",
    location: "Ibadan, Nigeria",
    condition: "Brand new",
    icon: "🛋️",
    color: "bg-amber-50",
    trade: "Barter available",
  },
  {
    name: "Industrial Generator",
    category: "Equipment",
    price: "₦2,400,000",
    location: "Port Harcourt, Nigeria",
    condition: "Excellent",
    icon: "⚙️",
    color: "bg-emerald-50",
    trade: "Cash or Trade",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Announcement */}
      <div className="bg-[#102b46] px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        A smarter way to buy, sell and exchange products.
        <span className="ml-2 text-amber-300">Discover TradeBridge →</span>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#126b58] text-xl font-bold text-white">
              T
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-[#102b46]">
              Trade<span className="text-[#16846b]">Bridge</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a href="#marketplace" className="hover:text-[#16846b]">Marketplace</a>
            <a href="#categories" className="hover:text-[#16846b]">Categories</a>
            <a href="#how-it-works" className="hover:text-[#16846b]">How it works</a>
            <a href="#about" className="hover:text-[#16846b]">About us</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="/login" className="hidden text-sm font-bold text-slate-700 sm:block">
              Log in
            </a>
            <a
              href="/register"
              className="rounded-lg bg-[#126b58] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0d5546]"
            >
              Get started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f3f7f5]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-bold text-[#126b58]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              THE MARKETPLACE WITHOUT LIMITS
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[1.1] tracking-tight text-[#102b46] sm:text-6xl lg:text-7xl">
              Buy what you need.
              <span className="block text-[#16846b]">Trade what you have.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Discover a smarter marketplace where you can buy products,
              exchange what you own or combine products with cash to make
              the deal happen.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#marketplace"
                className="rounded-xl bg-[#126b58] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-1 hover:bg-[#0d5546]"
              >
                Explore marketplace →
              </a>
              <a
                href="/register"
                className="rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-[#102b46] transition hover:border-[#126b58]"
              >
                List your product
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold text-slate-600">
              <span>✓ Buy with confidence</span>
              <span>✓ Exchange products</span>
              <span>✓ Flexible deals</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-blue-200/50 blur-3xl" />

            <div className="relative rounded-3xl border border-white bg-white p-5 shadow-2xl shadow-slate-300/40 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-500">Explore opportunities</p>
                  <h2 className="mt-1 text-2xl font-extrabold text-[#102b46]">
                    Your next great deal
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-[#126b58]">
                  Nigeria
                </span>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#f1f5f9] p-5">
                  <div className="text-4xl">🚘</div>
                  <p className="mt-4 text-sm font-bold text-[#102b46]">Buy products</p>
                  <p className="mt-1 text-xs text-slate-500">Find what you need.</p>
                </div>
                <div className="rounded-2xl bg-[#edf7f2] p-5">
                  <div className="text-4xl">🔄</div>
                  <p className="mt-4 text-sm font-bold text-[#102b46]">Exchange items</p>
                  <p className="mt-1 text-xs text-slate-500">Trade what you own.</p>
                </div>
                <div className="rounded-2xl bg-[#fff7e9] p-5">
                  <div className="text-4xl">💰</div>
                  <p className="mt-4 text-sm font-bold text-[#102b46]">Add cash</p>
                  <p className="mt-1 text-xs text-slate-500">Make flexible deals.</p>
                </div>
                <div className="rounded-2xl bg-[#f2f0ff] p-5">
                  <div className="text-4xl">🤝</div>
                  <p className="mt-4 text-sm font-bold text-[#102b46]">Connect</p>
                  <p className="mt-1 text-xs text-slate-500">Meet other traders.</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#102b46] p-5 text-white">
                <p className="text-xs font-semibold text-emerald-300">THE TRADEBRIDGE DIFFERENCE</p>
                <p className="mt-2 text-lg font-bold">
                  More ways to get what you want.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="relative z-10 mx-auto -mt-1 max-w-7xl px-5 py-8 lg:px-8">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-200/60 sm:p-6">
          <div className="mb-4">
            <h2 className="text-lg font-extrabold text-[#102b46]">Find your next deal</h2>
            <p className="mt-1 text-sm text-slate-500">Search products across the marketplace.</p>
          </div>
          <form action="/marketplace" className="grid gap-3 md:grid-cols-[1fr_190px_auto]">
            <input
              name="q"
              type="search"
              placeholder="What are you looking for?"
              className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none transition focus:border-[#16846b] focus:bg-white"
            />
            <select
              name="location"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600 outline-none focus:border-[#16846b]"
              defaultValue=""
            >
              <option value="">All locations</option>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Ibadan</option>
              <option>Port Harcourt</option>
              <option>Kano</option>
            </select>
            <button
              type="submit"
              className="rounded-xl bg-[#126b58] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#0d5546]"
            >
              Search products
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-9 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#16846b]">Explore categories</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#102b46] sm:text-4xl">
              What are you looking for?
            </h2>
          </div>
          <a href="/marketplace" className="hidden text-sm font-bold text-[#16846b] sm:block">
            View all categories →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <a
              key={category.name}
              href={`/marketplace?category=${encodeURIComponent(category.name)}`}
              className="group rounded-2xl border border-slate-100 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0f6f3] text-3xl transition group-hover:bg-emerald-100">
                {category.icon}
              </div>
              <h3 className="mt-5 font-extrabold text-[#102b46]">{category.name}</h3>
              <p className="mt-1 text-xs text-slate-500">{category.count}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Trading options */}
      <section id="how-it-works" className="bg-[#102b46] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              A marketplace built differently
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">
              Three ways to make a deal.
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              TradeBridge gives you more flexibility when buying and exchanging products.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: "💳", title: "Buy with cash", text: "Find a product, agree on the price and purchase through the marketplace." },
              { icon: "🔄", title: "Exchange products", text: "Offer something you own in exchange for something you want." },
              { icon: "🤝", title: "Product + cash", text: "Combine an item you own with an additional cash amount to negotiate a deal." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:bg-white/10">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="mt-6 text-xl font-extrabold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="marketplace" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#16846b]">Discover products</p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#102b46] sm:text-4xl">
              Explore the marketplace
            </h2>
            <p className="mt-3 text-sm text-slate-500">A preview of the products you will discover on TradeBridge.</p>
          </div>
          <a href="/marketplace" className="hidden text-sm font-bold text-[#16846b] sm:block">
            View marketplace →
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.name} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1 hover:shadow-xl">
              <div className={`relative flex h-52 items-center justify-center ${product.color}`}>
                <span className="text-8xl transition duration-300 group-hover:scale-110">{product.icon}</span>
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[#126b58] shadow-sm">
                  {product.trade}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-slate-400">{product.category} · {product.condition}</p>
                <h3 className="mt-2 text-base font-extrabold text-[#102b46]">{product.name}</h3>
                <p className="mt-3 text-xl font-black text-[#126b58]">{product.price}</p>
                <p className="mt-2 text-xs text-slate-500">📍 {product.location}</p>
                <a href="/marketplace" className="mt-5 block rounded-xl border border-slate-200 py-3 text-center text-sm font-bold text-[#102b46] transition hover:border-[#126b58] hover:bg-[#126b58] hover:text-white">
                  View details
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">
          Illustrative preview listings only. Live products will appear when the marketplace database is connected.
        </p>
      </section>

      {/* CTA */}
      <section id="about" className="px-5 pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#edf7f2] px-6 py-14 text-center sm:px-12 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-[#16846b]">Join the marketplace</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black tracking-tight text-[#102b46] sm:text-5xl">
            What you have could be exactly what someone needs.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Start discovering products, connecting with traders and exploring new ways to exchange value.
          </p>
          <a href="/register" className="mt-8 inline-flex rounded-xl bg-[#126b58] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#0d5546]">
            Create your free account →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b2035] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-2xl font-black">Trade<span className="text-emerald-400">Bridge</span></div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
              A smarter marketplace to buy, exchange and connect.
            </p>
          </div>
          <div>
            <h3 className="font-bold">Marketplace</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <a className="block hover:text-white" href="/marketplace">Browse products</a>
              <a className="block hover:text-white" href="/categories">Categories</a>
              <a className="block hover:text-white" href="/sell">Sell a product</a>
            </div>
          </div>
          <div>
            <h3 className="font-bold">Company</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <a className="block hover:text-white" href="/about">About us</a>
              <a className="block hover:text-white" href="/contact">Contact us</a>
              <a className="block hover:text-white" href="/help">Help centre</a>
            </div>
          </div>
          <div>
            <h3 className="font-bold">Legal</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <a className="block hover:text-white" href="/privacy">Privacy policy</a>
              <a className="block hover:text-white" href="/terms">Terms & conditions</a>
              <a className="block hover:text-white" href="/refund-policy">Refund policy</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-7 text-center text-xs text-slate-500">
          © © 2026 TradeBridge. All rights reserved. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

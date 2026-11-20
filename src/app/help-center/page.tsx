
import Link from "next/link";
import InfoPageLayout from "@/components/InfoPageLayout";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is TradeBridge?",
        a: "TradeBridge is an online marketplace designed to help people discover products, connect with buyers and sellers, and explore buying or trading opportunities.",
      },
      {
        q: "How do I create an account?",
        a: "Select Register on the website and follow the instructions. Provide accurate information and keep your login details secure.",
      },
      {
        q: "Do I need an account to browse products?",
        a: "You may browse publicly available marketplace listings. Some features, such as contacting sellers or managing listings, may require an account.",
      },
    ],
  },
  {
    category: "Buying on TradeBridge",
    questions: [
      {
        q: "How do I buy an item?",
        a: "Find an item in the marketplace, review its description and images, and contact the seller to confirm availability, condition, price, delivery arrangements and payment terms.",
      },
      {
        q: "Does TradeBridge guarantee every product?",
        a: "No. Listings are provided by users. Buyers should independently verify the seller, inspect the item where possible, and agree on all transaction details before paying.",
      },
      {
        q: "What should I do if a seller stops responding?",
        a: "Keep records of your communications and any payment evidence. Contact TradeBridge through the Contact page and provide the listing details and relevant information.",
      },
    ],
  },
  {
    category: "Selling on TradeBridge",
    questions: [
      {
        q: "How do I list a product?",
        a: "Sign in, open the Sell section, complete the listing details, upload clear images and submit your listing. Follow any instructions shown on the platform.",
      },
      {
        q: "Can I edit or remove my listing?",
        a: "Use your seller dashboard or My Listings area to manage listings where those features are available.",
      },
      {
        q: "What can I sell?",
        a: "Only list lawful products and services that you are authorised to sell. Prohibited, counterfeit, stolen, dangerous or otherwise restricted items must not be listed.",
      },
    ],
  },
  {
    category: "Payments, Delivery & Safety",
    questions: [
      {
        q: "Does TradeBridge collect payment for every transaction?",
        a: "TradeBridge may not process or hold payments for transactions arranged directly between users. Check the payment instructions for the specific service you are using before sending money.",
      },
      {
        q: "How should I stay safe?",
        a: "Verify the other party, avoid suspicious payment requests, do not share passwords or verification codes, and meet in a safe public place when arranging an in-person exchange.",
      },
      {
        q: "Can I request a refund?",
        a: "Refund eligibility depends on the transaction, the payment method and the applicable Refund Policy. Review that policy and contact the relevant seller or payment provider where appropriate.",
      },
    ],
  },
  {
    category: "Accounts & Privacy",
    questions: [
      {
        q: "What if I forget my password?",
        a: "Use the password recovery option if it is available. Never share your password or one-time verification code with another person.",
      },
      {
        q: "How does TradeBridge use my information?",
        a: "TradeBridge uses personal information to operate the platform, support users, improve services and meet legal obligations. Read the Privacy Policy for details.",
      },
    ],
  },
];

export default function HelpCenterPage() {
  return (
    <InfoPageLayout
      title="Help Center"
      description="Find answers to common questions about accounts, buying, selling, payments and staying safe on TradeBridge."
    >
      <div className="not-prose mb-8 rounded-xl bg-emerald-50 p-5">
        <h2 className="text-lg font-bold text-[#102b46]">How can we help?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Browse the answers below. If you still need assistance, our contact page is available.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex rounded-lg bg-[#20b486] px-5 py-3 text-sm font-semibold text-white hover:bg-[#159b70]"
        >
          Contact Support
        </Link>
      </div>

      <div className="space-y-10">
        {faqs.map((group) => (
          <section key={group.category}>
            <h2>{group.category}</h2>
            <div className="mt-4 space-y-3">
              {group.questions.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-slate-200 p-4 open:border-emerald-200 open:bg-emerald-50/40"
                >
                  <summary className="cursor-pointer list-none pr-6 font-semibold text-[#102b46] marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {item.q}
                      <span className="text-xl text-emerald-600 transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mb-1 mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <hr />
      <h2>Useful TradeBridge policies</h2>
      <ul>
        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
        <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
        <li><Link href="/refund-policy">Refund Policy</Link></li>
        <li><Link href="/buyer-seller-policy">Buyer & Seller Policy</Link></li>
      </ul>
    </InfoPageLayout>
  );
}

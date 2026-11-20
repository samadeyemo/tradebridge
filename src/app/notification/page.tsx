
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Notification = {
  id: number;
  title: string;
  message: string;
  category: string;
  time: string;
  read: boolean;
  icon: string;
};

const demoNotifications: Notification[] = [
  {
    id: 1,
    title: "Welcome to TradeBridge",
    message: "Your demo account is ready. Start exploring products and opportunities.",
    category: "Account",
    time: "Just now",
    read: false,
    icon: "👋",
  },
  {
    id: 2,
    title: "Explore the marketplace",
    message: "Discover products from sellers and find items that match your needs.",
    category: "Marketplace",
    time: "Today",
    read: false,
    icon: "🛍️",
  },
  {
    id: 3,
    title: "Start selling",
    message: "Create your first product listing and introduce your products to buyers.",
    category: "Listings",
    time: "Today",
    read: true,
    icon: "📦",
  },
  {
    id: 4,
    title: "Discover exchanges",
    message: "Explore opportunities to exchange products with other marketplace users.",
    category: "Exchanges",
    time: "Yesterday",
    read: true,
    icon: "🔄",
  },
];

export default function NotificationsPage() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
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

      setUserName(user.fullName || "Customer");

      const storageKey = `tradebridge_notifications_${user.email}`;
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        setNotifications(JSON.parse(stored));
      } else {
        setNotifications(demoNotifications);
        localStorage.setItem(
          storageKey,
          JSON.stringify(demoNotifications)
        );
      }
    } catch {
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  function saveNotifications(updated: Notification[]) {
    setNotifications(updated);

    const session =
      localStorage.getItem("tradebridge_demo_session") ||
      sessionStorage.getItem("tradebridge_demo_session");

    if (!session) return;

    const user = JSON.parse(session);

    localStorage.setItem(
      `tradebridge_notifications_${user.email}`,
      JSON.stringify(updated)
    );
  }

  function markAsRead(id: number) {
    saveNotifications(
      notifications.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  }

  function markAllAsRead() {
    saveNotifications(
      notifications.map((item) => ({ ...item, read: true }))
    );
  }

  function deleteNotification(id: number) {
    saveNotifications(
      notifications.filter((item) => item.id !== id)
    );
  }

  function clearAll() {
    if (!window.confirm("Delete all your notifications?")) return;
    saveNotifications([]);
  }

  function handleLogout() {
    localStorage.removeItem("tradebridge_demo_session");
    sessionStorage.removeItem("tradebridge_demo_session");
    router.replace("/login");
  }

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "Unread") return !item.read;
    if (filter === "Read") return item.read;
    return true;
  });

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading notifications...</p>
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

            <Link href="/my-listings" className="hover:text-emerald-700">
              My Listings
            </Link>

            <Link href="/notifications" className="font-semibold text-emerald-700">
              Notifications
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

      <div className="mx-auto max-w-5xl px-5 py-10">

        {/* Heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Your Activity
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Notifications
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Hello {userName}, stay updated on your marketplace activities.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white px-5 py-3">
            <p className="text-xs text-gray-500">Unread notifications</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">
              {unreadCount}
            </p>
          </div>
        </div>

        {/* Notification panel */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center">

            <div className="flex flex-wrap gap-2">
              {["All", "Unread", "Read"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                    filter === item
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 disabled:opacity-40"
              >
                Mark all as read
              </button>

              <button
                onClick={clearAll}
                disabled={notifications.length === 0}
                className="text-xs font-semibold text-red-500 hover:text-red-700 disabled:opacity-40"
              >
                Clear all
              </button>
            </div>
          </div>

          {/* Notification list */}
          {filteredNotifications.length === 0 ? (
            <div className="px-5 py-20 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 text-4xl">
                🔔
              </div>

              <h3 className="mt-6 text-lg font-bold text-gray-900">
                {notifications.length === 0
                  ? "No notifications yet"
                  : "You're all caught up"}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                New marketplace updates will appear here.
              </p>

              <Link
                href="/marketplace"
                className="mt-6 inline-flex rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Explore Marketplace
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">

              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex flex-col gap-4 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-start ${
                    !notification.read ? "bg-emerald-50/30" : ""
                  }`}
                >

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl">
                    {notification.icon}
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-900">
                        {notification.title}
                      </h3>

                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-emerald-600" />
                      )}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {notification.message}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                        {notification.category}
                      </span>

                      <span className="text-xs text-gray-400">
                        {notification.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end">

                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        Mark read
                      </button>
                    )}

                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-xs font-semibold text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              ))}

            </div>
          )}
        </section>

        {/* Information */}
        <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
          <h3 className="font-bold text-emerald-950">
            Stay connected to TradeBridge
          </h3>

          <p className="mt-2 text-sm leading-6 text-emerald-800">
            Your notification centre will eventually include product updates,
            new messages, purchase activity, exchange requests and important
            account alerts.
          </p>
        </div>

        <footer className="mt-10 border-t border-gray-200 py-6 text-center text-xs text-gray-400">
          © {2026} TradeBridge. All rights reserved.
        </footer>

      </div>
    </main>
  );
}

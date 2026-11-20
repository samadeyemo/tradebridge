
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Message = {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
};

type Conversation = {
  id: string;
  name: string;
  email: string;
  product: string;
  avatar: string;
  messages: Message[];
  unread: number;
  updatedAt: string;
};

type UserSession = {
  fullName: string;
  email: string;
  phone?: string;
  loggedIn: boolean;
};

const storageKey = (email: string) =>
  `tradebridge_messages_${email.toLowerCase()}`;

function createDemoConversations(): Conversation[] {
  const now = new Date().toISOString();

  return [
    {
      id: "conversation-1",
      name: "Michael Johnson",
      email: "michael@example.com",
      product: "Samsung Galaxy S23",
      avatar: "MJ",
      unread: 2,
      updatedAt: now,
      messages: [
        {
          id: "m1",
          sender: "them",
          text: "Hello, is the Samsung Galaxy S23 still available?",
          time: "10:20 AM",
        },
        {
          id: "m2",
          sender: "me",
          text: "Yes, it is still available.",
          time: "10:22 AM",
        },
        {
          id: "m3",
          sender: "them",
          text: "Can you share more pictures of its condition?",
          time: "10:24 AM",
        },
      ],
    },
    {
      id: "conversation-2",
      name: "Grace Williams",
      email: "grace@example.com",
      product: "HP EliteBook Laptop",
      avatar: "GW",
      unread: 0,
      updatedAt: now,
      messages: [
        {
          id: "m4",
          sender: "them",
          text: "Would you consider an exchange?",
          time: "Yesterday",
        },
        {
          id: "m5",
          sender: "me",
          text: "What item do you have for exchange?",
          time: "Yesterday",
        },
      ],
    },
    {
      id: "conversation-3",
      name: "David Thompson",
      email: "david@example.com",
      product: "Toyota Corolla 2012",
      avatar: "DT",
      unread: 0,
      updatedAt: now,
      messages: [
        {
          id: "m6",
          sender: "them",
          text: "I am interested in your listing.",
          time: "Monday",
        },
      ],
    },
  ];
}

export default function MessagesPage() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [messageText, setMessageText] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem("tradebridge_demo_session") ||
      sessionStorage.getItem("tradebridge_demo_session");

    if (!saved) {
      window.location.href = "/login";
      return;
    }

    try {
      const parsed = JSON.parse(saved) as UserSession;

      if (!parsed.loggedIn || !parsed.email) {
        window.location.href = "/login";
        return;
      }

      setUser(parsed);

      const key = storageKey(parsed.email);
      const stored = localStorage.getItem(key);

      if (stored) {
        setConversations(JSON.parse(stored));
      } else {
        const demo = createDemoConversations();
        setConversations(demo);
        localStorage.setItem(key, JSON.stringify(demo));
      }

      setReady(true);
    } catch {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (!user || !ready) return;

    localStorage.setItem(
      storageKey(user.email),
      JSON.stringify(conversations)
    );
  }, [conversations, user, ready]);

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedId
  );

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const matchesSearch =
        conversation.name.toLowerCase().includes(search.toLowerCase()) ||
        conversation.product.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" || conversation.unread > 0;

      return matchesSearch && matchesFilter;
    });
  }, [conversations, search, filter]);

  const unreadTotal = conversations.reduce(
    (total, conversation) => total + conversation.unread,
    0
  );

  function openConversation(id: string) {
    setSelectedId(id);

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === id
          ? { ...conversation, unread: 0 }
          : conversation
      )
    );
  }

  function sendMessage() {
    if (!messageText.trim() || !selectedId) return;

    const newMessage: Message = {
      id: `${Date.now()}`,
      sender: "me",
      text: messageText.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,
              messages: [...conversation.messages, newMessage],
              updatedAt: new Date().toISOString(),
              unread: 0,
            }
          : conversation
      )
    );

    setMessageText("");
  }

  function logout() {
    localStorage.removeItem("tradebridge_demo_session");
    sessionStorage.removeItem("tradebridge_demo_session");
    window.location.href = "/login";
  }

  if (!ready || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sm text-gray-500">Loading messages...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f9f8] text-gray-900">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/dashboard" className="text-2xl font-black tracking-tight text-emerald-700">
            TradeBridge<span className="text-gray-900">.</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
            <Link href="/dashboard" className="hover:text-emerald-700">Dashboard</Link>
            <Link href="/marketplace" className="hover:text-emerald-700">Marketplace</Link>
            <Link href="/my-listings" className="hover:text-emerald-700">My Listings</Link>
            <Link href="/notifications" className="hover:text-emerald-700">Notifications</Link>
            <span className="font-semibold text-emerald-700">Messages</span>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-gray-600 sm:block">
              {user.fullName}
            </span>
            <button
              onClick={logout}
              className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-8">
        <div className="mb-6">
          <p className="text-sm font-semibold text-emerald-700">COMMUNICATION</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Messages</h1>
          <p className="mt-1 text-sm text-gray-500">
            Connect with buyers and sellers on TradeBridge.
          </p>
        </div>

        <div className="grid h-[680px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:grid-cols-[320px_1fr]">
          {/* Conversation list */}
          <section
            className={`flex min-h-0 flex-col border-r border-gray-200 ${
              selectedId ? "hidden md:flex" : "flex"
            }`}
          >
            <div className="border-b border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Inbox</h2>
                {unreadTotal > 0 && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                    {unreadTotal} unread
                  </span>
                )}
              </div>

              <div className="mt-4">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search conversations..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    filter === "all"
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    filter === "unread"
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Unread
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="font-semibold text-gray-700">
                    No conversations found
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Try another search or filter.
                  </p>
                </div>
              ) : (
                filteredConversations.map((conversation) => {
                  const lastMessage =
                    conversation.messages[conversation.messages.length - 1];

                  return (
                    <button
                      key={conversation.id}
                      onClick={() => openConversation(conversation.id)}
                      className={`flex w-full gap-3 border-b border-gray-100 p-4 text-left transition hover:bg-gray-50 ${
                        selectedId === conversation.id ? "bg-emerald-50" : ""
                      }`}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                        {conversation.avatar}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-bold">
                            {conversation.name}
                          </p>
                          {conversation.unread > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
                              {conversation.unread}
                            </span>
                          )}
                        </div>

                        <p className="mt-1 truncate text-xs font-medium text-emerald-700">
                          {conversation.product}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {lastMessage?.sender === "me" ? "You: " : ""}
                          {lastMessage?.text}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </section>

          {/* Chat window */}
          <section
            className={`min-h-0 flex-col ${
              selectedId ? "flex" : "hidden md:flex"
            }`}
          >
            {selectedConversation ? (
              <>
                <div className="flex items-center gap-3 border-b border-gray-100 p-4">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="rounded-lg px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 md:hidden"
                  >
                    ← Back
                  </button>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                    {selectedConversation.avatar}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold">
                      {selectedConversation.name}
                    </h3>
                    <p className="truncate text-xs text-gray-500">
                      Discussing: {selectedConversation.product}
                    </p>
                  </div>

                  <span className="hidden rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 sm:inline">
                    Demo conversation
                  </span>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto bg-[#fbfcfb] p-4 sm:p-6">
                  <div className="mx-auto mb-5 max-w-sm rounded-xl bg-gray-100 px-4 py-3 text-center text-xs text-gray-500">
                    Keep your transactions safe. Avoid sharing passwords or
                    sensitive account information.
                  </div>

                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[70%] ${
                          message.sender === "me"
                            ? "rounded-br-sm bg-emerald-700 text-white"
                            : "rounded-bl-sm border border-gray-100 bg-white text-gray-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words text-sm leading-6">
                          {message.text}
                        </p>
                        <p
                          className={`mt-2 text-right text-[10px] ${
                            message.sender === "me"
                              ? "text-emerald-100"
                              : "text-gray-400"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendMessage();
                  }}
                  className="border-t border-gray-100 bg-white p-3 sm:p-4"
                >
                  <div className="flex items-end gap-2">
                    <textarea
                      value={messageText}
                      onChange={(event) => setMessageText(event.target.value)}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" &&
                          !event.shiftKey &&
                          !event.nativeEvent.isComposing
                        ) {
                          event.preventDefault();
                          sendMessage();
                        }
                      }}
                      rows={1}
                      placeholder="Write a message..."
                      className="max-h-28 min-h-12 flex-1 resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:bg-white"
                    />

                    <button
                      type="submit"
                      disabled={!messageText.trim()}
                      className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Send
                    </button>
                  </div>
                  <p className="mt-2 text-[10px] text-gray-400">
                    Demo messaging · Press Enter to send
                  </p>
                </form>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
                  💬
                </div>
                <h3 className="mt-5 text-lg font-bold">
                  Your conversations
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                  Select a conversation to connect with a buyer or seller.
                </p>
              </div>
            )}
          </section>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          TradeBridge demo messaging. Real-time messaging will be enabled
          when the backend is connected.
        </p>
      </div>
    </main>
  );
}

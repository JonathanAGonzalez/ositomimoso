"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import type { User } from "next-auth";
import type { Conversation } from "./types";
import { POLL_INTERVAL_MS } from "./utils";

import SidebarHeader from "./components/SidebarHeader";
import ConversationItem from "./components/ConversationItem";
import ChatHeader from "./components/ChatHeader";
import MessageBubble from "./components/MessageBubble";
import MessageInput from "./components/MessageInput";
import EmptyState from "./components/EmptyState";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import StatsCards from "./components/StatsCards";
import type { Message } from "./types";

export default function DashboardClient({ user }: { user: User }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);
  const [togglingBot, setTogglingBot] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingConv, setLoadingConv] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ─── Data fetching ──────────────────────────────────
  const fetchConversations = useCallback(async (isInitial = false) => {
    if (isInitial) setLoadingConv(true);
    try {
      const res = await fetch("/api/dashboard/conversations");
      const data = await res.json();
      setConversations(data.conversations || []);
    } catch (err) {
      console.error("Error cargando conversaciones:", err);
    } finally {
      if (isInitial) setLoadingConv(false);
    }
  }, []);

  const fetchMessages = useCallback(async (id: string, isInitial = false) => {
    if (isInitial) setLoadingMessages(true);
    try {
      const res = await fetch(`/api/dashboard/conversations/${id}/messages`);
      const data = await res.json();
      setMessages(data.messages || []);
      setSelectedConv(data.conversation || null);
    } catch (err) {
      console.error("Error cargando mensajes:", err);
    } finally {
      if (isInitial) setLoadingMessages(false);
    }
  }, []);

  // ─── Polling ────────────────────────────────────────
  useEffect(() => {
    fetchConversations(true);
    const id = setInterval(() => fetchConversations(false), POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchConversations]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    // Check if user is near bottom (within 100px)
    const nearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setAutoScroll(nearBottom);
  };

  useEffect(() => {
    if (!selectedId) return;
    setAutoScroll(true); // Reset auto-scroll when changing chat
    fetchMessages(selectedId, true);
    const id = setInterval(
      () => fetchMessages(selectedId, false),
      POLL_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [selectedId, fetchMessages]);

  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  // ─── Handlers ───────────────────────────────────────
  const handleSelectConversation = (conv: Conversation) => {
    setSelectedId(conv._id);
    setSelectedConv(conv);
    setMessages([]);
    setShowSidebar(false);
  };

  const handleSend = async () => {
    if (!inputText.trim() || !selectedId || sending) return;
    setSending(true);
    try {
      await fetch(`/api/dashboard/conversations/${selectedId}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText.trim() }),
      });
      setInputText("");
      await fetchMessages(selectedId);
    } catch (err) {
      console.error("Error enviando mensaje:", err);
    } finally {
      setSending(false);
    }
  };

  const handleToggleBot = async () => {
    if (!selectedId || !selectedConv || togglingBot) return;
    setTogglingBot(true);
    try {
      const res = await fetch(
        `/api/dashboard/conversations/${selectedId}/toggle-bot`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ botActive: !selectedConv.botActive }),
        },
      );
      const data = await res.json();
      setSelectedConv((prev) =>
        prev ? { ...prev, botActive: data.botActive } : prev,
      );
      setConversations((prev) =>
        prev.map((c) =>
          c._id === selectedId ? { ...c, botActive: data.botActive } : c,
        ),
      );
    } catch (err) {
      console.error("Error toggling bot:", err);
    } finally {
      setTogglingBot(false);
    }
  };

  const handleDeleteConversation = async () => {
    if (!selectedId || deleting) return;
    setDeleting(true);
    try {
      await fetch(`/api/dashboard/conversations/${selectedId}/delete`, {
        method: "DELETE",
      });
      setConversations((prev) => prev.filter((c) => c._id !== selectedId));
      setSelectedId(null);
      setSelectedConv(null);
      setMessages([]);
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error eliminando conversación:", err);
    } finally {
      setDeleting(false);
    }
  };

  // ─── Render ─────────────────────────────────────────
  const sidebarHidden = !!(selectedId && !showSidebar);

  return (
    <div className="flex h-dvh font-sans bg-dash-bg text-dash-text overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`w-full sm:w-80 sm:min-w-80 border-r border-dash-border flex flex-col bg-dash-surface
          fixed sm:static inset-0 z-10 transition-transform duration-200 ease-out
          ${sidebarHidden ? "-translate-x-full sm:translate-x-0" : "translate-x-0"}`}
      >
        <SidebarHeader user={user} />
        <div className="flex-1 overflow-y-auto">
          {loadingConv ? (
            <div className="flex flex-col gap-1 p-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-[72px] bg-dash-surface border border-dash-border/50 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : conversations.length === 0 ? (
            <div className="px-4 py-10 text-center text-dash-muted">
              <p className="text-[32px] mb-2">💬</p>
              <p className="text-sm">No hay conversaciones aún</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <ConversationItem
                key={conv._id}
                conv={conv}
                isSelected={selectedId === conv._id}
                onSelect={() => handleSelectConversation(conv)}
              />
            ))
          )}
        </div>
      </aside>

      {/* Chat area */}
      <main className="flex-1 flex flex-col min-w-0">
        <StatsCards />
        {!selectedId ? (
          <EmptyState />
        ) : (
          <>
            <ChatHeader
              conv={selectedConv}
              togglingBot={togglingBot}
              onToggleBot={handleToggleBot}
              onBack={() => setShowSidebar(true)}
              onDelete={() => setShowDeleteModal(true)}
            />

            {/* Messages */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-2"
            >
              {loadingMessages ? (
                // Message Skeleton
                <>
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"} animate-pulse`}
                    >
                      <div
                        className={`max-w-[70%] h-12 rounded-2xl ${
                          i % 2 === 0
                            ? "w-48 bg-dash-surface border border-dash-border rounded-tl-none"
                            : "w-64 bg-dash-accent/20 border border-dash-accent/30 rounded-tr-none"
                        }`}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {messages.map((msg) => (
                    <MessageBubble key={msg._id} msg={msg} />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            <MessageInput
              value={inputText}
              onChange={setInputText}
              onSend={handleSend}
              sending={sending}
              botPaused={!selectedConv?.botActive}
            />
          </>
        )}
      </main>

      {showDeleteModal && selectedConv && (
        <ConfirmDeleteModal
          contactName={selectedConv.contactName || selectedConv.phoneNumber}
          onConfirm={handleDeleteConversation}
          onCancel={() => setShowDeleteModal(false)}
          deleting={deleting}
        />
      )}
    </div>
  );
}

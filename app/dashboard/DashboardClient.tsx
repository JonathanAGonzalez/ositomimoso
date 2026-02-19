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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ─── Data fetching ──────────────────────────────────
  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard/conversations");
      const data = await res.json();
      setConversations(data.conversations || []);
    } catch (err) {
      console.error("Error cargando conversaciones:", err);
    }
  }, []);

  const fetchMessages = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/dashboard/conversations/${id}/messages`);
      const data = await res.json();
      setMessages(data.messages || []);
      setSelectedConv(data.conversation || null);
    } catch (err) {
      console.error("Error cargando mensajes:", err);
    }
  }, []);

  // ─── Polling ────────────────────────────────────────
  useEffect(() => {
    fetchConversations();
    const id = setInterval(fetchConversations, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchConversations]);

  useEffect(() => {
    if (!selectedId) return;
    fetchMessages(selectedId);
    const id = setInterval(() => fetchMessages(selectedId), POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [selectedId, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          {conversations.length === 0 ? (
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
        {!selectedId ? (
          <EmptyState />
        ) : (
          <>
            <ChatHeader
              conv={selectedConv}
              togglingBot={togglingBot}
              onToggleBot={handleToggleBot}
              onBack={() => setShowSidebar(true)}
            />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              {messages.map((msg) => (
                <MessageBubble key={msg._id} msg={msg} />
              ))}
              <div ref={messagesEndRef} />
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
    </div>
  );
}

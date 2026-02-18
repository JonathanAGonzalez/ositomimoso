"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface Conversation {
  _id: string;
  phoneNumber: string;
  contactName: string;
  botActive: boolean;
  lastMessageAt: string;
}

interface Message {
  _id: string;
  role: "user" | "bot" | "human";
  text: string;
  timestamp: string;
}

export default function DashboardPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);
  const [togglingBot, setTogglingBot] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Cargar lista de conversaciones
  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard/conversations");
      const data = await res.json();
      setConversations(data.conversations || []);
    } catch (err) {
      console.error("Error cargando conversaciones:", err);
    }
  }, []);

  // Cargar mensajes de la conversación seleccionada
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

  // Polling: actualizar cada 3 segundos
  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 3000);
    return () => clearInterval(interval);
  }, [fetchConversations]);

  useEffect(() => {
    if (!selectedId) return;
    fetchMessages(selectedId);
    const interval = setInterval(() => fetchMessages(selectedId), 3000);
    return () => clearInterval(interval);
  }, [selectedId, fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedId(conv._id);
    setSelectedConv(conv);
    setMessages([]);
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

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (ts: string) => {
    const d = new Date(ts);
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    if (isToday) return formatTime(ts);
    return d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
  };

  const getInitials = (name: string, phone: string) => {
    if (name) return name.charAt(0).toUpperCase();
    return phone.slice(-2);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Inter', sans-serif",
        background: "#0f0f13",
        color: "#e8e8f0",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "320px",
          borderRight: "1px solid #1e1e2e",
          display: "flex",
          flexDirection: "column",
          background: "#13131a",
        }}
      >
        {/* Header */}
        <div
          style={{ padding: "20px 16px", borderBottom: "1px solid #1e1e2e" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>🧸</span>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                Osito Mimoso
              </h1>
              <p style={{ margin: 0, fontSize: "12px", color: "#6b6b8a" }}>
                Panel de WhatsApp
              </p>
            </div>
          </div>
        </div>

        {/* Conversation list */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {conversations.length === 0 ? (
            <div
              style={{
                padding: "40px 16px",
                textAlign: "center",
                color: "#6b6b8a",
              }}
            >
              <p style={{ fontSize: "32px", margin: "0 0 8px" }}>💬</p>
              <p style={{ fontSize: "14px" }}>No hay conversaciones aún</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv._id}
                onClick={() => handleSelectConversation(conv)}
                style={{
                  padding: "14px 16px",
                  cursor: "pointer",
                  borderBottom: "1px solid #1a1a26",
                  background:
                    selectedId === conv._id ? "#1e1e30" : "transparent",
                  transition: "background 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: conv.botActive
                      ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                      : "linear-gradient(135deg, #dc2626, #b91c1c)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {getInitials(conv.contactName, conv.phoneNumber)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#e8e8f0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {conv.contactName || conv.phoneNumber}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#6b6b8a",
                        flexShrink: 0,
                        marginLeft: "8px",
                      }}
                    >
                      {formatDate(conv.lastMessageAt)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "3px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        padding: "2px 6px",
                        borderRadius: "10px",
                        background: conv.botActive
                          ? "rgba(79,70,229,0.2)"
                          : "rgba(220,38,38,0.2)",
                        color: conv.botActive ? "#818cf8" : "#f87171",
                        fontWeight: 600,
                      }}
                    >
                      {conv.botActive ? "🤖 Bot" : "👤 Humano"}
                    </span>
                    <span style={{ fontSize: "11px", color: "#6b6b8a" }}>
                      {conv.phoneNumber}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {!selectedId ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "12px",
              color: "#6b6b8a",
            }}
          >
            <span style={{ fontSize: "64px" }}>💬</span>
            <p style={{ fontSize: "18px", fontWeight: 600, color: "#9999b8" }}>
              Seleccioná una conversación
            </p>
            <p style={{ fontSize: "14px" }}>
              Los chats aparecen automáticamente cuando llegan mensajes de
              WhatsApp
            </p>
          </div>
        ) : (
          <>
            {/* Chat header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #1e1e2e",
                background: "#13131a",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: selectedConv?.botActive
                      ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                      : "linear-gradient(135deg, #dc2626, #b91c1c)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {selectedConv
                    ? getInitials(
                        selectedConv.contactName,
                        selectedConv.phoneNumber,
                      )
                    : "?"}
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: "15px",
                      color: "#fff",
                    }}
                  >
                    {selectedConv?.contactName || selectedConv?.phoneNumber}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#6b6b8a" }}>
                    {selectedConv?.phoneNumber}
                  </p>
                </div>
              </div>

              {/* Toggle bot button */}
              <button
                onClick={handleToggleBot}
                disabled={togglingBot}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: "none",
                  cursor: togglingBot ? "not-allowed" : "pointer",
                  background: selectedConv?.botActive
                    ? "rgba(220,38,38,0.15)"
                    : "rgba(79,70,229,0.15)",
                  color: selectedConv?.botActive ? "#f87171" : "#818cf8",
                  fontSize: "13px",
                  fontWeight: 600,
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {selectedConv?.botActive ? "🔕 Pausar bot" : "🤖 Activar bot"}
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {messages.map((msg) => {
                const isOutgoing = msg.role === "bot" || msg.role === "human";
                return (
                  <div
                    key={msg._id}
                    style={{
                      display: "flex",
                      justifyContent: isOutgoing ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "65%",
                        padding: "10px 14px",
                        borderRadius: isOutgoing
                          ? "18px 18px 4px 18px"
                          : "18px 18px 18px 4px",
                        background:
                          msg.role === "user"
                            ? "#1e1e2e"
                            : msg.role === "human"
                              ? "linear-gradient(135deg, #059669, #047857)"
                              : "linear-gradient(135deg, #4f46e5, #6d28d9)",
                        color: "#fff",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      }}
                    >
                      {msg.role !== "user" && (
                        <div
                          style={{
                            fontSize: "10px",
                            opacity: 0.7,
                            marginBottom: "4px",
                            fontWeight: 600,
                          }}
                        >
                          {msg.role === "human" ? "👤 Vos" : "🤖 Osi"}
                        </div>
                      )}
                      <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                        {msg.text}
                      </p>
                      <div
                        style={{
                          fontSize: "10px",
                          opacity: 0.6,
                          marginTop: "4px",
                          textAlign: "right",
                        }}
                      >
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div
              style={{
                padding: "16px 20px",
                borderTop: "1px solid #1e1e2e",
                background: "#13131a",
                display: "flex",
                gap: "10px",
                alignItems: "flex-end",
              }}
            >
              {!selectedConv?.botActive && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "80px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(220,38,38,0.9)",
                    color: "#fff",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  👤 Modo humano activo — el bot no responde
                </div>
              )}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Escribí un mensaje... (Enter para enviar, Shift+Enter para nueva línea)"
                rows={2}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #2a2a3e",
                  background: "#1a1a28",
                  color: "#e8e8f0",
                  fontSize: "14px",
                  resize: "none",
                  outline: "none",
                  fontFamily: "inherit",
                  lineHeight: "1.5",
                }}
              />
              <button
                onClick={handleSend}
                disabled={sending || !inputText.trim()}
                style={{
                  padding: "12px 20px",
                  borderRadius: "12px",
                  border: "none",
                  background:
                    sending || !inputText.trim()
                      ? "#2a2a3e"
                      : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  color: sending || !inputText.trim() ? "#6b6b8a" : "#fff",
                  cursor:
                    sending || !inputText.trim() ? "not-allowed" : "pointer",
                  fontSize: "20px",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "50px",
                  height: "50px",
                }}
              >
                {sending ? "⏳" : "➤"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

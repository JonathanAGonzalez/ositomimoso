"use client";

import { useEffect, useState } from "react";
import { POLL_INTERVAL_MS } from "../utils";

interface Stats {
  visit_proposed: number;
  visit_confirmed: number;
  price_request: number;
  vacancy_request: number;
  conversation_closed_by_admin: number;
}

export default function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true); // Default expanded

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error cargando estadísticas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const id = setInterval(fetchStats, POLL_INTERVAL_MS * 2);
    return () => clearInterval(id);
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex gap-3 px-4 py-3 overflow-x-auto sm:grid sm:grid-cols-5 sm:overflow-visible no-scrollbar">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-20 min-w-[140px] sm:min-w-0 bg-dash-surface border border-dash-border rounded-xl flex flex-col items-center justify-center p-3 animate-pulse"
          >
            <div className="w-6 h-6 bg-dash-border rounded-full mb-2" />
            <div className="w-12 h-6 bg-dash-border rounded-md mb-2" />
            <div className="w-16 h-2 bg-dash-border rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  const items = [
    {
      label: "V. Propuestas",
      val: stats.visit_proposed,
      icon: "📅",
      color: "text-dash-accent-light",
      info: "Interés en conocer la escuela.",
    },
    {
      label: "V. Confirmadas",
      val: stats.visit_confirmed,
      icon: "✅",
      color: "text-dash-success",
      info: "Visitas coordinadas con día y hora.",
    },
    {
      label: "Precios",
      val: stats.price_request,
      icon: "💰",
      color: "text-amber-400",
      info: "Consultas por aranceles o cuotas.",
    },
    {
      label: "Vacantes",
      val: stats.vacancy_request,
      icon: "🧸",
      color: "text-dash-purple",
      info: "Consultas sobre disponibilidad.",
    },
    {
      label: "Cerradas",
      val: stats.conversation_closed_by_admin,
      icon: "🤝",
      color: "text-dash-muted",
      info: "Resueltas exitosamente.",
    },
  ];

  return (
    <div className="flex flex-col border-b border-dash-border bg-dash-bg/50">
      {/* Header / Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between px-4 py-2 hover:bg-dash-surface transition-colors group"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-dash-muted group-hover:text-dash-accent-light transition-colors">
            Métricas del Bot
          </span>
          {!isExpanded && (
            <div className="flex gap-2 ml-2 animate-fadeIn">
              {items.map((it) => (
                <span
                  key={it.label}
                  className={`text-[10px] font-bold ${it.color}`}
                >
                  {it.val}
                </span>
              ))}
            </div>
          )}
        </div>
        <span
          className={`text-xs text-dash-muted transform transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {/* Grid/Scroll Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-40 opacity-100 mb-3" : "max-h-0 opacity-0"}`}
      >
        <div className="flex gap-3 px-4 py-1 overflow-x-auto sm:grid sm:grid-cols-5 sm:overflow-visible no-scrollbar">
          {items.map((it) => (
            <div
              key={it.label}
              className="group relative bg-dash-surface border border-dash-border p-3 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:border-dash-accent/30 transition-colors min-w-[120px] sm:min-w-0"
            >
              {/* Tooltip / Info - Hidden on mobile, shown on desktop hover */}
              <div className="absolute top-1.5 right-1.5 opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-help group/tip">
                <div className="relative">
                  <span className="text-[10px] text-dash-muted bg-dash-border w-3.5 h-3.5 rounded-full flex items-center justify-center font-serif italic border border-dash-border/50">
                    i
                  </span>
                  <div className="absolute top-full right-0 mt-2 w-40 p-2 bg-dash-surface border border-dash-border rounded-lg shadow-xl text-[10px] text-dash-text text-left pointer-events-none z-50 invisible group-hover/tip:visible animate-fadeIn">
                    {it.info}
                  </div>
                </div>
              </div>

              <span className="text-lg mb-0.5">{it.icon}</span>
              <span className={`text-xl font-bold ${it.color}`}>{it.val}</span>
              <span className="text-[9px] uppercase tracking-wider text-dash-muted font-bold truncate w-full">
                {it.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

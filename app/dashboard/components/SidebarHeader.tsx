"use client";

import { signOut } from "next-auth/react";
import type { User } from "next-auth";

export default function SidebarHeader({ user }: { user: User }) {
  return (
    <div className="border-b border-dash-border px-4 py-3.5">
      <div className="flex items-center gap-2.5 mb-2.5">
        <span className="text-[22px]">🧸</span>
        <div className="flex-1">
          <h1 className="text-[15px] font-bold text-white m-0">Osito Mimoso</h1>
          <p className="text-[11px] text-dash-muted m-0">Panel de WhatsApp</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-dash-muted truncate">
          👤 {user.name || user.email}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="ml-2 shrink-0 rounded-lg border border-dash-input-border bg-transparent px-2.5 py-1 text-[11px] text-dash-muted cursor-pointer transition-colors hover:text-dash-danger-light hover:border-dash-danger/40"
        >
          Salir
        </button>
      </div>
    </div>
  );
}

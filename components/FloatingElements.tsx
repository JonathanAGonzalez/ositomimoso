"use client";

import React from "react";

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Wave shape left */}
      <div className="absolute top-[10%] -left-10 opacity-10 animate-pulse hidden lg:block">
        <svg
          width="200"
          height="80"
          viewBox="0 0 200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 40C20 40 20 20 40 20C60 20 60 60 80 60C100 60 100 20 120 20C140 20 140 40 160 40C180 40 180 30 200 30"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-brand-blue"
          />
        </svg>
      </div>

      {/* Wave shape right */}
      <div className="absolute top-[40%] -right-10 opacity-10 animate-pulse delay-700 hidden lg:block rotate-180">
        <svg
          width="200"
          height="80"
          viewBox="0 0 200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 40C20 40 20 20 40 20C60 20 60 60 80 60C100 60 100 20 120 20C140 20 140 40 160 40C180 40 180 30 200 30"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-brand-brown"
          />
        </svg>
      </div>

      {/* Circle top right */}
      <div className="absolute top-[5%] right-[5%] w-64 h-64 bg-zinc-100 rounded-full blur-3xl opacity-30" />

      {/* Circle middle left */}
      <div className="absolute top-[45%] left-[-5%] w-48 h-48 bg-brand-blue/5 rounded-full blur-2xl" />

      {/* Dotted circle top left */}
      <div className="absolute top-[20%] left-[5%] w-32 h-32 border-4 border-dashed border-zinc-100 rounded-full animate-spin-slow opacity-40 hidden md:block" />

      {/* Dotted circle bottom right */}
      <div className="absolute bottom-[20%] right-[10%] w-40 h-40 border-4 border-dashed border-zinc-100 rounded-full animate-spin-slow-reverse opacity-40 hidden md:block" />
    </div>
  );
};

export default FloatingElements;

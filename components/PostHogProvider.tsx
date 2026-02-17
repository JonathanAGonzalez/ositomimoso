"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

export default function PostHogProvider({
  children,
  apiKey,
  apiHost,
}: {
  children: React.ReactNode;
  apiKey: string;
  apiHost: string;
}) {
  useEffect(() => {
    // Check if we are in the browser
    if (typeof window !== "undefined" && apiKey) {
      posthog.init(apiKey, {
        api_host: apiHost,
        person_profiles: "identified_only",
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        capture_pageleave: true, // Enable pageleave capture
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") posthog.debug();
        },
        before_send: (event) => {
          if (event?.properties?.$current_url) {
            const parsed = new URL(event.properties.$current_url);
            if (parsed.hash) {
              event.properties.$pathname = parsed.pathname + parsed.hash;
            }
          }
          return event;
        },
      });
    }
  }, [apiKey, apiHost]);

  return <>{children}</>;
}

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
        ui_host: "https://us.posthog.com",
        person_profiles: "identified_only",
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        capture_pageleave: true, // Enable pageleave capture
        sanitize_properties: (properties) => {
          if (typeof properties["$current_url"] === "string") {
            properties["$current_url"] = properties["$current_url"].replace(
              /\/home\/?$/,
              "",
            );
          }
          return properties;
        },
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") posthog.debug();
        },
      });
    }
  }, [apiKey, apiHost]);

  return <>{children}</>;
}

"use client";

import Script from "next/script";

export default function CalendlyScript() {
  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        // Notify the app that Calendly is available
        window.dispatchEvent(new Event("calendly:loaded"));
      }}
    />
  );
}

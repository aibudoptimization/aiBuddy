import type { Metadata } from "next";
import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import { INTRO_HOLD_ATTR, INTRO_PENDING_ATTR, INTRO_SEEN_KEY } from "@/lib/introFlag";

import "./globals.css";

const grotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Workflow Wonder",
    template: "%s · Workflow Wonder",
  },
  description:
    "Automatisations, agents IA et sites pour les entrepreneurs du Québec. Consultation gratuite.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

/**
 * Runs synchronously before the body paints: if the splash intro hasn't been
 * seen this session, flag <html> so CSS raises an opaque curtain immediately
 * and holds hero entrance animations at their first frame.
 * Mirrors introPending() in BrandSplash (on storage errors, treat as pending).
 * BrandSplash drops the curtain attribute once it owns the screen, and the
 * hold attribute once the intro has fully finished. The timeout is a
 * failsafe: if the splash never runs, the hold must not strand the hero.
 */
const introCurtainScript = `(function(){var d=document.documentElement,p=${JSON.stringify(
  INTRO_PENDING_ATTR,
)},h=${JSON.stringify(INTRO_HOLD_ATTR)};function m(){d.setAttribute(p,"");d.setAttribute(h,"");setTimeout(function(){d.removeAttribute(h)},6000)}try{if(sessionStorage.getItem(${JSON.stringify(
  INTRO_SEEN_KEY,
)})!=="1")m()}catch(e){m()}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the intro curtain script below mutates <html>
    // (adds data-ww-intro) before React hydrates — expected, not a bug.
    <html
      lang="fr-CA"
      className={`${grotesk.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* The curtain script must be parser-blocking (runs before first
            paint), which next/script's beforeInteractive can't guarantee in
            the app router (it defers via the __next_s queue). Serializing the
            <script> as opaque HTML keeps React from ever rendering a script
            component, so it executes from the SSR HTML without React 19's
            dev warning, and hydration/re-renders never re-execute it. */}
        <div
          hidden
          aria-hidden
          dangerouslySetInnerHTML={{ __html: `<script>${introCurtainScript}</script>` }}
        />
        {children}
      </body>
    </html>
  );
}

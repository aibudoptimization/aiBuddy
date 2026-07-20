import type { Metadata } from "next";
import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";

import { INTRO_PENDING_ATTR, INTRO_SEEN_KEY } from "@/lib/introFlag";

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
 * seen this session, flag <html> so CSS raises an opaque curtain immediately.
 * Mirrors introPending() in BrandSplash (on storage errors, treat as pending).
 * BrandSplash removes the attribute once it has mounted and owns the screen.
 */
const introCurtainScript = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem(${JSON.stringify(
  INTRO_SEEN_KEY,
)})!=="1")d.setAttribute(${JSON.stringify(INTRO_PENDING_ATTR)},"")}catch(e){d.setAttribute(${JSON.stringify(
  INTRO_PENDING_ATTR,
)},"")}})()`;

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
        <script dangerouslySetInnerHTML={{ __html: introCurtainScript }} />
        {children}
      </body>
    </html>
  );
}

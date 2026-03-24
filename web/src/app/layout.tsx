import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "aiBuddy — Web design & automation",
    template: "%s · aiBuddy",
  },
  description:
    "Premium web design and workflow automation. Schedule an audit or get in touch.",
  openGraph: {
    title: "aiBuddy — Web design & automation",
    description:
      "Premium web design and workflow automation for teams that outgrow brittle tools.",
    locale: "en",
    type: "website",
    siteName: "aiBuddy",
  },
  twitter: {
    card: "summary_large_image",
    title: "aiBuddy — Web design & automation",
    description:
      "Premium web design and workflow automation for teams that outgrow brittle tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--accent-foreground)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

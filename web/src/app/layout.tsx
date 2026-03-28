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

function metadataBaseUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const fallback = "http://localhost:3000";
  if (!raw) return new URL(fallback);
  const normalized =
    raw.startsWith("http://") || raw.startsWith("https://")
      ? raw
      : raw.startsWith("localhost") || raw.startsWith("127.0.0.1")
        ? `http://${raw}`
        : `https://${raw}`;
  try {
    return new URL(normalized);
  } catch {
    return new URL(fallback);
  }
}

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl(),
  title: {
    default: "WorkflowWonder — Web design & automation",
    template: "%s · WorkflowWonder",
  },
  description:
    "Premium web design and workflow automation. Schedule an audit or get in touch.",
  openGraph: {
    title: "WorkflowWonder — Web design & automation",
    description:
      "Premium web design and workflow automation for teams that outgrow brittle tools.",
    locale: "en",
    type: "website",
    siteName: "WorkflowWonder",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkflowWonder — Web design & automation",
    description:
      "Premium web design and workflow automation for teams that outgrow brittle tools.",
  },
  icons: {
    icon: [
      { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/brand/wfwonder-logo-cal-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/brand/favicon-32x32.png",
    apple: "/brand/apple-touch-icon.png",
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
      <body className="relative min-h-full flex flex-col antialiased">
        <div className="page-bg-sheen" aria-hidden />
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

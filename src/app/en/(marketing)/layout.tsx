import { MarketingChrome } from "@/components/layout/MarketingChrome";

export default function EnMarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MarketingChrome locale="en">{children}</MarketingChrome>;
}

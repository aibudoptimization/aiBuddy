import type { ReactNode } from "react";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

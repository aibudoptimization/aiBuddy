import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ServicesPageContent } from "@/components/sections/ServicesPageContent";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore WorkflowWonder services for web design, development, and automation.",
};

function ServicesPageFallback() {
  return (
    <main id="main-content" className="flex-1">
      <section className="border-b border-[var(--border)] py-20 sm:py-24" aria-label="Services">
        <Container>
          <p className="text-sm text-[var(--muted)]">Loading services…</p>
        </Container>
      </section>
    </main>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<ServicesPageFallback />}>
        <ServicesPageContent />
      </Suspense>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { ServicesPageContent } from "@/components/sections/ServicesPageContent";
import { ServicesPageFallback } from "@/components/sections/ServicesPageFallback";

export const metadata: Metadata = {
  title: "Web design & development",
  description:
    "Strategy, UX, UI, and production-grade engineering—fast sites, solid CMS handoffs, and integrations your team can run.",
};

export default function ServicesWebDesignPage() {
  return (
    <Suspense fallback={<ServicesPageFallback />}>
      <ServicesPageContent />
    </Suspense>
  );
}

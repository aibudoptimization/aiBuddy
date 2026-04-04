import type { Metadata } from "next";
import { Suspense } from "react";
import { ServicesPageContent } from "@/components/sections/ServicesPageContent";
import { ServicesPageFallback } from "@/components/sections/ServicesPageFallback";

export const metadata: Metadata = {
  title: "Automated workflows",
  description:
    "Agent-assisted automation and iPaaS integrations—governed workflows, clear runbooks, and less manual glue between your tools.",
};

export default function ServicesAutomationPage() {
  return (
    <Suspense fallback={<ServicesPageFallback />}>
      <ServicesPageContent />
    </Suspense>
  );
}

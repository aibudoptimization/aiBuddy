import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ServicesPageContent } from "@/components/sections/ServicesPageContent";
import { ServicesPageFallback } from "@/components/sections/ServicesPageFallback";
import {
  AUTOMATED_WORKFLOWS_TAB_ID,
  SERVICES_AUTOMATION_PATH,
  SERVICES_PAGE_SERVICE_QUERY,
  SERVICES_WEB_DESIGN_PATH,
  WEB_DESIGN_DEVELOPMENT_TAB_ID,
} from "@/lib/services-page-deep-link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "WorkflowWonder services: web design and development, plus automated workflows and agentic integrations for your stack.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ServicesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const raw = sp[SERVICES_PAGE_SERVICE_QUERY];
  const q = typeof raw === "string" ? raw : undefined;
  if (q === WEB_DESIGN_DEVELOPMENT_TAB_ID) redirect(SERVICES_WEB_DESIGN_PATH);
  if (q === AUTOMATED_WORKFLOWS_TAB_ID) redirect(SERVICES_AUTOMATION_PATH);

  return (
    <Suspense fallback={<ServicesPageFallback />}>
      <ServicesPageContent />
    </Suspense>
  );
}

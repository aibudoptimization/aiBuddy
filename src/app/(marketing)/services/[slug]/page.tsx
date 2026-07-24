import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AgentsIaPage } from "@/components/services/agents-ia/AgentsIaPage";
import { AutomatisationPage } from "@/components/services/automatisation/AutomatisationPage";
import { ConseilPage } from "@/components/services/conseil/ConseilPage";
import { IntegrationPage } from "@/components/services/integration/IntegrationPage";
import { SitesBoutiquesPage } from "@/components/services/sites-boutiques/SitesBoutiquesPage";
import { getDictionary } from "@/content/i18n";
import type { ServiceSlug } from "@/lib/routes";

const SERVICE_SLUGS: ServiceSlug[] = [
  "automatisation",
  "agents-ia",
  "integration",
  "sites-boutiques",
  "conseil",
];

function serviceCopy(slug: ServiceSlug) {
  const dict = getDictionary();
  if (slug === "automatisation") return dict.services.automatisation;
  if (slug === "agents-ia") return dict.services.agentsIa;
  if (slug === "integration") return dict.services.integration;
  if (slug === "conseil") return dict.services.conseil;
  return dict.services.sitesBoutiques;
}

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) return {};
  const meta = serviceCopy(slug as ServiceSlug);
  return { title: meta.metaTitle, description: meta.metaDescription };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) notFound();

  if (slug === "automatisation") return <AutomatisationPage />;
  if (slug === "agents-ia") return <AgentsIaPage />;
  if (slug === "integration") return <IntegrationPage />;
  if (slug === "conseil") return <ConseilPage />;
  if (slug === "sites-boutiques") return <SitesBoutiquesPage />;

  notFound();
}

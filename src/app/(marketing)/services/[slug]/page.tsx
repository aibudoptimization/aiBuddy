import { notFound } from "next/navigation";

import { AgentsIaPage } from "@/components/services/agents-ia/AgentsIaPage";
import { AutomatisationPage } from "@/components/services/automatisation/AutomatisationPage";
import { SitesBoutiquesPage } from "@/components/services/sites-boutiques/SitesBoutiquesPage";
import type { ServiceSlug } from "@/lib/routes";

const SERVICE_SLUGS: ServiceSlug[] = [
  "automatisation",
  "agents-ia",
  "sites-boutiques",
];

const SERVICE_META: Record<
  ServiceSlug,
  { title: string; description: string; accent: string; eyebrow: string; headline: string }
> = {
  automatisation: {
    title: "Automatisation des workflows",
    description:
      "Vos tâches répétitives exécutées automatiquement selon vos règles.",
    accent: "#4bfac8",
    eyebrow: "Automatisation des workflows",
    headline: "Vos workflows tournent pendant que vous développez votre activité.",
  },
  "agents-ia": {
    title: "Agents & assistants IA",
    description: "Des agents qui comprennent, décident et génèrent à votre place.",
    accent: "#8b7cff",
    eyebrow: "Agents & assistants IA",
    headline: "Une couche IA qui raisonne, pas seulement qui exécute.",
  },
  "sites-boutiques": {
    title: "Sites & boutiques en ligne",
    description: "Des plateformes sur mesure, de la landing page à la boutique complète.",
    accent: "#f0a94e",
    eyebrow: "Sites & boutiques en ligne",
    headline: "On donne vie à votre présence en ligne.",
  },
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) return {};
  const meta = SERVICE_META[slug as ServiceSlug];
  return { title: meta.title, description: meta.description };
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
  if (slug === "sites-boutiques") return <SitesBoutiquesPage />;

  notFound();
}

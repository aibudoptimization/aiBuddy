"use client";

import { ServiceDetailPage } from "@/components/services/detail/ServiceDetailPage";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function AgentsIaPage() {
  const { dict } = useLocale();
  return (
    <ServiceDetailPage
      copy={dict.services.agentsIa}
      accent="#8b7cff"
      heroRgb="139,124,255"
      heroSecondaryRgb="75,250,200"
      heroImage={{
        src: "/services/agents-ia.png",
        alt: "Noyau lumineux avec ramifications de décision, image d'agent IA",
      }}
    />
  );
}

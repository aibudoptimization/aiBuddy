"use client";

import { ServiceDetailPage } from "@/components/services/detail/ServiceDetailPage";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function IntegrationPage() {
  const { dict } = useLocale();
  return (
    <ServiceDetailPage
      copy={dict.services.integration}
      accent="#6aa8ff"
      heroRgb="106,168,255"
      heroSecondaryRgb="139,124,255"
      heroImage={{
        src: "/services/integration.png",
        alt: "Plusieurs outils reliés qui convergent en un seul flux de données",
      }}
    />
  );
}

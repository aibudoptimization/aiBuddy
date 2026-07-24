"use client";

import { ServiceDetailPage } from "@/components/services/detail/ServiceDetailPage";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function ConseilPage() {
  const { dict } = useLocale();
  return (
    <ServiceDetailPage
      copy={dict.services.conseil}
      accent="#f56aa8"
      heroRgb="245,106,168"
      heroSecondaryRgb="139,124,255"
      heroImage={{
        src: "/services/conseil.png",
        alt: "Chemin lumineux jalonné d'étapes prioritaires, image de conseil et d'optimisation",
      }}
    />
  );
}

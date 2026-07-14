import Link from "next/link";

import { ROUTES } from "@/lib/routes";

type ServiceCtaBandProps = {
  accentLabel: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  gradientRgb?: string;
  solidCta?: boolean;
};

export function ServiceCtaBand({
  accentLabel,
  title,
  description,
  ctaLabel,
  ctaHref = ROUTES.contact,
  gradientRgb = "139,124,255",
  solidCta = false,
}: ServiceCtaBandProps) {
  return (
    <div
      className="ww-service-cta"
      style={{
        background: `linear-gradient(150deg, rgba(${gradientRgb},0.12), rgba(18,16,26,0.3) 55%)`,
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <div className="ww-mono ww-service-cta__label">{accentLabel}</div>
        <div className="ww-service-cta__title">{title}</div>
        <div className="ww-service-cta__desc">{description}</div>
      </div>
      {solidCta ? (
        <Link
          href={ctaHref}
          className="ww-service-cta__solid"
          style={{ background: "var(--accent)" }}
        >
          {ctaLabel}
        </Link>
      ) : (
        <Link href={ctaHref} className="ww-cta-fill ww-service-cta__btn">
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}

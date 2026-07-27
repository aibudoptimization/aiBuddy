"use client";

import Link from "next/link";
import { DoorOpen, FileText, UserCheck, Wrench, type LucideIcon } from "lucide-react";

import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { useLocale } from "@/components/i18n/LocaleProvider";

/** Keyed by the step's `no` so the dict order drives the pairing. */
const STEP_ICONS: Record<string, LucideIcon> = {
  "01": UserCheck, // built on your own accounts
  "02": FileText, // documented as we go
  "03": Wrench, // we can run it for you
  "04": DoorOpen, // you can leave whenever
};

export function HomeOwnershipSection() {
  const { dict, routes } = useLocale();
  const o = dict.home.ownership;
  const eyebrow = "PROPRIÉTÉ";

  return (
    <section
      className="ww-container ww-section"
      style={{
        paddingTop: "clamp(40px, 7vh, 90px)",
        paddingBottom: "clamp(50px, 8vh, 100px)",
      }}
    >
      <div className="ww-section-header" style={{ marginBottom: 18 }}>
        <h2 className="ww-section-title">
          {o.title}
        </h2>
        <EyebrowCanvas text={eyebrow} phase={0.52} />
      </div>
      <p className="ww-section-lead" style={{ marginBottom: 52 }}>
        {o.lead}
      </p>
      <div className="ww-ownership-grid">
        {o.steps.map((step) => {
          const Icon = STEP_ICONS[step.no] ?? UserCheck;
          return (
          <div key={step.no} className="ww-ownership-step">
            <div className="ww-ownership-step__line">
              <span className="ww-ownership-step__icon">
                <Icon size={18} strokeWidth={1.9} aria-hidden />
              </span>
              {/* Bleeds into the column gutter so the four rules read as one
                  continuous rail. CSS cancels the bleed on row-enders. */}
              <span className="ww-ownership-step__bar" aria-hidden />
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
          );
        })}
      </div>
      <div className="ww-ownership-footer">
        <p className="ww-ownership-footer__line">
          {o.footerStrong} <span>{o.footerMuted}</span>
        </p>
        <Link href={routes.faq} className="ww-ownership-footer__link ww-mono">
          {o.footerCta}
        </Link>
      </div>
    </section>
  );
}

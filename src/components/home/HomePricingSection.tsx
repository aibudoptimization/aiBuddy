"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarClock, LifeBuoy, Receipt, type LucideIcon } from "lucide-react";

import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { GlowBullet } from "@/components/home/GlowBullet";
import { useLocale } from "@/components/i18n/LocaleProvider";

/** Keyed by the note's `no` so the dict order drives the pairing. */
const PAYMENT_ICONS: Record<string, LucideIcon> = {
  "01": CalendarClock, // staged instalments
  "02": Receipt, // no hidden markup
  "03": LifeBuoy, // optional support
};

export function HomePricingSection() {
  const { dict, routes } = useLocale();
  const p = dict.home.pricing;
  const eyebrow = "INVESTISSEMENT";

  return (
    <section
      id="tarifs"
      className="ww-container ww-section"
      style={{
        paddingTop: "clamp(40px, 7vh, 90px)",
        paddingBottom: "clamp(50px, 8vh, 100px)",
      }}
    >
      <div className="ww-section-header" style={{ marginBottom: 18 }}>
        <h2 className="ww-section-title">
          {p.titleLine1}
          <br />
          {p.titleLine2}
        </h2>
        <EyebrowCanvas text={eyebrow} phase={0.76} />
      </div>
      <p className="ww-section-lead" style={{ marginBottom: 30 }}>
        {p.lead}
      </p>

      <div className="ww-consult-grid">
        <div className="ww-consult-card">
          <span className="ww-consult-badge">{p.consultEyebrow}</span>
          <h3>{p.consultTitle}</h3>
          <div className="ww-consult-list">
            {p.consultItems.map((line) => (
              <div key={line} className="ww-consult-list__item">
                <GlowBullet />
                {line}
              </div>
            ))}
          </div>
          <div className="ww-consult-founder">
            <Image
              src="/founder-christopher.webp"
              alt={dict.founder.photoAlt}
              width={44}
              height={44}
              className="ww-consult-founder__photo"
            />
            <div className="ww-consult-founder__text">
              <span className="ww-consult-founder__name">
                {dict.founder.name} · {dict.founder.role}
              </span>
              <span className="ww-consult-founder__line">{dict.founder.consultLine}</span>
            </div>
          </div>
          <Link href={routes.contact} className="ww-cta-solid">
            {p.consultCta}
          </Link>
        </div>
        <div className="ww-quote-card">
          <span className="ww-mono ww-quote-card__label">{p.factorsHeading}</span>
          <div className="ww-quote-grid">
            {p.factors.map((factor) => (
              <div key={factor} className="ww-quote-item">
                <GlowBullet />
                {factor}
              </div>
            ))}
          </div>
          <p className="ww-quote-note">
            <span>{p.factorsNoteStrong}</span> {p.factorsNote}
          </p>
        </div>
      </div>

      <div className="ww-payment-grid">
        {p.payment.map((note) => {
          const Icon = PAYMENT_ICONS[note.no] ?? CalendarClock;
          return (
            <div key={note.no} className="ww-payment-note">
              <span className="ww-payment-note__icon">
                <Icon size={18} strokeWidth={1.9} aria-hidden />
              </span>
              <div>
                <div className="ww-payment-note__title">{note.title}</div>
                <div className="ww-payment-note__desc">{note.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

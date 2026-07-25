"use client";

import Image from "next/image";

import { StaticAmbient } from "@/components/canvas/StaticAmbient";
import { HeroReveal } from "@/components/ui/HeroReveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from "@/lib/routes";

export function ContactPage() {
  const { dict } = useLocale();
  const c = dict.contact;
  const f = dict.founder;

  return (
    <div className="ww-journal-page">
      <StaticAmbient quiet />

      <div className="ww-journal-page__content">
        <section
          className="ww-container ww-contact ww-page-head"
          style={{ paddingBottom: "clamp(64px, 12vh, 120px)" }}
        >
          <div className="ww-contact__grid">
            <div className="ww-contact__intro">
              <HeroReveal>
                <div className="ww-contact__eyebrow ww-mono ww-hero-fade">
                  <span className="ww-glow-dot" style={{ width: 6, height: 6 }} aria-hidden />
                  {c.eyebrow}
                </div>
                <h1 className="ww-contact__title">
                  <span className="ww-hero-line">
                    <span>{c.title}</span>
                  </span>
                </h1>
                <p className="ww-contact__lead ww-hero-fade">{c.lead}</p>
              </HeroReveal>

              <div className="ww-founder-card">
                <Image
                  src="/founder-christopher.webp"
                  alt={f.photoAlt}
                  width={132}
                  height={132}
                  className="ww-founder-card__photo"
                />
                <div className="ww-founder-card__body">
                  <p className="ww-founder-card__note">{f.note}</p>
                  <div className="ww-founder-card__sign">
                    <span className="ww-founder-card__name">{f.name}</span>
                    <span className="ww-founder-card__role">
                      {f.role} · {f.region}
                    </span>
                  </div>
                </div>
              </div>

              <div className="ww-contact__email">
                <span className="ww-contact__email-label">{c.emailPrompt}</span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="ww-contact__email-link">
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div className="ww-contact__email">
                <span className="ww-contact__email-label">{c.phonePrompt}</span>
                <a href={`tel:${CONTACT_PHONE_TEL}`} className="ww-contact__email-link">
                  {CONTACT_PHONE}
                </a>
              </div>
            </div>

            <div className="ww-contact__panel">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

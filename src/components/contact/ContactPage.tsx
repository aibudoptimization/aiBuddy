"use client";

import { JournalPageAmbient } from "@/components/journal/JournalPageAmbient";
import { ContactForm } from "@/components/contact/ContactForm";
import { GlowBullet } from "@/components/home/GlowBullet";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { CONTACT_EMAIL } from "@/lib/routes";

export function ContactPage() {
  const { dict } = useLocale();
  const c = dict.contact;

  return (
    <div className="ww-journal-page">
      <JournalPageAmbient />

      <div className="ww-journal-page__content">
        <section
          className="ww-container ww-contact"
          style={{
            paddingTop: "clamp(104px, 13vh, 132px)",
            paddingBottom: "clamp(64px, 12vh, 120px)",
          }}
        >
          <div className="ww-contact__grid">
            <div className="ww-contact__intro">
              <div className="ww-contact__eyebrow ww-mono">
                <span className="ww-glow-dot" style={{ width: 6, height: 6 }} aria-hidden />
                {c.eyebrow}
              </div>
              <h1 className="ww-contact__title">{c.title}</h1>
              <p className="ww-contact__lead">{c.lead}</p>

              <div className="ww-contact__bullets">
                {c.bullets.map((line) => (
                  <div key={line} className="ww-contact__bullet">
                    <GlowBullet />
                    {line}
                  </div>
                ))}
              </div>

              <div className="ww-contact__email">
                <span className="ww-contact__email-label">{c.emailPrompt}</span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="ww-contact__email-link">
                  {CONTACT_EMAIL}
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

"use client";

import { ContactForm } from "@/components/contact/ContactForm";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
} from "@/lib/routes";

type ServiceContactBlockProps = {
  /** Small mono kicker above the title (per-service, e.g. "Sur mesure"). Optional. */
  kicker?: string;
  title: string;
  description: string;
};

/**
 * Closing block on every service page: a discovery-call CTA (cal.com) with phone
 * and email fallbacks, next to the shared contact form.
 */
export function ServiceContactBlock({ kicker, title, description }: ServiceContactBlockProps) {
  const { dict } = useLocale();
  const c = dict.serviceContact;

  return (
    <section className="ww-svc-section ww-svc-contact">
      <div className="ww-svc-contact__inner">
        <div className="ww-svc-contact__intro">
          {kicker ? <div className="ww-mono ww-svc-contact__kicker">{kicker}</div> : null}
          <h2 className="ww-svc-contact__title">{title}</h2>
          <p className="ww-svc-contact__desc">{description}</p>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ww-cta-fill ww-svc-contact__book"
          >
            {c.bookLabel} <span aria-hidden>→</span>
          </a>
          <div className="ww-mono ww-svc-contact__reassure">{c.eyebrow}</div>

          <div className="ww-svc-contact__lines">
            <p className="ww-svc-contact__line">
              {c.phonePrompt}{" "}
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="ww-svc-contact__link">
                {CONTACT_PHONE}
              </a>
            </p>
            <p className="ww-svc-contact__line">
              {c.emailPrompt}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="ww-svc-contact__link">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>

        <div className="ww-svc-contact__form">
          <div className="ww-mono ww-svc-contact__formheading">{c.formHeading}</div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

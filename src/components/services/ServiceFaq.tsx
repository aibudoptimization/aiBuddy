"use client";

import { useFaqAccordion } from "@/components/faq/FaqAccordionScope";
import type { FaqItem } from "@/content/i18n/types";

type ServiceFaqProps = {
  title: string;
  items: FaqItem[];
};

/**
 * Disclosure list themed off the page --accent. Reused on service pages and
 * /faq. Every item starts closed and only one stays open at a time: opening a
 * question closes the previous one. `open` is driven by React, so the summary's
 * native toggle is suppressed and the state decides.
 */
export function ServiceFaq({ title, items }: ServiceFaqProps) {
  const { openId, toggle } = useFaqAccordion();

  return (
    <section className="ww-svc-section ww-svc-faq">
      <h2 className="ww-svc-h2">{title}</h2>
      <div className="ww-svc-faq__list">
        {items.map((item) => {
          const id = `${title}::${item.q}`;
          return (
            <details key={item.q} className="ww-svc-faq__item" open={openId === id}>
              <summary
                className="ww-svc-faq__q"
                onClick={(event) => {
                  event.preventDefault();
                  toggle(id);
                }}
              >
                <span>{item.q}</span>
                <span className="ww-chev" aria-hidden>
                  +
                </span>
              </summary>
              <p className="ww-svc-faq__a">{item.a}</p>
            </details>
          );
        })}
      </div>
    </section>
  );
}

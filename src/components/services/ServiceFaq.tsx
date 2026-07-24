import type { FaqItem } from "@/content/i18n/types";

type ServiceFaqProps = {
  title: string;
  items: FaqItem[];
  /** Open the first item by default. */
  openFirst?: boolean;
};

/** Native <details> accordion, themed off the page --accent. Reused on service pages and /faq. */
export function ServiceFaq({ title, items, openFirst = true }: ServiceFaqProps) {
  return (
    <section className="ww-svc-section ww-svc-faq">
      <h2 className="ww-svc-h2">{title}</h2>
      <div className="ww-svc-faq__list">
        {items.map((item, i) => (
          <details
            key={item.q}
            className="ww-svc-faq__item"
            open={item.open ?? (openFirst && i === 0)}
          >
            <summary className="ww-svc-faq__q">
              <span>{item.q}</span>
              <span className="ww-chev" aria-hidden>
                +
              </span>
            </summary>
            <p className="ww-svc-faq__a">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

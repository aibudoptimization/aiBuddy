"use client";

import { useId, useState } from "react";
import { homeContent } from "@/content/home";
import { Container } from "@/components/ui/Container";

export function Faq() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-b border-[var(--border)] bg-[var(--background)] py-24 sm:py-32"
      aria-labelledby="faq-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {homeContent.faq.kicker}
          </p>
          <h2
            id="faq-heading"
            className="mt-3 text-2xl font-medium tracking-tight text-[var(--foreground)] sm:text-3xl"
          >
            {homeContent.faq.heading}
          </h2>
        </div>
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-[var(--border)]">
          {homeContent.faq.items.map((item, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const headerId = `${baseId}-header-${index}`;
            return (
              <div key={item.q} className="py-2 first:pt-0 last:pb-0">
                <h3 className="text-base font-semibold">
                  <button
                    type="button"
                    id={headerId}
                    className="flex w-full cursor-pointer items-start justify-between gap-4 py-4 text-left text-[var(--foreground)] transition-colors motion-safe:duration-200 hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex((i) => (i === index ? null : index))}
                  >
                    <span className="pt-0.5 pr-2">{item.q}</span>
                    <span
                      className="relative mt-1.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--background)]/50 text-[var(--foreground)] transition-[border-color,background-color] motion-safe:duration-200"
                      aria-hidden
                    >
                      <span
                        className={`absolute h-0.5 w-3.5 rounded-full bg-current transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-45" : ""}`}
                      />
                      <span
                        className={`absolute h-3.5 w-0.5 rounded-full bg-current transition-[transform,opacity] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-45 opacity-0" : ""}`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className="grid overflow-hidden transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="pb-4 text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

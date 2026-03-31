"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";

const services = [
  {
    id: "web-design-development",
    label: "Web Design & Development",
    heading: "Web Design & Development",
  },
  {
    id: "automated-workflows",
    label: "Automated Workflows",
    heading: "Automated Workflows",
  },
] as const;

type ServiceId = (typeof services)[number]["id"];

function ServicePanel({ heading }: { heading: string }) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm shadow-black/20 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
        <div>
          <h2 className="text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl">{heading}</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            [Lorem ipsum placeholder text]
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            [Lorem ipsum placeholder text]
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-8 text-center">
          <div className="flex min-h-52 items-center justify-center rounded-lg border border-dashed border-[var(--border-strong)] bg-[var(--background)]/35 p-6 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            Service image placeholder
          </div>
        </div>
      </div>
    </article>
  );
}

export function ServicesPageContent() {
  const [activeService, setActiveService] = useState<ServiceId>(services[0].id);

  const activeItem = useMemo(
    () => services.find((service) => service.id === activeService) ?? services[0],
    [activeService],
  );

  return (
    <main id="main-content" className="flex-1">
      <section className="border-b border-[var(--border)] bg-[var(--background)] py-20 sm:py-24" aria-label="Services">
        <Container>
          <div className="mx-auto w-full max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Services</p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight text-[var(--foreground)] sm:text-5xl">
              Choose the service you need right now
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Use the toggle to switch between service details. Only one service panel is visible at a time.
            </p>

            <div
              role="tablist"
              aria-label="Service selection"
              className="mt-10 grid w-full grid-cols-1 gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 sm:grid-cols-2"
            >
              {services.map((service) => {
                const selected = service.id === activeService;
                const tabId = `${service.id}-tab`;
                const panelId = `${service.id}-panel`;

                return (
                  <button
                    key={service.id}
                    id={tabId}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={panelId}
                    onClick={() => setActiveService(service.id)}
                    className={[
                      "min-h-12 rounded-lg px-4 py-3 text-sm font-semibold tracking-wide transition-[background-color,color,border-color,box-shadow] motion-safe:duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
                      selected
                        ? "border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)] shadow-sm shadow-black/20"
                        : "border border-transparent bg-transparent text-[var(--foreground)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]",
                    ].join(" ")}
                  >
                    {service.label}
                  </button>
                );
              })}
            </div>

            {services.map((service) => {
              const selected = service.id === activeService;
              const tabId = `${service.id}-tab`;
              const panelId = `${service.id}-panel`;

              return (
                <div
                  key={service.id}
                  id={panelId}
                  role="tabpanel"
                  aria-labelledby={tabId}
                  style={{ display: selected ? "block" : "none" }}
                  className={selected ? "mt-8 animate-[hero-fade-up_420ms_cubic-bezier(0.22,1,0.36,1)_both]" : ""}
                >
                  <ServicePanel heading={service.heading} />
                </div>
              );
            })}

            <p className="mt-5 text-sm text-[var(--muted)]">Currently viewing: {activeItem.label}</p>
          </div>
        </Container>
      </section>
    </main>
  );
}

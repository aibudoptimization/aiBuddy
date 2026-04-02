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

function ServicePanel({ serviceId, heading }: { serviceId: ServiceId; heading: string }) {
  const isWebDesign = serviceId === "web-design-development";

  return (
    <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm shadow-black/20 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
        <div>
          <h2 className="text-3xl font-medium tracking-tight text-[var(--foreground)] sm:text-4xl">{heading}</h2>
          {isWebDesign ? (
            <div className="mt-5 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              <p>
                Think of us as the architects and the builders of your digital home, all under one roof.
              </p>
              <p>
                As a Full-Service Web Agency, we provide a cohesive, end-to-end digital strategy where the beauty of
                the design and the power of the code are developed in total harmony.
              </p>

              <h3 className="pt-2 text-lg font-medium text-[var(--color-white)] [background-clip:unset] [-webkit-background-clip:unset]">
                Our &quot;Full-Stack&quot; Approach
              </h3>
              <p>
                We do not just hand you a folder of images; we deliver a high-performing business tool. Here is how
                we handle your project from start to finish:
              </p>

              <h4 className="pt-2 text-lg font-medium text-[var(--foreground)]">
                🎨 Phase 1: Strategy &amp; Visual Identity
              </h4>
              <p>Before a single line of code is written, we focus on the User Experience (UX).</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Discovery: We dive into your business goals and target audience.</li>
                <li>UI Design: We create stunning, modern interfaces that reflect your brand.</li>
                <li>
                  Prototyping: You will get a clickable model of your site so you can &quot;feel&quot; the navigation before we
                  build it.
                </li>
              </ul>

              <h4 className="pt-2 text-lg font-medium text-[var(--foreground)]">🛠️ Phase 2: Technical Engineering</h4>
              <p>Once the design is perfected, our development team breathes life into it.</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Front-End Excellence: We ensure your site is lightning-fast and responsive across phones, tablets,
                  and desktop monitors.
                </li>
                <li>
                  Back-End Logic: We build the secure databases, CMS (Content Management Systems), and integrations
                  that make your business run.
                </li>
                <li>
                  SEO Foundations: We code with search engines in mind from day one, so you are not invisible on
                  Google.
                </li>
              </ul>

              <h4 className="pt-2 text-lg font-medium text-[var(--foreground)]">🚀 Phase 3: Launch &amp; Optimization</h4>
              <p>We do not just &quot;hit go&quot; and disappear.</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Testing: We break the site so your customers do not have to.</li>
                <li>Deployment: We handle hosting, security certificates, and domain setup.</li>
                <li>Maintenance: We provide ongoing support to keep your site secure and updated.</li>
              </ul>

              <h3 className="pt-2 text-xl font-medium text-[var(--foreground)]">Why Choose a Full-Service Partner?</h3>
              <p>&quot;Design is not just what it looks like and feels like. Design is how it works.&quot; - Steve Jobs</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  One Point of Contact: You do not have to play middleman between a confused designer and a frustrated
                  developer.
                </li>
                <li>
                  Cost Efficiency: We avoid expensive rework that happens when separate design and development teams
                  are misaligned.
                </li>
                <li>
                  Faster Speed-to-Market: Our integrated workflow helps move from concept to launch much faster than a
                  fragmented team.
                </li>
              </ul>

              <p>We do not just build websites; we build the most important employee your company will ever have.</p>
            </div>
          ) : (
            <>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                [Lorem ipsum placeholder text]
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                [Lorem ipsum placeholder text]
              </p>
            </>
          )}
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
      <section className="border-b border-[var(--border)] py-20 sm:py-24" aria-label="Services">
        <Container>
          <div className="mx-auto w-full max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Services</p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight text-[var(--foreground)] sm:text-5xl">What we offer</h1>
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[var(--muted)]/70 sm:text-sm">
              Use the toggle to switch between service details. Only one service panel is visible at a time.
            </p>

            <div
              role="tablist"
              aria-label="Service selection"
              className="mt-4 grid w-full grid-cols-1 gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 sm:grid-cols-2"
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
                  <ServicePanel serviceId={service.id} heading={service.heading} />
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

"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SERVICES_PAGE_SERVICE_QUERY } from "@/lib/services-page-deep-link";

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

const AUTOMATED_WORKFLOWS_VIDEO_SRC = "/services/automated-workflows-bg.mp4";

function ServicePanel({ serviceId, heading }: { serviceId: ServiceId; heading: string }) {
  const isWebDesign = serviceId === "web-design-development";
  const isAutomatedWorkflows = serviceId === "automated-workflows";

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
          ) : isAutomatedWorkflows ? (
            <div className="mt-5 space-y-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              <p className="text-xl font-medium leading-snug text-[var(--foreground)] sm:text-2xl">
                Elevate Your Operations with Agentic Intelligence
              </p>
              <p>
                In a world that never sleeps, manual processes aren&apos;t just slow—they&apos;re a bottleneck to your
                next level of growth. At WorkflowWonder, we don&apos;t just &quot;connect apps&quot;; we build digital
                ecosystems that think, adapt, and execute.
              </p>

              <h3 className="pt-2 text-xl font-medium text-[var(--foreground)]">Our Core Solutions</h3>

              <h4 className="pt-2 text-lg font-medium text-[var(--foreground)]">
                🤖 Agentic AI: The Future of Autonomy
              </h4>
              <p>
                Standard automation follows a straight line (If A, then B). Agentic AI follows a goal. Our agents are
                powered by advanced Large Language Models (LLMs) that act as &quot;Digital Employees.&quot;
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <span className="font-medium text-[var(--foreground)]">Reasoning capability:</span> They don&apos;t
                  just move data; they analyze it to decide the next best action.
                </li>
                <li>
                  <span className="font-medium text-[var(--foreground)]">Autonomous problem solving:</span> If a task
                  hits a snag, the agent pivots and finds a solution without pinging you for help.
                </li>
                <li>
                  <span className="font-medium text-[var(--foreground)]">Continuous learning:</span> These systems
                  refine their accuracy based on your feedback and historical data.
                </li>
              </ul>

              <h4 className="pt-2 text-lg font-medium text-[var(--foreground)]">
                ⚙️ Automated Workflows (iPaaS)
              </h4>
              <p>
                We eliminate the &quot;Copy-Paste Tax.&quot; By integrating your existing tech stack (Slack, CRM, Email,
                ERP), we create a seamless flow of information.
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <span className="font-medium text-[var(--foreground)]">24/7 execution:</span> Your business moves at
                  the speed of light, even when your team is offline.
                </li>
                <li>
                  <span className="font-medium text-[var(--foreground)]">Error elimination:</span> Remove the risk of
                  human fatigue and data entry mistakes.
                </li>
                <li>
                  <span className="font-medium text-[var(--foreground)]">Focus restoration:</span> Give your team their
                  creativity back by offloading the &quot;busy work.&quot;
                </li>
              </ul>

              <h4 className="pt-2 text-lg font-medium text-[var(--foreground)]">
                🛠️ Custom Workflows &amp; Private Engines
              </h4>
              <p>
                Your &quot;secret sauce&quot; is in your internal logic. We take your most complex, messy manual
                processes and codify them into a private, secure engine.
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <span className="font-medium text-[var(--foreground)]">Tailored logic:</span> Built specifically for
                  your unique business rhythm and proprietary rules.
                </li>
                <li>
                  <span className="font-medium text-[var(--foreground)]">Privacy first:</span> We prioritize secure data
                  handling to ensure your operational intelligence stays within your walls.
                </li>
                <li>
                  <span className="font-medium text-[var(--foreground)]">Scalability:</span> Systems designed to handle
                  10 tasks today and 10,000 tomorrow without breaking a sweat.
                </li>
              </ul>

              <h4 className="pt-2 text-lg font-medium text-[var(--foreground)]">
                📱 Intelligent Socials &amp; Engagement
              </h4>
              <p>Social media is a conversation, not a broadcast. We automate the noise so you can focus on the signal.</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <span className="font-medium text-[var(--foreground)]">Smart response:</span> Agents that can
                  distinguish between a support query, a lead, and a casual comment.
                </li>
                <li>
                  <span className="font-medium text-[var(--foreground)]">Content orchestration:</span> Automated
                  scheduling that adapts to engagement patterns.
                </li>
                <li>
                  <span className="font-medium text-[var(--foreground)]">Brand consistency:</span> Maintaining your
                  unique voice across every platform, effortlessly.
                </li>
              </ul>

              <h3 className="pt-2 text-xl font-medium text-[var(--foreground)]">The Transformation Journey</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <span className="font-medium text-[var(--foreground)]">Audit:</span> We map your current &quot;manual
                  mess&quot; and identify high-impact automation opportunities.
                </li>
                <li>
                  <span className="font-medium text-[var(--foreground)]">Architect:</span> We design a custom agentic
                  framework that fits your specific tech stack.
                </li>
                <li>
                  <span className="font-medium text-[var(--foreground)]">Activate:</span> We deploy your autonomous
                  agents and workflows in a controlled environment.
                </li>
                <li>
                  <span className="font-medium text-[var(--foreground)]">Accelerate:</span> We monitor and optimize,
                  ensuring your digital workforce is delivering maximum ROI.
                </li>
              </ul>

              <blockquote className="border-l-2 border-[var(--accent)] pl-4 pt-2 text-[var(--foreground)]">
                &quot;The goal isn&apos;t to replace humans; it&apos;s to make humans unblockable.&quot;
              </blockquote>

              <p className="pt-2 font-medium text-[var(--foreground)]">
                Ready to build your tireless digital extension?
              </p>
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
          {isAutomatedWorkflows ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--background)] shadow-inner shadow-black/20">
              <video
                className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
                src={AUTOMATED_WORKFLOWS_VIDEO_SRC}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                aria-label="Automation and workflow visualization"
              />
              <div
                className="absolute inset-0 hidden flex-col items-center justify-center gap-2 bg-[var(--surface-elevated)] px-4 text-center text-sm text-[var(--muted)] motion-reduce:flex"
                role="img"
                aria-label="Video preview hidden when reduced motion is preferred"
              >
                <span className="font-medium text-[var(--foreground)]">Automated workflows</span>
                <span>Preview video is disabled when reduced motion is on.</span>
              </div>
            </div>
          ) : (
            <div className="flex min-h-52 items-center justify-center rounded-lg border border-dashed border-[var(--border-strong)] bg-[var(--background)]/35 p-6 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              Service image placeholder
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function ServicesPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeService = useMemo((): ServiceId => {
    const raw = searchParams.get(SERVICES_PAGE_SERVICE_QUERY);
    if (!raw) return services[0].id;
    const match = services.find((s) => s.id === raw);
    return match ? match.id : services[0].id;
  }, [searchParams]);

  const selectService = (id: ServiceId) => {
    const q = new URLSearchParams(searchParams.toString());
    q.set(SERVICES_PAGE_SERVICE_QUERY, id);
    const qs = q.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

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
                    onClick={() => selectService(service.id)}
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

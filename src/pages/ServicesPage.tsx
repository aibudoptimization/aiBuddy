import type { KeyboardEvent, ReactNode } from "react"
import { useCallback, useMemo, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getN8nFormUrl, getScheduleAuditUrl } from "@/lib/public-urls"
import {
  AUTOMATED_WORKFLOWS_TAB_ID,
  SERVICES_PAGE_BASE_PATH,
  SERVICES_PAGE_SERVICE_QUERY,
  serviceIdFromPathname,
  servicePathForTabId,
  WEB_DESIGN_DEVELOPMENT_TAB_ID,
} from "@/lib/services-routes"

const services = [
  {
    id: WEB_DESIGN_DEVELOPMENT_TAB_ID,
    label: "Web Design & Development",
    heading: "Web Design & Development",
  },
  {
    id: AUTOMATED_WORKFLOWS_TAB_ID,
    label: "Automated Workflows",
    heading: "Automated Workflows",
  },
] as const

type ServiceId = (typeof services)[number]["id"]

function ctaAnchorProps(href: string) {
  const external = /^https?:\/\//.test(href)
  return external
    ? ({ target: "_blank" as const, rel: "noopener noreferrer" as const })
    : {}
}

function ServiceAccordion({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <details
      id={id}
      className="group rounded-xl border border-white/10 bg-white/5 px-4 py-3 open:border-white/15 open:shadow-sm open:shadow-black/10"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <span
          aria-hidden
          className="text-xs text-muted-foreground transition-transform duration-200 group-open:rotate-180"
        >
          ▼
        </span>
      </summary>
      <div className="mt-3 space-y-3 border-t border-white/10 pt-3 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </details>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 text-xl font-medium text-foreground">{children}</h3>
}

function AtAGlance({
  who,
  deliverables,
  timeline,
}: {
  who: string
  deliverables: string
  timeline: string
}) {
  return (
    <dl className="mt-5 grid gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:grid-cols-3 sm:gap-6 sm:p-5">
      <div>
        <dt className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Who it&apos;s for</dt>
        <dd className="mt-1.5 text-sm leading-relaxed text-foreground sm:text-base">{who}</dd>
      </div>
      <div>
        <dt className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">What you get</dt>
        <dd className="mt-1.5 text-sm leading-relaxed text-foreground sm:text-base">{deliverables}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Typical timeline</dt>
        <dd className="mt-1.5 text-sm leading-relaxed text-foreground sm:text-base">{timeline}</dd>
      </div>
    </dl>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function FaqBlock({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <ServiceAccordion key={item.q} title={item.q}>
          <p>{item.a}</p>
        </ServiceAccordion>
      ))}
    </div>
  )
}

function WebDesignPanel({ heading }: { heading: string }) {
  const ctaHref = getN8nFormUrl()
  const anchor = ctaAnchorProps(ctaHref)

  return (
    <article className="glass rounded-2xl border border-white/10 bg-card/40 p-6 shadow-sm shadow-black/20 sm:p-8">
      <div>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{heading}</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Strategy, UX, UI, and production-grade engineering in one accountable team—so your site stays fast,
          maintainable, and aligned with how you actually sell.
        </p>

        <AtAGlance
          who="Teams launching or refreshing a marketing site, product surface, or CMS-backed experience."
          deliverables="UX direction, visual design, front-end build, CMS and integrations, launch hardening."
          timeline="Small sites often ship in a few weeks; larger builds run in phased milestones after discovery."
        />

        <div className="mt-6">
          <Button size="lg" nativeButton={false} render={<a href={ctaHref} {...anchor} />}>
            Get an estimate
          </Button>
        </div>

        <SectionTitle>What you get</SectionTitle>
        <BulletList
          items={[
            "A written plan with milestones you can track—not a vague “phase” deck.",
            "Design and code built together to avoid expensive rework between handoffs.",
            "SEO-aware structure, performance discipline, and documentation your team can operate.",
          ]}
        />

        <SectionTitle>How we work</SectionTitle>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Expand each stage for detail. On smaller engagements, we still follow the same sequence—just with a tighter
          footprint.
        </p>
        <div className="mt-4 space-y-3">
          <ServiceAccordion title="Strategy & visual identity" id="web-strategy">
            <p>Discovery on goals and audience, UI design aligned to your brand, and a clickable prototype before build.</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Discovery workshops and success metrics</li>
              <li>Interface design and design system cues</li>
              <li>Prototype for navigation and key flows</li>
            </ul>
          </ServiceAccordion>
          <ServiceAccordion title="Build & engineering" id="web-build">
            <p>Responsive front-end, secure CMS and integrations, and technical SEO foundations from day one.</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Fast, accessible UI across devices</li>
              <li>CMS, APIs, and business logic your operators can trust</li>
              <li>Structured data and crawl-friendly implementation where it matters</li>
            </ul>
          </ServiceAccordion>
          <ServiceAccordion title="Launch & optimization" id="web-launch">
            <p>QA, deployment, and ongoing care so launches stay stable—not “hands off at go-live.”</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Testing, performance checks, and launch checklist</li>
              <li>Hosting, TLS, and domain coordination</li>
              <li>Maintenance options for security and content velocity</li>
            </ul>
          </ServiceAccordion>
        </div>

        <SectionTitle>FAQ</SectionTitle>
        <FaqBlock
          items={[
            {
              q: "Do we own the CMS and content?",
              a: "Yes. You keep admin access, exports, and clear documentation. We avoid lock-in patterns and explain trade-offs before you commit to a platform.",
            },
            {
              q: "Can you integrate with our stack?",
              a: "We routinely connect sites to CRMs, analytics, booking tools, and internal APIs. We propose the smallest reliable integration path for your governance model.",
            },
            {
              q: "What if we only need design or only development?",
              a: "We still recommend a short alignment pass so specs match reality. If you already have designs or an engineering team, we can scope a focused engagement—tell us what you have in flight.",
            },
          ]}
        />

        <div className="mt-10 rounded-xl border border-white/15 bg-white/5 p-6">
          <p className="text-base font-medium text-foreground">Ready to scope your site?</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Share goals and constraints—we&apos;ll reply with a practical estimate or a short list of options.
          </p>
          <div className="mt-4">
            <Button size="lg" nativeButton={false} render={<a href={ctaHref} {...anchor} />}>
              Get an estimate
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

function AutomatedWorkflowsPanel({ heading }: { heading: string }) {
  const ctaHref = getScheduleAuditUrl()
  const anchor = ctaAnchorProps(ctaHref)

  return (
    <article className="glass rounded-2xl border border-white/10 bg-card/40 p-6 shadow-sm shadow-black/20 sm:p-8">
      <div>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{heading}</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Agent-assisted workflows and integrations that remove copy-paste tax—without sacrificing governance,
          observability, or human judgment where it matters.
        </p>

        <AtAGlance
          who="Operators drowning in manual handoffs between CRM, inbox, spreadsheets, and line-of-business tools."
          deliverables="Workflow audit, architecture, implementation, monitoring, and documentation for your team."
          timeline="Pilots can land quickly; program-scale automation is usually phased after we map risk and ROI."
        />

        <div className="mt-6">
          <Button size="lg" nativeButton={false} render={<a href={ctaHref} {...anchor} />}>
            Book an audit
          </Button>
        </div>

        <SectionTitle>What you get</SectionTitle>
        <BulletList
          items={[
            "Goal-driven automation: agents and workflows that handle exceptions with guardrails—not brittle if-this-then-that only.",
            "Stack-aware integration across the tools you already pay for (CRM, comms, ERP, data stores).",
            "Clear runbooks so your team can operate, extend, and audit what runs in production.",
          ]}
        />

        <SectionTitle>How we work</SectionTitle>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Core solution areas and the journey we take from messy manual work to measured automation.
        </p>
        <div className="mt-4 space-y-3">
          <ServiceAccordion title="Agentic AI & digital employees">
            <p>
              LLM-powered agents that pursue outcomes: triage, draft, classify, and escalate with policies you
              control.
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Reasoning over unstructured input—not just field mapping</li>
              <li>Fallback paths when confidence is low or policy blocks an action</li>
              <li>Feedback loops to improve accuracy over time</li>
            </ul>
          </ServiceAccordion>
          <ServiceAccordion title="Automated workflows (iPaaS)">
            <p>Reliable orchestration across SaaS APIs so data moves 24/7 without keyboard macros.</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Scheduled and event-driven runs with retries and alerting</li>
              <li>Reduced human error on high-volume repetitive steps</li>
              <li>More focus for creative and customer-facing work</li>
            </ul>
          </ServiceAccordion>
          <ServiceAccordion title="Custom workflows & private engines">
            <p>When your logic is proprietary, we encode it in a private, reviewable system—not a black box.</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Tailored rules for your operating rhythm</li>
              <li>Security-first handling of sensitive operational data</li>
              <li>Scaling from tens to thousands of tasks without re-architecture surprises</li>
            </ul>
          </ServiceAccordion>
          <ServiceAccordion title="Intelligent socials & engagement">
            <p>Automation that preserves brand voice while cutting noise—routing, drafts, and schedules you approve.</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Intent detection: support vs. lead vs. casual engagement</li>
              <li>Adaptive scheduling informed by engagement signals</li>
              <li>Consistent tone guardrails across channels</li>
            </ul>
          </ServiceAccordion>
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">Engagement path</p>
          <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <li>
              <span className="font-medium text-foreground">Audit:</span> map manual work and prioritize
              high-impact wins.
            </li>
            <li>
              <span className="font-medium text-foreground">Architect:</span> design agents and integrations
              for your stack and policies.
            </li>
            <li>
              <span className="font-medium text-foreground">Activate:</span> deploy in a controlled
              environment with observability.
            </li>
            <li>
              <span className="font-medium text-foreground">Accelerate:</span> monitor, tune, and expand
              based on measured ROI.
            </li>
          </ul>
        </div>

        <blockquote className="mt-6 border-l-2 border-primary pl-4 text-foreground">
          &quot;The goal isn&apos;t to replace humans; it&apos;s to make humans unblockable.&quot;
        </blockquote>

        <SectionTitle>FAQ</SectionTitle>
        <FaqBlock
          items={[
            {
              q: "How do you approach AI safety and governance?",
              a: "We start with data boundaries, human-in-the-loop steps for high-risk actions, logging, and kill switches. Scope and policies are documented before we widen autonomy.",
            },
            {
              q: "Will this work with our existing integrations?",
              a: "Usually yes—we prefer official APIs and supported connectors. We surface limitations early and propose staged rollouts when vendors or compliance add constraints.",
            },
            {
              q: "What does an audit include?",
              a: "A concise map of current manual flows, quick-win candidates, and a phased recommendation with effort/risk notes—so you can decide what to fund next.",
            },
          ]}
        />

        <div className="mt-10 rounded-xl border border-white/15 bg-white/5 p-6">
          <p className="text-base font-medium text-foreground">Want a second opinion on your automation roadmap?</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Book a short audit—we&apos;ll give candid feedback and next steps, even if we&apos;re not the right long-term
            partner.
          </p>
          <div className="mt-4">
            <Button size="lg" nativeButton={false} render={<a href={ctaHref} {...anchor} />}>
              Book an audit
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ServicesPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const activeService = useMemo((): ServiceId => {
    const fromPath = serviceIdFromPathname(location.pathname)
    if (fromPath) return fromPath
    const base = location.pathname.replace(/\/$/, "") || "/"
    if (base === SERVICES_PAGE_BASE_PATH) {
      const params = new URLSearchParams(location.search)
      const raw = params.get(SERVICES_PAGE_SERVICE_QUERY)
      if (raw) {
        const match = services.find((s) => s.id === raw)
        if (match) return match.id
      }
    }
    return services[0].id
  }, [location.pathname, location.search])

  const selectService = useCallback(
    (id: ServiceId) => {
      navigate(servicePathForTabId(id), { replace: true })
    },
    [navigate],
  )

  const focusTabIndex = useCallback((index: number) => {
    const el = tabRefs.current[index]
    if (el) queueMicrotask(() => el.focus())
  }, [])

  const onTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault()
        const dir = event.key === "ArrowRight" ? 1 : -1
        const next = (index + dir + services.length) % services.length
        selectService(services[next].id)
        focusTabIndex(next)
      } else if (event.key === "Home") {
        event.preventDefault()
        selectService(services[0].id)
        focusTabIndex(0)
      } else if (event.key === "End") {
        event.preventDefault()
        const last = services.length - 1
        selectService(services[last].id)
        focusTabIndex(last)
      }
    },
    [focusTabIndex, selectService],
  )

  return (
    <main id="main-content" className="flex-1">
      <section className="border-b border-white/5 px-4 py-20 sm:px-6 sm:py-24" aria-label="Services">
        <div className="mx-auto w-full max-w-4xl">
          <Badge variant="outline" className="border-white/10 bg-white/5">
            Services
          </Badge>
          <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            What we offer
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Pick a track—build a high-performing web experience, or automate the operational glue between your tools.
          </p>

          <div
            role="tablist"
            aria-label="Service selection"
            className="mt-8 grid w-full grid-cols-1 gap-3 rounded-xl border border-white/10 bg-white/5 p-2 sm:grid-cols-2"
          >
            {services.map((service, index) => {
              const selected = service.id === activeService
              const tabId = `${service.id}-tab`
              const panelId = `${service.id}-panel`

              return (
                <button
                  key={service.id}
                  ref={(el) => {
                    tabRefs.current[index] = el
                  }}
                  id={tabId}
                  type="button"
                  role="tab"
                  tabIndex={selected ? 0 : -1}
                  aria-selected={selected}
                  aria-controls={panelId}
                  onClick={() => selectService(service.id)}
                  onKeyDown={(e) => onTabKeyDown(e, index)}
                  className={[
                    "min-h-12 rounded-lg px-4 py-3 text-sm font-semibold tracking-wide transition-[background-color,color,border-color,box-shadow] motion-safe:duration-200 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    selected
                      ? "border border-primary bg-primary text-primary-foreground shadow-sm shadow-black/20"
                      : "border border-transparent bg-transparent text-foreground hover:border-white/10 hover:bg-white/5",
                  ].join(" ")}
                >
                  {service.label}
                </button>
              )
            })}
          </div>

          {services.map((service) => {
            const selected = service.id === activeService
            const tabId = `${service.id}-tab`
            const panelId = `${service.id}-panel`

            return (
              <div
                key={service.id}
                id={panelId}
                role="tabpanel"
                aria-labelledby={tabId}
                hidden={!selected}
                className="mt-8"
              >
                {selected ? (
                  service.id === WEB_DESIGN_DEVELOPMENT_TAB_ID ? (
                    <WebDesignPanel heading={service.heading} />
                  ) : (
                    <AutomatedWorkflowsPanel heading={service.heading} />
                  )
                ) : null}
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}

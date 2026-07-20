"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { PIPELINE_FLOWS, PIPELINE_UI } from "@/content/workflows";
import { WORKFLOW_ICONS, type WorkflowIconKey } from "@/lib/services/workflow-data";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const STEP_MS = 2400;

function StepIcon({ name, size = 20 }: { name: WorkflowIconKey; size?: number }) {
  const paths = WORKFLOW_ICONS[name] ?? [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      {paths.map((d) => (
        <path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

export function WorkflowPipeline({
  accent = "#4bfac8",
  accentAlt = "#8b7cff",
}: {
  accent?: string;
  accentAlt?: string;
}) {
  const { locale } = useLocale();
  const ui = PIPELINE_UI[locale];
  const rootRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const userPausedRef = useRef(false);
  const reduced = usePrefersReducedMotion();

  const [flowId, setFlowId] = useState(PIPELINE_FLOWS[0]!.id);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(true);

  const flow = PIPELINE_FLOWS.find((f) => f.id === flowId) ?? PIPELINE_FLOWS[0]!;
  const total = flow.steps.length;
  const active = flow.steps[Math.min(step, total - 1)]!;
  const isPlaying = playing && !reduced;
  const canAutoplay = isPlaying && inView;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!canAutoplay) return;
    const count = (PIPELINE_FLOWS.find((f) => f.id === flowId) ?? PIPELINE_FLOWS[0]!).steps
      .length;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % count);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [canAutoplay, flowId]);

  useEffect(() => {
    const root = tabsRef.current;
    if (!root) return;
    const activeTab = root.querySelector<HTMLElement>(".ww-pipeline__tab.is-active");
    activeTab?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [flowId]);

  useEffect(() => {
    const root = tabsRef.current;
    if (!root) return;

    const syncEdges = () => {
      const max = root.scrollWidth - root.clientWidth;
      const atStart = root.scrollLeft <= 2;
      const atEnd = max <= 2 || root.scrollLeft >= max - 2;
      root.classList.toggle("is-at-start", atStart);
      root.classList.toggle("is-at-end", atEnd);
    };

    syncEdges();
    root.addEventListener("scroll", syncEdges, { passive: true });
    window.addEventListener("resize", syncEdges);
    return () => {
      root.removeEventListener("scroll", syncEdges);
      window.removeEventListener("resize", syncEdges);
    };
  }, []);

  const goToFlow = (id: string) => {
    setFlowId(id);
    setStep(0);
    if (!reduced && !userPausedRef.current) setPlaying(true);
  };

  const goToStep = (i: number) => {
    setStep(i);
    userPausedRef.current = true;
    setPlaying(false);
  };

  return (
    <section
      ref={rootRef}
      className="ww-pipeline"
      style={
        {
          ["--pipe-a" as string]: accent,
          ["--pipe-b" as string]: accentAlt,
        } as CSSProperties
      }
      aria-label={ui.pick}
    >
      <div className="ww-pipeline__picker">
        <p className="ww-pipeline__picker-label ww-mono">{ui.pick}</p>
        <div className="ww-pipeline__tabs" role="tablist" ref={tabsRef}>
          {PIPELINE_FLOWS.map((f) => {
            const on = f.id === flowId;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={on}
                className={`ww-pipeline__tab${on ? " is-active" : ""}`}
                onClick={() => goToFlow(f.id)}
              >
                <span className="ww-mono ww-pipeline__tab-no">{f.no}</span>
                <span className="ww-pipeline__tab-title">{f.title[locale]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="ww-pipeline__stage">
        <header className="ww-pipeline__head">
          <div className="ww-pipeline__head-copy">
            <span className="ww-mono ww-pipeline__tag">{flow.tag[locale]}</span>
            <h2 className="ww-pipeline__title">{flow.title[locale]}</h2>
            <p className="ww-pipeline__blurb">{flow.blurb[locale]}</p>
          </div>
          <div className="ww-pipeline__controls">
            <button
              type="button"
              className="ww-pipeline__play"
              onClick={() => {
                setPlaying((p) => {
                  const next = !p;
                  userPausedRef.current = !next;
                  return next;
                });
              }}
              aria-label={isPlaying ? ui.pause : ui.play}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isPlaying ? ui.pause : ui.play}</span>
            </button>
            <span className="ww-mono ww-pipeline__counter">
              {ui.stepOf} {step + 1} {ui.of} {total}
            </span>
          </div>
        </header>

        <div className="ww-pipeline__steps" role="navigation" aria-label={ui.stepOf}>
          {flow.steps.map((s, i) => {
            const state = i < step ? "done" : i === step ? "active" : "idle";
            return (
              <div key={s.id} className={`ww-pipeline__step is-${state}`}>
                {i > 0 ? <span className="ww-pipeline__step-wire" aria-hidden /> : null}
                <button
                  type="button"
                  className="ww-pipeline__step-btn"
                  onClick={() => goToStep(i)}
                  aria-current={i === step ? "step" : undefined}
                  aria-label={`${ui.stepOf} ${i + 1}: ${s.label[locale]}`}
                >
                  <span className="ww-pipeline__step-dot" aria-hidden />
                  <span className="ww-mono ww-pipeline__step-no">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="ww-pipeline__track" role="list">
          {flow.steps.map((s, i) => {
            const state = i < step ? "done" : i === step ? "active" : "idle";
            return (
              <button
                key={s.id}
                type="button"
                role="listitem"
                className={`ww-pipeline__node ww-pipeline__node--${s.kind} is-${state}`}
                onClick={() => goToStep(i)}
                aria-current={i === step ? "step" : undefined}
              >
                {i > 0 ? <span className="ww-pipeline__connector" aria-hidden /> : null}
                <span className="ww-pipeline__node-badge">
                  <span className="ww-pipeline__node-index ww-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ww-pipeline__node-icon">
                    <StepIcon name={s.icon} />
                  </span>
                </span>
                <span className="ww-pipeline__node-kind ww-mono">{ui.kinds[s.kind]}</span>
                <span className="ww-pipeline__node-label">{s.label[locale]}</span>
              </button>
            );
          })}
        </div>

        <div className="ww-pipeline__detail" key={`${flow.id}-${active.id}`}>
          <div className="ww-pipeline__detail-icon">
            <StepIcon name={active.icon} size={26} />
          </div>
          <div>
            <p className="ww-mono ww-pipeline__detail-kind">{ui.kinds[active.kind]}</p>
            <h3 className="ww-pipeline__detail-title">{active.label[locale]}</h3>
            <p className="ww-pipeline__detail-body">{active.detail[locale]}</p>
          </div>
        </div>

        {flow.handoffs && flow.handoffs.length > 0 ? (
          <div className="ww-pipeline__handoffs">
            <p className="ww-mono ww-pipeline__handoffs-label">{ui.handoff}</p>
            <div className="ww-pipeline__handoffs-list">
              {flow.handoffs.map((h) => (
                <button
                  key={h.to}
                  type="button"
                  className="ww-pipeline__handoff"
                  onClick={() => goToFlow(h.to)}
                >
                  {h.label[locale]}
                  <span aria-hidden>→</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

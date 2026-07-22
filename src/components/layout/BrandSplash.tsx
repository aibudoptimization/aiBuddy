"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";

import { BrandMark } from "@/components/layout/BrandMark";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { drawGlobe, initGlobeRings } from "@/lib/canvas/globe";
import { INTRO_DONE_EVENT, INTRO_PENDING_ATTR, INTRO_SEEN_KEY } from "@/lib/introFlag";
import { langPrefApplied, markLangPrefApplied, readLangPref, saveLangPref } from "@/lib/langPref";
import { switchLocalePath, type Locale } from "@/lib/locale";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const STORAGE_KEY = INTRO_SEEN_KEY;
/** Set just before a cross-language choice navigates; the remounted splash on
 *  the target locale picks it up and only plays the final fade. */
const HANDOFF_KEY = "ww-splash-handoff";

function subscribeIntroDone(onChange: () => void) {
  window.addEventListener(INTRO_DONE_EVENT, onChange);
  return () => window.removeEventListener(INTRO_DONE_EVENT, onChange);
}

function introPending() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}

/** Orbit settle */
const PHASE_ORBIT_MS = 1100;
/** Collapse rings into the core */
const PHASE_COLLAPSE_MS = 700;
/** Logo settles after the core becomes the mark dot */
const PHASE_MARK_MS = 650;
/** Brief hold on the mark */
const PHASE_HOLD_MS = 480;
const TOTAL_MS = PHASE_ORBIT_MS + PHASE_COLLAPSE_MS + PHASE_MARK_MS + PHASE_HOLD_MS;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * First-visit brand intro:
 * roomy globe orbits → collapses into the glow-dot → Workflow · Wonder settles in.
 * First visit ever also asks Français / English; the choice is persisted and
 * auto-applied on later sessions (splash then plays through without buttons).
 */
export function BrandSplash() {
  const { dict, locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  // Visible until the intro has been seen this session; the INTRO_DONE_EVENT
  // dispatched by finish() re-reads the flag and hides the splash.
  const visible = useSyncExternalStore(subscribeIntroDone, introPending, () => false);
  const reduced = usePrefersReducedMotion();
  // Cross-language choice remounts this component (each locale has its own
  // layout tree); the handoff flag makes the new instance resume at the
  // settled logo instead of replaying the whole intro.
  const [handoff] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(HANDOFF_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [phase, setPhase] = useState<"orbit" | "collapse" | "mark" | "choose" | "out">(
    handoff ? "mark" : "orbit",
  );
  // Read once; null = no stored preference yet → the splash asks.
  const [pref] = useState<Locale | null>(() =>
    typeof window === "undefined" ? null : readLangPref(),
  );
  // Cross-language choice in flight: hold the splash opaque until the new
  // locale has mounted, so the old language never flashes through the fade.
  const [pendingNav, setPendingNav] = useState<Locale | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rings = useRef(initGlobeRings());
  const startRef = useRef(0);
  const doneRef = useRef(false);
  const sizeRef = useRef(480);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase("out");
    window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    }, 480);
  };

  // The pre-paint curtain (see app/layout.tsx) covered the page until we
  // hydrated. Drop it only once the splash is committed to the DOM (visible
  // flips true post-hydration), so there is never a frame with neither.
  // If the intro was already seen, the inline script never set the attribute.
  useEffect(() => {
    if (visible) {
      document.documentElement.removeAttribute(INTRO_PENDING_ATTR);
    }
  }, [visible]);

  // Lock page scroll while the splash owns the screen, so an accidental
  // scroll during the language choice can't move the page underneath.
  useEffect(() => {
    if (!visible) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [visible]);

  // Returning visitor with a stored preference: land them on their language.
  // Only on the session's first load (the splash covers the swap), never
  // against in-session navigation.
  useEffect(() => {
    if (!visible || !pref) return;
    if (langPrefApplied()) return;
    markLangPrefApplied();
    if (pref !== locale) {
      router.replace(switchLocalePath(pathname, pref));
    }
    // Intentionally not reactive to locale/pathname: this is a once-per-session gate.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, pref]);

  const chooseLang = (target: Locale) => {
    saveLangPref(target);
    // Guarantee the reveal starts on the hero, whatever happened underneath.
    window.scrollTo(0, 0);
    if (target !== locale) {
      try {
        sessionStorage.setItem(HANDOFF_KEY, "1");
      } catch {
        /* ignore */
      }
      setPendingNav(target);
      router.push(switchLocalePath(pathname, target));
      return; // the remounted splash on the target locale plays the fade
    }
    finish();
  };

  useEffect(() => {
    if (!pendingNav) return;
    if (locale === pendingNav) {
      finish();
      return;
    }
    // Failsafe: never strand the visitor behind the splash.
    const t = window.setTimeout(finish, 2500);
    return () => window.clearTimeout(t);
  }, [pendingNav, locale]);

  useEffect(() => {
    if (!visible) return;

    // Remounted after a cross-language choice: just hold the logo a beat,
    // then fade out over the already-mounted target page.
    if (handoff) {
      try {
        sessionStorage.removeItem(HANDOFF_KEY);
      } catch {
        /* ignore */
      }
      const t = window.setTimeout(finish, 420);
      return () => window.clearTimeout(t);
    }

    // No stored preference: the splash holds on the language choice instead
    // of auto-finishing.
    if (reduced) {
      const t = window.setTimeout(pref ? finish : () => setPhase("choose"), 420);
      return () => window.clearTimeout(t);
    }

    // Timers only ever advance the phase; skip can jump ahead of them.
    const tCollapse = window.setTimeout(
      () => setPhase((p) => (p === "orbit" ? "collapse" : p)),
      PHASE_ORBIT_MS,
    );
    const tMark = window.setTimeout(
      () => setPhase((p) => (p === "orbit" || p === "collapse" ? "mark" : p)),
      PHASE_ORBIT_MS + PHASE_COLLAPSE_MS * 0.55,
    );
    const tDone = pref
      ? window.setTimeout(finish, TOTAL_MS)
      : window.setTimeout(
          () => setPhase((p) => (p === "out" ? p : "choose")),
          PHASE_ORBIT_MS + PHASE_COLLAPSE_MS + PHASE_MARK_MS,
        );
    return () => {
      window.clearTimeout(tCollapse);
      window.clearTimeout(tMark);
      window.clearTimeout(tDone);
    };
  }, [visible, reduced, pref, handoff]);

  // Single RAF loop for the whole intro — do not restart on phase changes.
  useEffect(() => {
    if (!visible || reduced || handoff) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const side = Math.min(window.innerWidth * 0.92, window.innerHeight * 0.72, 560);
      sizeRef.current = side;
      canvas.width = side * dpr;
      canvas.height = side * dpr;
      canvas.style.width = `${side}px`;
      canvas.style.height = `${side}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    rings.current = initGlobeRings();
    // Slightly faster orbit for presence
    for (const ring of rings.current) {
      ring.spd *= 1.35;
    }

    startRef.current = performance.now();
    let raf = 0;

    const loop = (now: number) => {
      const elapsed = now - startRef.current;
      const side = sizeRef.current;

      let radiusFactor = 0.42;
      let intensity = 1;
      let coreScale = 1;
      let alpha = 1;
      let canvasScale = 1;

      if (elapsed > PHASE_ORBIT_MS) {
        const raw = Math.min(1, (elapsed - PHASE_ORBIT_MS) / PHASE_COLLAPSE_MS);
        const p = easeInOutCubic(raw);
        // Rings pull in; core brightens then hands off to the logo dot
        radiusFactor = 0.42 - p * 0.36;
        intensity = 1 + p * 0.55;
        coreScale = 1 + p * 1.8;
        canvasScale = 1 - p * 0.12;
        if (p > 0.72) {
          alpha = 1 - easeInOutCubic((p - 0.72) / 0.28);
        }
      }

      ctx.save();
      ctx.clearRect(0, 0, side, side);
      ctx.translate(side / 2, side / 2);
      ctx.scale(canvasScale, canvasScale);
      ctx.translate(-side / 2, -side / 2);
      ctx.globalAlpha = Math.max(0, alpha);
      drawGlobe(ctx, side, side, "75,250,200", "139,124,255", rings.current, now, {
        radiusFactor,
        intensity,
        coreScale,
      });
      ctx.restore();

      if (elapsed < TOTAL_MS + 200) {
        raf = requestAnimationFrame(loop);
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [visible, reduced, handoff]);

  if (!visible) return null;

  // With reduced motion, skip straight to the settled mark without animating phases.
  const effectivePhase = reduced && phase === "orbit" ? "mark" : phase;
  const showMark =
    effectivePhase === "mark" || effectivePhase === "choose" || effectivePhase === "out";
  const collapsing = effectivePhase !== "orbit";
  const choosing = effectivePhase === "choose";

  return (
    <div
      className={`ww-splash${effectivePhase === "out" ? " ww-splash--out" : ""}${collapsing ? " ww-splash--collapse" : ""}${handoff ? " ww-splash--handoff" : ""}`}
      role="dialog"
      aria-label={dict.splash.ariaLabel}
      aria-modal="true"
    >
      <div className="ww-splash__veil" aria-hidden />
      <div className="ww-splash__stage">
        <canvas
          ref={canvasRef}
          className={`ww-splash__globe${showMark ? " ww-splash__globe--handoff" : ""}`}
          aria-hidden
        />
        <div className={`ww-splash__mark${showMark ? " is-in" : ""}`}>
          <BrandMark asLink={false} size="lg" />
        </div>
      </div>
      {!pref && (
        <div className={`ww-splash__lang${choosing ? " is-in" : ""}`} aria-hidden={!choosing}>
          <span className="ww-splash__lang-prompt ww-mono">{dict.splash.choose}</span>
          <div className="ww-splash__lang-buttons">
            <button
              type="button"
              lang="fr"
              className="ww-splash__lang-btn"
              onClick={() => chooseLang("fr")}
              tabIndex={choosing ? 0 : -1}
            >
              Français
            </button>
            <button
              type="button"
              lang="en"
              className="ww-splash__lang-btn"
              onClick={() => chooseLang("en")}
              tabIndex={choosing ? 0 : -1}
            >
              English
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

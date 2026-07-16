"use client";

import { useEffect, useRef, type ReactNode } from "react";

type TextRevealProps = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  id?: string;
  /** Stagger delay between words in ms */
  staggerMs?: number;
};

/**
 * Scroll-triggered word-by-word reveal for headlines.
 */
export function TextReveal({
  children,
  className = "",
  as: Tag = "h2",
  id,
  staggerMs = 38,
}: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const words = children.split(/(\s+)/).filter((w) => w.length > 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      id={id}
      className={`ww-text-reveal${className ? ` ${className}` : ""}`}
    >
      {words.map((word, i) =>
        /^\s+$/.test(word) ? (
          <span key={`s-${i}`}>{word}</span>
        ) : (
          <span key={`${word}-${i}`} className="ww-text-reveal__word-wrap">
            <span
              className="ww-text-reveal__word"
              style={{ transitionDelay: `${i * staggerMs}ms` }}
            >
              {word}
            </span>
          </span>
        ),
      )}
    </Tag>
  );
}

type LineRevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export function LineReveal({ children, className = "", delayMs = 0 }: LineRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ww-line-reveal${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: delayMs ? `${delayMs}ms` : undefined }}
    >
      {children}
    </div>
  );
}

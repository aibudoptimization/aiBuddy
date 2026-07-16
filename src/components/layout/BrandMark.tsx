"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/LocaleProvider";

type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
};

const SIZE = {
  sm: { fontSize: "16px", dot: 6, gap: 9 },
  md: { fontSize: "18px", dot: 7, gap: 9 },
  lg: { fontSize: "clamp(28px, 5vw, 42px)", dot: 10, gap: 14 },
} as const;

export function BrandMark({ size = "md", asLink = true }: BrandMarkProps) {
  const s = SIZE[size];
  const { routes } = useLocale();

  const mark = (
    <span
      className={`ww-brand-mark ww-brand-mark--${size}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
        fontSize: s.fontSize,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        color: "var(--snow)",
      }}
    >
      <span className="ww-brand-mark__word">Workflow</span>
      <span
        className="ww-glow-dot ww-brand-mark__dot"
        style={{ width: s.dot, height: s.dot }}
        aria-hidden
      />
      <span className="ww-brand-mark__word">Wonder</span>
    </span>
  );

  if (!asLink) return mark;

  return (
    <Link href={routes.home} style={{ textDecoration: "none" }}>
      {mark}
    </Link>
  );
}

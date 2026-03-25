"use client";

type BrandMarkProps = {
  compact?: boolean;
  className?: string;
};

export function BrandMark({ compact = false, className }: BrandMarkProps) {
  if (compact) {
    return (
      <span
        aria-label="WorkflowWonder compact mark"
        className={`inline-flex items-center rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-2 py-1 text-xs font-semibold tracking-[0.14em] text-[var(--foreground)] ${className ?? ""}`}
      >
        WW
      </span>
    );
  }

  return (
    <span
      aria-label="WorkflowWonder"
      className={`inline-flex items-center gap-2 text-[var(--foreground)] ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 48 20"
        aria-hidden
        className="h-5 w-12 shrink-0 text-[var(--foreground)]"
        fill="none"
      >
        <path
          d="M2 3L8 17L13 8L18 17L24 3"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 3L30 17L35 8L40 17L46 3"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight">WorkflowWonder</span>
    </span>
  );
}

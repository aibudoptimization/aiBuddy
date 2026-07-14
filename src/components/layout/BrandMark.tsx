import Link from "next/link";

type BrandMarkProps = {
  size?: "sm" | "md";
  asLink?: boolean;
};

export function BrandMark({ size = "md", asLink = true }: BrandMarkProps) {
  const fontSize = size === "sm" ? "16px" : "18px";
  const dotSize = size === "sm" ? 6 : 7;

  const mark = (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        fontSize,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        color: "var(--snow)",
      }}
    >
      <span>Workflow</span>
      <span
        className="ww-glow-dot"
        style={{ width: dotSize, height: dotSize }}
        aria-hidden
      />
      <span>Wonder</span>
    </span>
  );

  if (!asLink) return mark;

  return (
    <Link href="/" style={{ textDecoration: "none" }}>
      {mark}
    </Link>
  );
}

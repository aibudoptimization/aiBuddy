import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

function isHashOrRelative(href: string) {
  return href.startsWith("#") || href.startsWith("/");
}

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  external: externalProp,
  onClick,
}: ButtonLinkProps) {
  const external =
    externalProp ??
    (!isHashOrRelative(href) || href.startsWith("mailto:"));

  const base =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold tracking-wide transition-[color,background-color,box-shadow] motion-safe:duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]";

  const styles: Record<Variant, string> = {
    primary:
      "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] shadow-sm shadow-black/20 hover:shadow-md hover:shadow-black/30",
    secondary:
      "border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-elevated)] hover:shadow-sm hover:shadow-black/15",
    ghost: "text-[var(--foreground)] hover:bg-white/5",
  };

  const cn = `${base} ${styles[variant]} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        className={cn}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn} onClick={onClick}>
      {children}
    </Link>
  );
}

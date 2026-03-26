import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

export const smartLinkClassName =
  "text-[var(--foreground)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]";

type SmartLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function SmartLink({ href, children, className = "", onClick }: SmartLinkProps) {
  const cn = `${smartLinkClassName} ${className}`.trim();

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cn}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
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

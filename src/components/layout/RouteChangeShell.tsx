"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

type RouteChangeShellProps = {
  children: ReactNode;
};

export function RouteChangeShell({ children }: RouteChangeShellProps) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div key={pathname} className="ww-route-enter">
      {children}
    </div>
  );
}

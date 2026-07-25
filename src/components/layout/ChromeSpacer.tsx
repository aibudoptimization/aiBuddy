"use client";

import { useEffect, useRef } from "react";

/**
 * Reserves exactly the height of the fixed site chrome. The header's height
 * varies by page (article pages swap the nav for a back link) and by
 * breakpoint, so a hardcoded value always left dead space somewhere. This
 * measures the real element and publishes it as --ww-chrome-h, which also
 * feeds the article TOC's sticky offset and the mobile drawer inset.
 */
export function ChromeSpacer({ chromeRef }: { chromeRef: React.RefObject<HTMLDivElement | null> }) {
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chrome = chromeRef.current;
    if (!chrome) return;
    const sync = () => {
      const h = Math.round(chrome.getBoundingClientRect().height);
      if (h > 0) document.documentElement.style.setProperty("--ww-chrome-h", `${h}px`);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(chrome);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--ww-chrome-h");
    };
  }, [chromeRef]);

  return <div ref={spacerRef} className="ww-site-chrome-spacer" aria-hidden />;
}

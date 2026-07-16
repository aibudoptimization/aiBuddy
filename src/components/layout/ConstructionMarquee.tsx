"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";

export function ConstructionMarquee() {
  const { dict } = useLocale();
  const text = dict.chrome.marquee.join(" · ");

  return (
    <div className="ww-construction-banner" role="status" aria-label={text}>
      <div className="ww-construction-banner__inner">
        <div className="ww-construction-banner__track" aria-hidden>
          <span className="ww-construction-banner__segment">{text} · </span>
          <span className="ww-construction-banner__segment">{text} · </span>
        </div>
      </div>
    </div>
  );
}

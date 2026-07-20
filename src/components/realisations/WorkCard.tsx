"use client";

import { ArrowUpRight } from "lucide-react";

import type { WorkEntry } from "@/content/i18n/types";

type WorkCardProps = {
  work: WorkEntry;
  accent?: string;
};

/** Live-project card: stylized browser mockup with the real domain, linking to the live site. */
export function WorkCard({ work, accent = "#f0a94e" }: WorkCardProps) {
  return (
    <a
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      className="ww-work-card"
      style={{ ["--work-accent" as string]: accent }}
    >
      <div className="ww-work-card__browser" aria-hidden>
        <div className="ww-work-card__chrome">
          <span className="ww-work-card__dots">
            <span />
            <span />
            <span />
          </span>
          <span className="ww-work-card__url ww-mono">{work.title}</span>
        </div>
        <div className="ww-work-card__screen">
          <span className="ww-work-card__bar ww-work-card__bar--title" />
          <span className="ww-work-card__bar ww-work-card__bar--sub" />
          <span className="ww-work-card__pill" />
          <div className="ww-work-card__row">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="ww-work-card__body">
        <span className="ww-mono ww-work-card__tag">{work.tag}</span>
        <h3 className="ww-work-card__title">{work.client}</h3>
        <p className="ww-work-card__desc">{work.desc}</p>
        <span className="ww-work-card__cta">
          {work.urlLabel}
          <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden />
        </span>
      </div>
    </a>
  );
}

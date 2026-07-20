"use client";

import type { CookieCategoryCopy } from "@/content/i18n/types";

type CookieCategoriesTableProps = {
  categories: CookieCategoryCopy[];
  alwaysOnLabel: string;
  /** Modal use: shows a real switch for "analytics" and reflects live state. Off (default): read-only, as embedded in the privacy policy. */
  interactive?: boolean;
  analyticsEnabled?: boolean;
  onToggleAnalytics?: (value: boolean) => void;
};

export function CookieCategoriesTable({
  categories,
  alwaysOnLabel,
  interactive = false,
  analyticsEnabled = false,
  onToggleAnalytics,
}: CookieCategoriesTableProps) {
  return (
    <div className="ww-cookie-categories">
      {categories.map((category) => {
        const isNecessary = category.id === "necessary";

        return (
          <div key={category.id} className="ww-cookie-category">
            <div className="ww-cookie-category__head">
              <h3 className="ww-cookie-category__title">{category.title}</h3>
              {isNecessary ? (
                <span className="ww-cookie-category__pill" data-on="true">
                  {alwaysOnLabel}
                </span>
              ) : interactive ? (
                <button
                  type="button"
                  role="switch"
                  aria-checked={analyticsEnabled}
                  aria-label={category.title}
                  className="ww-switch"
                  data-on={analyticsEnabled}
                  onClick={() => onToggleAnalytics?.(!analyticsEnabled)}
                >
                  <span className="ww-switch__knob" aria-hidden />
                </button>
              ) : null}
            </div>

            <p className="ww-cookie-category__desc">{category.description}</p>

            {category.entries.length > 0 ? (
              <ul className="ww-cookie-entries">
                {category.entries.map((entry) => (
                  <li key={entry.label} className="ww-cookie-entry">
                    <div className="ww-cookie-entry__head">
                      <span className="ww-cookie-entry__label">{entry.label}</span>
                      <span className="ww-cookie-entry__duration">{entry.duration}</span>
                    </div>
                    <p className="ww-cookie-entry__purpose">{entry.purpose}</p>
                  </li>
                ))}
              </ul>
            ) : category.emptyNote ? (
              <p className="ww-cookie-category__empty">{category.emptyNote}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

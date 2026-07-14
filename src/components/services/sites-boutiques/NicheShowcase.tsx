"use client";

import Link from "next/link";
import { useState } from "react";

import { hexToRgb } from "@/lib/accents";

import { SiteIcon } from "./build-parts";
import { PANELS } from "./data";

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function NicheShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section className="ww-sites-niche">
      <div className="ww-sites-niche__header">
        <div className="ww-sites-niche__eyebrow ww-mono">
          <span className="ww-glow-dot" style={{ width: 7, height: 7, background: "var(--amber)", boxShadow: "0 0 9px rgba(240,169,78,0.7)" }} aria-hidden />
          Démos · prototypes
        </div>
        <span className="ww-sites-niche__hint ww-mono">Survolez pour explorer</span>
      </div>

      <h2 className="ww-sites-niche__title">Ce qu&apos;on peut bâtir pour vous.</h2>
      <p className="ww-sites-niche__lead">
        Voici des pistes par secteur. Votre projet n&apos;a pas à entrer dans une case : explorez et
        imaginez le vôtre.
      </p>

      <div className="ww-sites-panels">
        {PANELS.map((p, i) => {
          const on = i === active;
          const rgb = hexToRgb(p.color);
          return (
            <div
              key={p.name}
              className={`ww-sites-panel${on ? " ww-sites-panel--active" : ""}`}
              style={{
                flex: on ? "7 7 0" : "0.55 0.55 0",
                borderColor: on ? `rgba(${rgb},0.45)` : undefined,
                background: on
                  ? `linear-gradient(160deg, rgba(${rgb},0.14), rgba(13,12,16,0.55) 58%)`
                  : `linear-gradient(180deg, rgba(${rgb},0.05), rgba(255,255,255,0.01))`,
              }}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActive(i);
              }}
            >
              <div className="ww-sites-panel__label" style={{ opacity: on ? 0 : 1 }}>
                <span
                  className="ww-sites-panel__label-dot"
                  style={{ background: p.color, boxShadow: `0 0 10px rgba(${rgb},0.8)` }}
                  aria-hidden
                />
                <span className="ww-sites-panel__label-text">{p.name}</span>
                <span className="ww-sites-panel__num ww-mono">{String(i + 1).padStart(2, "0")}</span>
              </div>

              <div
                className="ww-sites-panel__content"
                style={{
                  opacity: on ? 1 : 0,
                  pointerEvents: on ? "auto" : "none",
                }}
              >
                <div className="ww-sites-panel__intro">
                  <span
                    className="ww-sites-panel__icon-wrap"
                    style={{
                      background: `rgba(${rgb},0.14)`,
                      color: p.color,
                      borderColor: `rgba(${rgb},0.3)`,
                    }}
                  >
                    <SiteIcon icon={p.icon} />
                  </span>
                  <div>
                    <span className="ww-sites-panel__tag ww-mono" style={{ color: p.color }}>
                      {p.tag}
                    </span>
                    <span className="ww-sites-panel__name">{p.name}</span>
                  </div>
                </div>

                {p.preview ? (
                  <Link
                    href={p.demoHref}
                    className="ww-sites-panel__mock ww-sites-panel__mock--video"
                    target={isExternal(p.demoHref) ? "_blank" : undefined}
                    rel={isExternal(p.demoHref) ? "noopener noreferrer" : undefined}
                  >
                    <video
                      className="ww-sites-panel__mock-video"
                      src={p.preview}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                  </Link>
                ) : (
                  <Link
                    href={p.demoHref}
                    className="ww-sites-panel__mock"
                    style={{ pointerEvents: p.demoHref === "#" ? "none" : undefined }}
                  >
                    <div className="ww-sites-panel__mock-chrome">
                      <span aria-hidden />
                      <span aria-hidden />
                      <span aria-hidden />
                      <span className="ww-mono">{p.domain}</span>
                    </div>
                    <div
                      className="ww-sites-panel__mock-inner"
                      style={{
                        borderColor: `rgba(${rgb},0.28)`,
                        background: `radial-gradient(circle at 50% 40%, rgba(${rgb},0.06), rgba(7,7,11,0) 70%)`,
                      }}
                    >
                      <span style={{ color: `rgba(${rgb},0.7)`, display: "inline-flex" }}>
                        <SiteIcon icon={p.icon} size={34} />
                      </span>
                      <span className="ww-mono ww-sites-panel__mock-label">Aperçu du prototype</span>
                      <span className="ww-sites-panel__mock-note">Image à venir</span>
                    </div>
                  </Link>
                )}

                <div className="ww-sites-panel__foot">
                  <span className="ww-sites-panel__desc">{p.desc}</span>
                  <Link
                    href={p.demoHref}
                    className="ww-sites-panel__link"
                    style={{ color: p.color, pointerEvents: p.demoHref === "#" ? "none" : undefined }}
                    target={isExternal(p.demoHref) ? "_blank" : undefined}
                    rel={isExternal(p.demoHref) ? "noopener noreferrer" : undefined}
                  >
                    Voir la démo <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

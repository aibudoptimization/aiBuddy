import Link from "next/link";
import { MapPin } from "lucide-react";

import { HOME_CITY } from "@/content/home";
import { ROUTES } from "@/lib/routes";

export function HomeHero() {
  return (
    <main
      style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        boxSizing: "border-box",
        padding:
          "clamp(122px, 14vh, 156px) clamp(28px, 5vw, 72px) clamp(56px, 8vh, 90px)",
        maxWidth: 980,
      }}
    >
      <div style={{ overflow: "hidden", marginBottom: 26 }}>
        <div
          className="ww-mono ww-fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: "12.5px",
            letterSpacing: "0.22em",
            color: "var(--mist)",
            animationDelay: "0.05s",
          }}
        >
          <span className="ww-glow-dot" style={{ width: 7, height: 7 }} aria-hidden />
          Automatisation IA
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <MapPin size={10} strokeWidth={2.2} aria-hidden />
            {HOME_CITY}, QC
          </span>
        </div>
      </div>

      <h1
        style={{
          margin: 0,
          fontWeight: 600,
          letterSpacing: "-0.035em",
          lineHeight: 0.98,
          fontSize: "clamp(42px, 7vw, 98px)",
        }}
      >
        <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.04em" }}>
          <span className="ww-rise" style={{ display: "block", animationDelay: "0.12s" }}>
            Automatisez vos tâches,
          </span>
        </span>
        <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.04em" }}>
          <span className="ww-rise" style={{ display: "block", animationDelay: "0.26s" }}>
            développez votre <span className="ww-gradient-word">entreprise</span>.
          </span>
        </span>
      </h1>

      <p className="ww-fade-up" style={{ maxWidth: 540, margin: "30px 0 0", animationDelay: "0.5s" }}>
        Basé à <strong style={{ color: "var(--teal)", fontWeight: 600 }}>{HOME_CITY}</strong>, au
        service des entrepreneurs du Québec. Workflows automatisés et agents IA pour les
        entrepreneurs qui veulent libérer du temps, unifier leurs services et faire grandir leur
        activité.
      </p>

      <div className="ww-fade-up" style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 40, animationDelay: "0.64s" }}>
        <Link href={ROUTES.contact} className="ww-cta-fill">
          Démarrer un projet
        </Link>
        <Link href={ROUTES.journal} className="ww-cta-secondary">
          Voir nos réalisations
        </Link>
      </div>

      <div
        className="ww-fade-up ww-mono"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 28,
          marginTop: 54,
          fontSize: 12,
          color: "var(--faint)",
          animationDelay: "0.8s",
        }}
      >
        <span>Automatisation · Agents IA</span>
        <span>Gain de temps</span>
        <span>Croissance business</span>
      </div>
    </main>
  );
}

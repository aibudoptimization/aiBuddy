import { Check, X } from "lucide-react";

import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { AudienceCarousel } from "@/components/home/AudienceCarousel";
import { GlowBullet } from "@/components/home/GlowBullet";
import { FIT_FOR_YOU, NOT_FOR_YOU } from "@/content/home";

export function HomeAudienceSection() {
  return (
    <section
      id="approche"
      className="ww-container ww-section"
      style={{
        paddingTop: "clamp(40px, 7vh, 90px)",
        paddingBottom: "clamp(50px, 8vh, 100px)",
      }}
    >
      <div className="ww-section-header" style={{ marginBottom: 18 }}>
        <h2 className="ww-section-title">
          Pensé pour les entrepreneurs
          <br />
          prêts à passer à l&apos;échelle.
        </h2>
        <EyebrowCanvas text="POUR QUI ?" phase={0.28} />
      </div>
      <p className="ww-section-lead">
        Notre meilleur partenaire de travail : un solopreneur ou une petite équipe du Québec qui a
        déjà de la traction, et qui sent que le « tout-à-la-main » commence à freiner sa croissance.
      </p>

      <AudienceCarousel />

      <div className="ww-fit-grid">
        <div className="ww-fit-card ww-fit-card--yes">
          <div className="ww-fit-card__head">
            <span className="ww-fit-icon ww-fit-icon--yes">
              <Check size={13} strokeWidth={3} color="#07070b" />
            </span>
            <h3>C&apos;est fait pour vous</h3>
          </div>
          {FIT_FOR_YOU.map((line) => (
            <div key={line} className="ww-fit-line ww-fit-line--yes">
              <GlowBullet />
              <span>{line}</span>
            </div>
          ))}
        </div>
        <div className="ww-fit-card">
          <div className="ww-fit-card__head">
            <span className="ww-fit-icon">
              <X size={11} strokeWidth={3} color="rgba(244,243,247,0.4)" />
            </span>
            <h3 className="ww-fit-card__muted">Ce n&apos;est pas (encore) pour vous</h3>
          </div>
          {NOT_FOR_YOU.map((line) => (
            <div key={line} className="ww-fit-line ww-fit-line--no">
              <span className="ww-fit-dash" aria-hidden />
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

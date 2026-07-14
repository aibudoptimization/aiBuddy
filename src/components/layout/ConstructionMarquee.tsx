const MARQUEE_ITEMS = [
  "Site en construction",
  "Certaines sections sont encore en préparation",
  "Le formulaire de contact est actif",
  "Consultation gratuite · sans engagement",
] as const;

const MARQUEE_TEXT = MARQUEE_ITEMS.join(" · ");

export function ConstructionMarquee() {
  return (
    <div className="ww-construction-banner" role="status" aria-label={MARQUEE_TEXT}>
      <div className="ww-construction-banner__inner">
        <div className="ww-construction-banner__track" aria-hidden>
          <span className="ww-construction-banner__segment">{MARQUEE_TEXT} · </span>
          <span className="ww-construction-banner__segment">{MARQUEE_TEXT} · </span>
        </div>
      </div>
    </div>
  );
}

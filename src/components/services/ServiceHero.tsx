import Image from "next/image";

import { hexToRgb } from "@/lib/accents";

type ServiceHeroProps = {
  eyebrow: string;
  h1Before: string;
  h1Accent: string;
  h1After: string;
  lead: string;
  accent: string;
  /** When set, the hero text overlays this artwork on a bottom-left scrim. */
  image?: { src: string; alt: string };
};

function HeroCopy({ eyebrow, h1Before, h1Accent, h1After, lead, accent }: ServiceHeroProps) {
  return (
    <>
      <div className="ww-service-eyebrow-row">
        <div className="ww-service-eyebrow">
          <span
            className="ww-glow-dot"
            style={{
              width: 7,
              height: 7,
              background: accent,
              boxShadow: `0 0 9px rgba(${hexToRgb(accent)},0.7)`,
            }}
            aria-hidden
          />
          {eyebrow}
        </div>
      </div>
      <h1 className="ww-service-title">
        {h1Before}
        <span className="ww-accent-text">{h1Accent}</span>
        {h1After}
      </h1>
      <p className="ww-service-lead">{lead}</p>
    </>
  );
}

export function ServiceHero(props: ServiceHeroProps) {
  if (!props.image) {
    return <HeroCopy {...props} />;
  }

  return (
    <header className="ww-svc-hero">
      <Image
        src={props.image.src}
        alt={props.image.alt}
        fill
        priority
        sizes="(max-width: 1240px) 100vw, 1180px"
        className="ww-svc-hero__media"
      />
      <div className="ww-svc-hero__scrim" aria-hidden />
      <div className="ww-svc-hero__content">
        <HeroCopy {...props} />
      </div>
    </header>
  );
}

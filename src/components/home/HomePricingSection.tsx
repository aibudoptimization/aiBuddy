import Link from "next/link";

import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { GlowBullet } from "@/components/home/GlowBullet";
import { PAYMENT_NOTES, PRICING_ANCHORS, QUOTE_FACTORS } from "@/content/home";
import { ROUTES } from "@/lib/routes";

export function HomePricingSection() {
  return (
    <section
      id="tarifs"
      className="ww-container ww-section"
      style={{
        paddingTop: "clamp(40px, 7vh, 90px)",
        paddingBottom: "clamp(50px, 8vh, 100px)",
      }}
    >
      <div className="ww-section-header" style={{ marginBottom: 18 }}>
        <h2 className="ww-section-title">
          Combien ça coûte ?
          <br />
          Ça commence par une consultation. Gratuite.
        </h2>
        <EyebrowCanvas text="INVESTISSEMENT" phase={0.76} />
      </div>
      <p className="ww-section-lead" style={{ marginBottom: 30 }}>
        Chaque projet est unique, alors plutôt qu&apos;un prix tout fait, on part d&apos;une
        consultation gratuite pour comprendre vos besoins. Vous repartez avec un plan d&apos;action
        clair, et un devis détaillé sous 24&nbsp;h.{" "}
        <span style={{ color: "var(--teal)" }}>Sans engagement.</span>
      </p>

      <div style={{ marginBottom: 40 }}>
        <div className="ww-mono ww-pricing-label">Quelques repères, pour situer</div>
        <div className="ww-pricing-grid">
          {PRICING_ANCHORS.map((item) => (
            <div
              key={item.label}
              className={item.highlight ? "ww-price-card ww-price-card--highlight" : "ww-price-card"}
            >
              <span className="ww-price-card__label">{item.label}</span>
              <span className="ww-mono ww-price-card__note">{item.note}</span>
              <span className={`ww-price-card__price${item.highlight ? " ww-price-card__price--iris" : ""}`}>
                {item.price}
                {!item.highlight && item.price.includes("$") ? (
                  <small>CA</small>
                ) : null}
              </span>
            </div>
          ))}
        </div>
        <p className="ww-pricing-disclaimer">
          <strong>Ce sont des points de départ.</strong> Plus le projet est complexe et
          personnalisé, plus l&apos;investissement grandit, le prix exact, c&apos;est après la
          consultation gratuite.
        </p>
      </div>

      <div className="ww-consult-grid">
        <div className="ww-consult-card">
          <span className="ww-consult-badge">Consultation gratuite · sans engagement</span>
          <h3>Ce que vous obtenez</h3>
          <div className="ww-consult-list">
            {[
              "Un plan d'action clair & priorisé",
              "Des recommandations concrètes",
              "Un devis détaillé sous 24 h",
            ].map((line) => (
              <div key={line} className="ww-consult-list__item">
                <GlowBullet />
                {line}
              </div>
            ))}
          </div>
          <Link href={ROUTES.contact} className="ww-cta-solid">
            Réservez votre consultation gratuite <span>→</span>
          </Link>
        </div>
        <div className="ww-quote-card">
          <span className="ww-mono ww-quote-card__label">Ce qui fait varier votre devis</span>
          <div className="ww-quote-grid">
            {QUOTE_FACTORS.map((factor) => (
              <div key={factor} className="ww-quote-item">
                <GlowBullet />
                {factor}
              </div>
            ))}
          </div>
          <p className="ww-quote-note">
            <span>Bonne nouvelle :</span> plus vous avez déjà de matière, une marque, un site, des
            données, plus le projet est simple, et moins il coûte.{" "}
            <strong>Revamper un site existant revient moins cher que repartir de zéro.</strong>
          </p>
        </div>
      </div>

      <div className="ww-payment-grid">
        {PAYMENT_NOTES.map((note) => (
          <div key={note.no} className="ww-payment-note">
            <span>{note.no}</span>
            <div>
              <div className="ww-payment-note__title">{note.title}</div>
              <div className="ww-payment-note__desc">{note.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

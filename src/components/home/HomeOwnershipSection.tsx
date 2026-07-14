import { EyebrowCanvas } from "@/components/canvas/EyebrowCanvas";
import { OWNERSHIP_STEPS } from "@/content/home";

export function HomeOwnershipSection() {
  return (
    <section
      className="ww-container ww-section"
      style={{
        paddingTop: "clamp(40px, 7vh, 90px)",
        paddingBottom: "clamp(50px, 8vh, 100px)",
      }}
    >
      <div className="ww-section-header" style={{ marginBottom: 18 }}>
        <h2 className="ww-section-title">On bâtit. Vous possédez.</h2>
        <EyebrowCanvas text="PROPRIÉTÉ" phase={0.52} />
      </div>
      <p className="ww-section-lead" style={{ marginBottom: 52 }}>
        De la première ligne de code jusqu&apos;à la remise des clés, tout est pensé pour que vous
        restiez propriétaire, comme une maison qu&apos;on construit pour vous, sur votre terrain.
      </p>
      <div className="ww-ownership-grid">
        {OWNERSHIP_STEPS.map((step, i) => (
          <div key={step.no} className="ww-ownership-step">
            <div className="ww-ownership-step__line">
              <span>{step.no}</span>
              <span className={i === 3 ? "ww-ownership-step__bar--end" : undefined} />
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
      <div className="ww-ownership-footer">
        Zéro dépendance.{" "}
        <span>Votre système vous suit partout, avec ou sans nous.</span>
      </div>
    </section>
  );
}

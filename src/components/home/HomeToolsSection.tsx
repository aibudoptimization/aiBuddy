import { INTEGRATION_TOOLS } from "@/content/tools";

export function HomeToolsSection() {
  return (
    <section
      className="ww-container ww-section ww-section--center"
      style={{
        paddingTop: "clamp(30px, 6vh, 70px)",
        paddingBottom: "clamp(50px, 8vh, 90px)",
      }}
    >
      <h2 className="ww-tools-title">On se connecte à vos outils</h2>
      <div className="ww-tools-grid">
        {INTEGRATION_TOOLS.map((name) => (
          <span key={name} className="ww-tool-chip">
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

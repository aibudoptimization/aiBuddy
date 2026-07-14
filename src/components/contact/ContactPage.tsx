import { JournalPageAmbient } from "@/components/journal/JournalPageAmbient";
import { ContactForm } from "@/components/contact/ContactForm";
import { GlowBullet } from "@/components/home/GlowBullet";
import { CONTACT_COPY } from "@/content/contact";

export function ContactPage() {
  return (
    <div className="ww-journal-page">
      <JournalPageAmbient />

      <div className="ww-journal-page__content">
        <section
          className="ww-container ww-contact"
          style={{
            paddingTop: "clamp(104px, 13vh, 132px)",
            paddingBottom: "clamp(64px, 12vh, 120px)",
          }}
        >
          <div className="ww-contact__grid">
            <div className="ww-contact__intro">
              <div className="ww-contact__eyebrow ww-mono">
                <span className="ww-glow-dot" style={{ width: 6, height: 6 }} aria-hidden />
                {CONTACT_COPY.eyebrow}
              </div>
              <h1 className="ww-contact__title">{CONTACT_COPY.title}</h1>
              <p className="ww-contact__lead">{CONTACT_COPY.lead}</p>

              <div className="ww-contact__bullets">
                {CONTACT_COPY.bullets.map((line) => (
                  <div key={line} className="ww-contact__bullet">
                    <GlowBullet />
                    {line}
                  </div>
                ))}
              </div>

              <div className="ww-contact__email">
                <span className="ww-contact__email-label">{CONTACT_COPY.emailPrompt}</span>
                <a href={`mailto:${CONTACT_COPY.email}`} className="ww-contact__email-link">
                  {CONTACT_COPY.email}
                </a>
              </div>
            </div>

            <div className="ww-contact__panel">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import { JournalPageAmbient } from "@/components/journal/JournalPageAmbient";
import { CONTACT_EMAIL } from "@/lib/routes";
import { PRIVACY_LAST_UPDATED, RETENTION_MONTHS } from "@/content/contact";

export function PrivacyPolicyPage() {
  return (
    <div className="ww-journal-page">
      <JournalPageAmbient />

      <div className="ww-journal-page__content">
        <section
          className="ww-container"
          style={{
            maxWidth: 820,
            paddingTop: "clamp(104px, 13vh, 132px)",
            paddingBottom: "clamp(64px, 12vh, 120px)",
          }}
        >
          <div
            className="ww-mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: "12.5px",
              letterSpacing: "0.22em",
              color: "rgba(244,243,247,0.62)",
              marginBottom: 22,
            }}
          >
            <span className="ww-glow-dot" style={{ width: 6, height: 6 }} aria-hidden />
            Confidentialité
          </div>

          <h1
            style={{
              margin: 0,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              fontSize: "clamp(32px, 5vw, 56px)",
            }}
          >
            Politique de confidentialité
          </h1>
          <p
            className="ww-mono"
            style={{
              marginTop: 16,
              fontSize: 12,
              letterSpacing: "0.06em",
              color: "rgba(244,243,247,0.46)",
            }}
          >
            Dernière mise à jour&nbsp;: {PRIVACY_LAST_UPDATED}
          </p>

          <div className="ww-article-body" style={{ marginTop: 40 }}>
            <p>
              Workflow Wonder («&nbsp;nous&nbsp;») s&apos;engage à protéger les renseignements
              personnels que vous nous confiez. La présente politique explique quels renseignements
              nous recueillons, pourquoi, comment ils sont traités et quels sont vos droits,
              conformément à la <strong>Loi&nbsp;25</strong> (Loi modernisant des dispositions
              législatives en matière de protection des renseignements personnels) du Québec.
            </p>

            <h2>Responsable de la protection des renseignements personnels</h2>
            <p>
              Toute question relative à vos renseignements personnels ou à la présente politique
              peut être adressée à notre responsable de la protection des renseignements personnels
              à l&apos;adresse{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>

            <h2>Renseignements que nous recueillons</h2>
            <p>
              Lorsque vous remplissez notre formulaire de contact, nous recueillons uniquement les
              renseignements nécessaires au traitement de votre demande&nbsp;:
            </p>
            <ul>
              <li>
                <strong>Nom de l&apos;entreprise</strong> (obligatoire)
              </li>
              <li>
                <strong>Adresse courriel</strong> (obligatoire)
              </li>
              <li>
                <strong>Prénom et nom de famille</strong> (facultatifs)
              </li>
              <li>
                <strong>Le message</strong> que vous choisissez de nous transmettre (facultatif)
              </li>
            </ul>
            <p>
              Nous appliquons le principe de minimisation&nbsp;: nous ne demandons que ce qui est
              strictement nécessaire pour vous répondre.
            </p>

            <h2>Finalités de la collecte</h2>
            <p>Vos renseignements sont utilisés exclusivement pour&nbsp;:</p>
            <ul>
              <li>Vous envoyer un courriel de confirmation de la réception de votre demande&nbsp;;</li>
              <li>Communiquer avec vous et répondre à votre demande&nbsp;;</li>
              <li>Préparer, le cas échéant, une proposition ou un devis.</li>
            </ul>
            <p>
              Nous n&apos;utilisons pas vos renseignements à des fins de marketing sans votre
              consentement distinct et explicite, et nous ne les vendons ni ne les louons à des
              tiers.
            </p>

            <h2>Consentement</h2>
            <p>
              En cochant la case de consentement et en soumettant le formulaire, vous consentez à ce
              que nous recueillions et conservions vos renseignements aux fins décrites ci-dessus.
              Vous pouvez retirer votre consentement en tout temps en nous écrivant à{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>

            <h2>Communication à des tiers et hébergement</h2>
            <p>
              Le traitement de votre demande s&apos;appuie sur un prestataire d&apos;automatisation,{" "}
              <strong>n8n</strong>, dont l&apos;infrastructure infonuagique utilisée est située dans
              l&apos;<strong>Union européenne (Allemagne)</strong>. Cette juridiction est encadrée
              par le Règlement général sur la protection des données (RGPD), qui offre une protection
              comparable à celle exigée par la Loi&nbsp;25. Aucun autre transfert de vos
              renseignements n&apos;est effectué sans nécessité liée aux finalités décrites.
            </p>

            <h2>Durée de conservation</h2>
            <p>
              Nous conservons vos renseignements uniquement le temps nécessaire à la réalisation des
              finalités, soit un maximum de <strong>{RETENTION_MONTHS}&nbsp;mois</strong> à compter
              de votre dernière communication avec nous, après quoi ils sont supprimés de manière
              sécuritaire, à moins qu&apos;une relation d&apos;affaires ne soit établie et justifie
              une conservation additionnelle.
            </p>

            <h2>Vos droits</h2>
            <p>Conformément à la Loi&nbsp;25, vous avez le droit&nbsp;:</p>
            <ul>
              <li>D&apos;accéder aux renseignements personnels que nous détenons à votre sujet&nbsp;;</li>
              <li>De demander leur rectification s&apos;ils sont inexacts ou incomplets&nbsp;;</li>
              <li>De retirer votre consentement et de demander leur suppression&nbsp;;</li>
              <li>De porter plainte auprès de la Commission d&apos;accès à l&apos;information (CAI).</li>
            </ul>
            <p>
              Pour exercer l&apos;un de ces droits, écrivez-nous à{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>
                {CONTACT_EMAIL}
              </a>
              . Nous répondrons dans les délais prévus par la loi (au plus tard 30&nbsp;jours).
            </p>

            <h2>Sécurité</h2>
            <p>
              Les transmissions de données se font via des connexions chiffrées (HTTPS). Nous
              mettons en place des mesures de sécurité raisonnables pour protéger vos renseignements
              contre la perte, l&apos;accès non autorisé ou la divulgation. En cas d&apos;incident de
              confidentialité présentant un risque de préjudice sérieux, nous en aviserons la CAI et
              les personnes concernées, comme l&apos;exige la loi.
            </p>

            <h2>Témoins (cookies)</h2>
            <p>
              Notre site n&apos;utilise pas de témoins de suivi publicitaire. Seuls les témoins
              strictement nécessaires au bon fonctionnement du site peuvent être utilisés.
            </p>

            <h2>Modifications</h2>
            <p>
              Cette politique peut être mise à jour. La date de dernière mise à jour est indiquée en
              haut de la page. Nous vous invitons à la consulter périodiquement.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
  FileText,
  Mail,
  Send,
  UserRound,
  Users,
  X,
} from "lucide-react";

import type { ServiceRowIcon } from "@/content/i18n/types";

/**
 * Small stylized fragments of the thing being described — a rule as it looks
 * once written, a relance mid-run, a demand routing itself. They show the
 * artifact rather than diagramming the concept.
 *
 * Built from shared primitives so five panels stay consistent, and from HTML
 * rather than images so they reflow instead of shrinking on a phone.
 *
 * Every panel carries a `label` describing the state it is showing. It must
 * not restate the row heading beside it — that reads as an echo, not a caption.
 */

type RowState = "done" | "pending" | "deny";

function MockRow({
  label,
  value,
  icon,
  muted,
  state,
  wideLabel,
}: {
  label?: string;
  value: string;
  icon?: React.ReactNode;
  muted?: boolean;
  state?: RowState;
  /** For tool names, which don't fit the default label column. */
  wideLabel?: boolean;
}) {
  return (
    <div className={`ww-mock-row${muted ? " is-muted" : ""}`}>
      {label ? (
        <span className={`ww-mock-row__label ww-mono${wideLabel ? " is-wide" : ""}`}>
          {label}
        </span>
      ) : null}
      <span className="ww-mock-row__chip">
        {icon ? <span className="ww-mock-row__icon">{icon}</span> : null}
        {value}
      </span>
      {state ? (
        <span className={`ww-mock-row__state is-${state}`} aria-hidden>
          {state === "done" ? <Check size={11} strokeWidth={3} /> : null}
          {state === "deny" ? <X size={11} strokeWidth={3} /> : null}
        </span>
      ) : null}
    </div>
  );
}

/** A message, either from the client or drafted by the agent. */
function MockBubble({ from, children }: { from: "client" | "agent"; children: React.ReactNode }) {
  return <p className={`ww-mock-bubble is-${from}`}>{children}</p>;
}

function MockFoot({ children }: { children: React.ReactNode }) {
  return <div className="ww-mock-foot">{children}</div>;
}

/** Une règle telle qu'elle existe une fois écrite. */
function TriggerMock() {
  return (
    <>
      <MockRow label="Quand" value="Facture émise" icon={<FileText size={12} />} />
      <MockRow label="Si" value="Impayée après 7 jours" icon={<Clock size={12} />} />
      <MockRow label="Alors" value="Rappel au client" icon={<Mail size={12} />} />
      <MockFoot>
        <span className="ww-mock-pulse" aria-hidden />
        Règle active · 34 exécutions ce mois-ci
      </MockFoot>
    </>
  );
}

/**
 * Un scénario qui passe le relais au suivant. Stacked rather than inline so it
 * has the same three-row rhythm as its neighbours; a one-line chain left this
 * panel ~90px shorter than the rest and the alternation looked ragged.
 */
function SequenceMock() {
  return (
    <>
      <div className="ww-mock-chain">
        <span className="ww-mock-chain__node is-done">Devis accepté</span>
        <span className="ww-mock-chain__link" aria-hidden />
        <span className="ww-mock-chain__node is-done">Dossier créé</span>
        <span className="ww-mock-chain__link" aria-hidden />
        <span className="ww-mock-chain__node is-live">Accueil client</span>
      </div>
      <MockFoot>Chaque scénario démarre dès que le précédent se termine.</MockFoot>
    </>
  );
}

/** Une relance en cours, à mi-parcours. */
function FollowUpMock() {
  return (
    <>
      <MockRow label="J+7" value="Rappel envoyé" state="done" />
      <MockRow label="J+14" value="Relance envoyée" state="done" />
      <MockRow label="J+21" value="Alerte à vous" muted state="pending" />
      <MockFoot>L&apos;alerte part seulement si la facture est toujours impayée.</MockFoot>
    </>
  );
}

/** Un envoi segmenté, prêt à partir. */
function MailMock() {
  return (
    <>
      <div className="ww-mock-mail">
        <span className="ww-mock-mail__subject">Vos nouveautés du mois</span>
        <span className="ww-mock-mail__meta ww-mono">
          <Users size={11} /> Segment · clients actifs
        </span>
      </div>
      <MockRow label="Envoi" value="Mardi 9 h" icon={<Send size={12} />} />
      <MockFoot>
        <span className="ww-mock-pulse" aria-hidden />
        1 248 contacts · liste tenue à jour toute seule
      </MockFoot>
    </>
  );
}

/** Une demande entrante qui se classe elle-même. */
function RoutingMock() {
  return (
    <>
      <MockRow label="Entrée" value="nouvelle demande" icon={<Mail size={12} />} />
      <div className="ww-mock-split" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="ww-mock-dests">
        <span className="ww-mock-dest is-live">Ventes</span>
        <span className="ww-mock-dest">Support</span>
        <span className="ww-mock-dest">Comptabilité</span>
      </div>
      <MockFoot>
        <span className="ww-mock-pulse" aria-hidden />
        142 demandes triées cette semaine
      </MockFoot>
    </>
  );
}

/* —— Agents IA. Where the automatisation panels show fixed rails, these show
   judgment: reading intent, picking a tool, choosing words, refusing. —— */

/** Une demande floue, et ce que l'agent en comprend. */
function IntentMock() {
  return (
    <>
      <MockBubble from="client">
        Bonjour, je voudrais booker une visite pour le 4½ sur Papineau cette semaine
      </MockBubble>
      <MockRow label="Intention" value="Prise de rendez-vous" />
      <MockRow label="Extrait" value="4½ Papineau · cette semaine" />
      <MockFoot>Comprend votre vocabulaire, pas celui d&apos;un gabarit.</MockFoot>
    </>
  );
}

/** L'agent choisit ses outils, une étape à la fois. */
function ToolTraceMock() {
  return (
    <>
      <MockRow
        label="1"
        value="Calendrier · créneaux libres"
        icon={<CalendarCheck size={12} />}
        state="done"
      />
      <MockRow label="2" value="CRM · fiche mise à jour" icon={<UserRound size={12} />} state="done" />
      <MockRow label="3" value="Courriel · confirmation" icon={<Mail size={12} />} state="pending" />
      <MockFoot>
        <span className="ww-mock-pulse" aria-hidden />
        L&apos;agent choisit l&apos;outil selon la demande.
      </MockFoot>
    </>
  );
}

/** Une réponse rédigée dans votre voix. */
function ToneMock() {
  return (
    <>
      <MockBubble from="agent">
        Bonjour ! J&apos;ai deux visites libres jeudi, 14 h ou 17 h. Laquelle vous convient ?
      </MockBubble>
      <div className="ww-mock-tags">
        <span className="ww-mock-tag">Tutoiement</span>
        <span className="ww-mock-tag">Chaleureux</span>
        <span className="ww-mock-tag">Court</span>
      </div>
      {/* The copy promises a handover to a human; the panel should show it. */}
      <MockRow label="Sinon" value="Transfert à votre équipe" icon={<UserRound size={12} />} />
      <MockFoot>Relu selon vos règles de voix avant l&apos;envoi.</MockFoot>
    </>
  );
}

/** Ce que l'agent a le droit de faire, et où il s'arrête. */
function GuardrailMock() {
  return (
    <>
      <MockRow label="Autorisé" value="Répondre aux questions" state="done" />
      <MockRow label="Autorisé" value="Réserver un rendez-vous" state="done" />
      <MockRow label="Bloqué" value="Accorder un remboursement" muted state="deny" />
      <MockFoot>Les cas bloqués partent à un humain, et tout est journalisé.</MockFoot>
    </>
  );
}

/* —— Intégration. The story here is topology: two tools joined, and one record
   living in all of them at once rather than a copy per app. —— */

/** Deux outils reliés, avec l'état du lien. */
function MockLink({ from, to, state }: { from: string; to: string; state: string }) {
  return (
    <div className="ww-mock-link">
      <span className="ww-mock-link__end">{from}</span>
      <ArrowRight className="ww-mock-link__arrow" size={13} aria-hidden />
      <span className="ww-mock-link__end">{to}</span>
      <span className="ww-mock-link__state ww-mono">
        <span className="ww-mock-pulse" aria-hidden />
        {state}
      </span>
    </div>
  );
}

/** Les liens qui tournent en arrière-plan. */
function ConnectionsMock() {
  return (
    <>
      <MockLink from="Boutique" to="Comptabilité" state="actif" />
      <MockLink from="Formulaire" to="CRM" state="actif" />
      <MockLink from="Calendrier" to="Courriel" state="actif" />
      <MockFoot>
        <span className="ww-mock-code ww-mono">POST /commande.creee</span>
        200 · 180 ms
      </MockFoot>
    </>
  );
}

/** Une même fiche, la même valeur partout. */
function SyncMock() {
  return (
    <>
      {/* The same value repeated across three tools is the whole point; a
          separate "record" card above it just said it twice. */}
      <MockRow wideLabel label="CRM" value="marie@boutique.ca" state="done" />
      <MockRow wideLabel label="Boutique" value="marie@boutique.ca" state="done" />
      <MockRow wideLabel label="Comptabilité" value="marie@boutique.ca" state="done" />
      <MockFoot>
        <span className="ww-mock-pulse" aria-hidden />
        Corrigée une seule fois · propagée il y a 2 s
      </MockFoot>
    </>
  );
}

/** Un déménagement de données, une fois terminé. */
function MigrationMock() {
  return (
    <>
      <MockLink from="Ancien CRM" to="Nouveau CRM" state="terminé" />
      <div className="ww-mock-meter" aria-hidden>
        <span />
      </div>
      <MockRow wideLabel label="Transférées" value="4 812 fiches" state="done" />
      <MockRow wideLabel label="Doublons" value="Fusionnés, 0 restant" state="done" />
      <MockFoot>Aucune perte : chaque fiche est comptée avant et après.</MockFoot>
    </>
  );
}

/** Ce qu'on vous remet à la fin. */
function HandoverMock() {
  return (
    <>
      <MockRow wideLabel label="Comptes" value="Transférés à votre nom" state="done" />
      <MockRow wideLabel label="Code" value="Dépôt remis" state="done" />
      <MockRow wideLabel label="Schémas" value="Chaque flux documenté" state="done" />
      <MockFoot>
        <span className="ww-mock-pulse" aria-hidden />
        Propriétaire : votre entreprise
      </MockFoot>
    </>
  );
}

type Mock = { label: string; Body: () => React.ReactElement };

const MOCKS: Partial<Record<ServiceRowIcon, Mock>> = {
  split: { label: "Éditeur de règle", Body: TriggerMock },
  workflow: { label: "Enchaînement de scénarios", Body: SequenceMock },
  repeat: { label: "Relance en cours · facture #1042", Body: FollowUpMock },
  mail: { label: "Envoi programmé", Body: MailMock },
  route: { label: "Demande entrante", Body: RoutingMock },
  bot: { label: "Message reçu · interprétation", Body: IntentMock },
  plug: { label: "Trace d'exécution", Body: ToolTraceMock },
  penLine: { label: "Brouillon de réponse", Body: ToneMock },
  shieldCheck: { label: "Garde-fous actifs", Body: GuardrailMock },
  webhook: { label: "Liens en service", Body: ConnectionsMock },
  refreshCw: { label: "Fiche client · synchronisée", Body: SyncMock },
  database: { label: "Migration terminée", Body: MigrationMock },
  fileCheck: { label: "Dossier de remise", Body: HandoverMock },
};

export function hasMock(icon?: ServiceRowIcon) {
  return Boolean(icon && MOCKS[icon]);
}

export function mockLabel(icon?: ServiceRowIcon) {
  return icon ? (MOCKS[icon]?.label ?? "") : "";
}

export function ServiceMock({ icon }: { icon?: ServiceRowIcon }) {
  const mock = icon ? MOCKS[icon] : undefined;
  if (!mock) return null;
  const { Body } = mock;
  return <Body />;
}

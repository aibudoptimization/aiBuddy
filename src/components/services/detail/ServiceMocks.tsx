import { Check, Clock, FileText, Mail, Send, Users } from "lucide-react";

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

function MockRow({
  label,
  value,
  icon,
  muted,
  done,
}: {
  label?: string;
  value: string;
  icon?: React.ReactNode;
  muted?: boolean;
  done?: boolean;
}) {
  return (
    <div className={`ww-mock-row${muted ? " is-muted" : ""}`}>
      {label ? <span className="ww-mock-row__label ww-mono">{label}</span> : null}
      <span className="ww-mock-row__chip">
        {icon ? <span className="ww-mock-row__icon">{icon}</span> : null}
        {value}
      </span>
      {done !== undefined ? (
        <span className={`ww-mock-row__state${done ? " is-done" : ""}`} aria-hidden>
          {done ? <Check size={11} strokeWidth={3} /> : null}
        </span>
      ) : null}
    </div>
  );
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
      <MockRow label="J+7" value="Rappel envoyé" done />
      <MockRow label="J+14" value="Relance envoyée" done />
      <MockRow label="J+21" value="Alerte à vous" muted done={false} />
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

type Mock = { label: string; Body: () => React.ReactElement };

const MOCKS: Partial<Record<ServiceRowIcon, Mock>> = {
  split: { label: "Éditeur de règle", Body: TriggerMock },
  workflow: { label: "Enchaînement de scénarios", Body: SequenceMock },
  repeat: { label: "Relance en cours · facture #1042", Body: FollowUpMock },
  mail: { label: "Envoi programmé", Body: MailMock },
  route: { label: "Demande entrante", Body: RoutingMock },
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

import type { WorkflowIconKey } from "@/lib/services/workflow-data";

export type PipelineStepKind = "trigger" | "cond" | "action" | "branch";

export type PipelineStep = {
  id: string;
  kind: PipelineStepKind;
  icon: WorkflowIconKey;
  label: string;
  detail: string;
};

export type PipelineHandoff = {
  to: string;
  label: string;
};

export type PipelineFlow = {
  id: string;
  no: string;
  title: string;
  tag: string;
  blurb: string;
  steps: PipelineStep[];
  /** Soft links to related flows — replaces the old multi-lane map edges. */
  handoffs?: PipelineHandoff[];
};

export const PIPELINE_UI = {
  pick: "Choisissez un scénario",
  play: "Lancer",
  pause: "Pause",
  stepOf: "Étape",
  of: "sur",
  handoff: "Passe le relais",
  kinds: {
    trigger: "Déclencheur",
    cond: "Condition",
    action: "Action",
    branch: "Branche",
  } as Record<PipelineStepKind, string>,
} as const;

/**
 * Curated SME journey for Québec entrepreneurs.
 * Order tells one story: intake → sell → show up → get paid → ask for proof.
 * Handoffs restore the “relay” narrative without a dense map.
 */
export const PIPELINE_FLOWS: PipelineFlow[] = [
  {
    id: "intake",
    no: "01",
    title: "Entrée & triage",
    tag: "Acquisition",
    blurb:
      "Un lead arrive, la fiche se complète, une règle le classe. Chaud ou froid, la suite part toute seule.",
    handoffs: [
      { to: "hot", label: "Lead chaud → RDV" },
      { to: "nurture", label: "Lead froid → relance" },
    ],
    steps: [
      {
        id: "i1",
        kind: "trigger",
        icon: "lead",
        label: "Nouveau lead",
        detail:
          "Formulaire, courriel ou pub Meta. Le workflow démarre sans que vous cliquiez.",
      },
      {
        id: "i2",
        kind: "action",
        icon: "search",
        label: "Enrichir la fiche",
        detail:
          "Entreprise, secteur, téléphone manquant. Le CRM se remplit avant que vous appeliez.",
      },
      {
        id: "i3",
        kind: "cond",
        icon: "branch",
        label: "Triage par score",
        detail:
          "SI source, budget ou urgence : chaud ou froid. Une règle, deux chemins utiles.",
      },
      {
        id: "i4",
        kind: "branch",
        icon: "tag",
        label: "Chaud ou froid",
        detail:
          "Chaud part vers la prise de RDV. Froid entre en séquence de relance. Rien ne reste dans une boîte générique.",
      },
    ],
  },
  {
    id: "hot",
    no: "02",
    title: "Lead chaud → RDV",
    tag: "Vente",
    blurb:
      "Le triage a dit « chaud ». Votre équipe est alertée et le client reçoit un lien pour booker.",
    handoffs: [{ to: "reminders", label: "Ensuite → rappels RDV" }],
    steps: [
      {
        id: "h1",
        kind: "trigger",
        icon: "tag",
        label: "Score chaud",
        detail:
          "Signal reçu du triage. Priorité haute, sans attendre votre revue manuelle.",
      },
      {
        id: "h2",
        kind: "action",
        icon: "bell",
        label: "Alerter l'équipe",
        detail:
          "Slack, SMS ou courriel interne avec le contexte CRM. Quelqu'un peut rappeler dans l'heure.",
      },
      {
        id: "h3",
        kind: "action",
        icon: "calendar",
        label: "Envoyer le lien RDV",
        detail:
          "Le prospect choisit un créneau sur votre agenda. Moins d'allers-retours pour trouver une date.",
      },
      {
        id: "h4",
        kind: "action",
        icon: "check",
        label: "RDV confirmé",
        detail: "Confirmation envoyée. Le workflow de rappels s'arme pour le jour J.",
      },
    ],
  },
  {
    id: "nurture",
    no: "03",
    title: "Relance lead froid",
    tag: "Relance",
    blurb:
      "Pas prêt aujourd'hui n'est pas perdu. Une attente, puis courriel et SMS au bon rythme.",
    handoffs: [{ to: "hot", label: "S'il répond → RDV" }],
    steps: [
      {
        id: "n1",
        kind: "trigger",
        icon: "clock",
        label: "Lead froid classé",
        detail:
          "Sortie du triage. La séquence démarre sans que le lead tombe dans l'oubli.",
      },
      {
        id: "n2",
        kind: "cond",
        icon: "clock",
        label: "Attendre 2 jours",
        detail:
          "SI aucun échange. Assez de temps pour respirer, pas assez pour disparaître.",
      },
      {
        id: "n3",
        kind: "action",
        icon: "mail",
        label: "Courriel J+2",
        detail: "Valeur courte, votre ton, un seul CTA. Envoyé depuis votre boîte.",
      },
      {
        id: "n4",
        kind: "action",
        icon: "chat",
        label: "SMS J+5",
        detail: "Si toujours silencieux, un SMS bref. Présent sans harceler.",
      },
    ],
  },
  {
    id: "reminders",
    no: "04",
    title: "Rappels de rendez-vous",
    tag: "Présence",
    blurb:
      "Le RDV est booké. Courriel la veille, SMS deux heures avant. Moins de no-shows.",
    handoffs: [{ to: "billing", label: "Après le mandat → facturation" }],
    steps: [
      {
        id: "r1",
        kind: "trigger",
        icon: "calendar",
        label: "RDV confirmé",
        detail:
          "Agenda connecté (Calendly, Google, Outlook). Les rappels sont planifiés tout de suite.",
      },
      {
        id: "r2",
        kind: "cond",
        icon: "clock",
        label: "J-1 puis H-2",
        detail:
          "SI fenêtre temporelle atteinte. Deux touches, un seul objectif : qu'il arrive.",
      },
      {
        id: "r3",
        kind: "action",
        icon: "mail",
        label: "Courriel la veille",
        detail: "Heure, lieu ou lien Zoom, bouton pour reporter. Zéro friction.",
      },
      {
        id: "r4",
        kind: "action",
        icon: "chat",
        label: "SMS 2 h avant",
        detail: "Dernier rappel court. Il arrive, ou reporte à temps.",
      },
    ],
  },
  {
    id: "billing",
    no: "05",
    title: "Livraison & paiement",
    tag: "Encaissement",
    blurb:
      "Le mandat est livré. Facture, lien de paiement, reçu. Vous n'attendez plus un virement promis pour demain.",
    handoffs: [
      { to: "collections", label: "Si impayé → relance" },
      { to: "reviews", label: "Si payé → demande d'avis" },
    ],
    steps: [
      {
        id: "b1",
        kind: "trigger",
        icon: "briefcase",
        label: "Statut livré",
        detail:
          "Vous cochez livré dans votre outil, ou le client confirme. La facturation part sur un vrai signal.",
      },
      {
        id: "b2",
        kind: "action",
        icon: "invoice",
        label: "Générer la facture",
        detail:
          "Montants, TPS/TVQ, échéance. Document prêt sans Excel de fin de mois.",
      },
      {
        id: "b3",
        kind: "action",
        icon: "card",
        label: "Envoyer le lien de paiement",
        detail: "Stripe, Interac ou votre processeur. Le client paie en deux clics.",
      },
      {
        id: "b4",
        kind: "action",
        icon: "check",
        label: "Reçu automatique",
        detail:
          "Paiement confirmé → reçu envoyé, CRM mis à jour. La boucle est fermée.",
      },
    ],
  },
  {
    id: "collections",
    no: "06",
    title: "Relance facture",
    tag: "Créances",
    blurb:
      "L'échéance est passée. Un rappel poli, puis un second. Vous arrêtez de courir après les paiements à la main.",
    handoffs: [{ to: "reviews", label: "Une fois payé → avis" }],
    steps: [
      {
        id: "c1",
        kind: "trigger",
        icon: "invoice",
        label: "Facture échue",
        detail:
          "Jour J+1 après l'échéance. Le système voit le non-paiement, pas votre mémoire.",
      },
      {
        id: "c2",
        kind: "cond",
        icon: "clock",
        label: "Toujours impayée ?",
        detail:
          "SI aucun paiement reçu. Si le client a payé entre-temps, la séquence s'arrête.",
      },
      {
        id: "c3",
        kind: "action",
        icon: "mail",
        label: "Rappel courriel J+1",
        detail:
          "Ton professionnel, facture en pièce jointe, lien de paiement. Fermé, sans gêne.",
      },
      {
        id: "c4",
        kind: "action",
        icon: "chat",
        label: "SMS J+7",
        detail:
          "Deuxième touche courte si toujours rien. Vous gardez le contrôle sans harceler.",
      },
    ],
  },
  {
    id: "reviews",
    no: "07",
    title: "Demande d'avis",
    tag: "Réputation",
    blurb:
      "Client satisfait et payé. Un message au bon moment pour un avis Google. Votre prochaine vente commence ici.",
    steps: [
      {
        id: "v1",
        kind: "trigger",
        icon: "check",
        label: "Paiement reçu",
        detail:
          "Meilleur moment pour demander : juste après le paiement, pas trois mois plus tard.",
      },
      {
        id: "v2",
        kind: "cond",
        icon: "clock",
        label: "Attendre 24 h",
        detail:
          "SI délai écoulé. Assez pour digérer la livraison, pas assez pour oublier.",
      },
      {
        id: "v3",
        kind: "action",
        icon: "mail",
        label: "Courriel + lien Google",
        detail:
          "Message personnel, un seul bouton. Direct vers votre fiche Google Business.",
      },
      {
        id: "v4",
        kind: "action",
        icon: "bell",
        label: "Rappel doux J+5",
        detail:
          "Un seul rappel si pas d'avis. Ensuite, on arrête. La réputation se construit sans pression.",
      },
    ],
  },
];

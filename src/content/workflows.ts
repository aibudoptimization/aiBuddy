import type { WorkflowIconKey } from "@/lib/services/workflow-data";
import type { Locale } from "@/lib/locale";

export type PipelineStepKind = "trigger" | "cond" | "action" | "branch";

export type Localized = Record<Locale, string>;

export type PipelineStep = {
  id: string;
  kind: PipelineStepKind;
  icon: WorkflowIconKey;
  label: Localized;
  detail: Localized;
};

export type PipelineHandoff = {
  to: string;
  label: Localized;
};

export type PipelineFlow = {
  id: string;
  no: string;
  title: Localized;
  tag: Localized;
  blurb: Localized;
  steps: PipelineStep[];
  /** Soft links to related flows — replaces the old multi-lane map edges. */
  handoffs?: PipelineHandoff[];
};

export const PIPELINE_UI = {
  fr: {
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
  },
  en: {
    pick: "Pick a scenario",
    play: "Play",
    pause: "Pause",
    stepOf: "Step",
    of: "of",
    handoff: "Hands off to",
    kinds: {
      trigger: "Trigger",
      cond: "Condition",
      action: "Action",
      branch: "Branch",
    } as Record<PipelineStepKind, string>,
  },
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
    title: { fr: "Entrée & triage", en: "Intake & triage" },
    tag: { fr: "Acquisition", en: "Acquisition" },
    blurb: {
      fr: "Un lead arrive, la fiche se complète, une règle le classe. Chaud ou froid, la suite part toute seule.",
      en: "A lead comes in, the record fills in, a rule scores it. Hot or cold, the next step starts itself.",
    },
    handoffs: [
      { to: "hot", label: { fr: "Lead chaud → RDV", en: "Hot lead → booking" } },
      { to: "nurture", label: { fr: "Lead froid → relance", en: "Cold lead → nurture" } },
    ],
    steps: [
      {
        id: "i1",
        kind: "trigger",
        icon: "lead",
        label: { fr: "Nouveau lead", en: "New lead" },
        detail: {
          fr: "Formulaire, courriel ou pub Meta. Le workflow démarre sans que vous cliquiez.",
          en: "Form, email, or Meta ad. The workflow starts without you clicking.",
        },
      },
      {
        id: "i2",
        kind: "action",
        icon: "search",
        label: { fr: "Enrichir la fiche", en: "Enrich the record" },
        detail: {
          fr: "Entreprise, secteur, téléphone manquant. Le CRM se remplit avant que vous appeliez.",
          en: "Company, industry, missing phone. The CRM fills before you call.",
        },
      },
      {
        id: "i3",
        kind: "cond",
        icon: "branch",
        label: { fr: "Triage par score", en: "Score triage" },
        detail: {
          fr: "SI source, budget ou urgence : chaud ou froid. Une règle, deux chemins utiles.",
          en: "IF source, budget, or urgency: hot or cold. One rule, two useful paths.",
        },
      },
      {
        id: "i4",
        kind: "branch",
        icon: "tag",
        label: { fr: "Chaud ou froid", en: "Hot or cold" },
        detail: {
          fr: "Chaud part vers la prise de RDV. Froid entre en séquence de relance. Rien ne reste dans une boîte générique.",
          en: "Hot goes to booking. Cold enters nurture. Nothing sits in a generic inbox.",
        },
      },
    ],
  },
  {
    id: "hot",
    no: "02",
    title: { fr: "Lead chaud → RDV", en: "Hot lead → booking" },
    tag: { fr: "Vente", en: "Sales" },
    blurb: {
      fr: "Le triage a dit « chaud ». Votre équipe est alertée et le client reçoit un lien pour booker.",
      en: "Triage said hot. Your team gets an alert and the client gets a booking link.",
    },
    handoffs: [
      { to: "reminders", label: { fr: "Ensuite → rappels RDV", en: "Next → appointment reminders" } },
    ],
    steps: [
      {
        id: "h1",
        kind: "trigger",
        icon: "tag",
        label: { fr: "Score chaud", en: "Hot score" },
        detail: {
          fr: "Signal reçu du triage. Priorité haute, sans attendre votre revue manuelle.",
          en: "Signal from triage. High priority, without waiting for your manual review.",
        },
      },
      {
        id: "h2",
        kind: "action",
        icon: "bell",
        label: { fr: "Alerter l'équipe", en: "Alert the team" },
        detail: {
          fr: "Slack, SMS ou courriel interne avec le contexte CRM. Quelqu'un peut rappeler dans l'heure.",
          en: "Slack, SMS, or internal email with CRM context. Someone can call within the hour.",
        },
      },
      {
        id: "h3",
        kind: "action",
        icon: "calendar",
        label: { fr: "Envoyer le lien RDV", en: "Send booking link" },
        detail: {
          fr: "Le prospect choisit un créneau sur votre agenda. Moins d'allers-retours pour trouver une date.",
          en: "The prospect picks a slot on your calendar. Fewer back-and-forth emails to find a time.",
        },
      },
      {
        id: "h4",
        kind: "action",
        icon: "check",
        label: { fr: "RDV confirmé", en: "Appointment confirmed" },
        detail: {
          fr: "Confirmation envoyée. Le workflow de rappels s'arme pour le jour J.",
          en: "Confirmation sent. The reminder workflow arms for the appointment day.",
        },
      },
    ],
  },
  {
    id: "nurture",
    no: "03",
    title: { fr: "Relance lead froid", en: "Cold lead nurture" },
    tag: { fr: "Relance", en: "Nurture" },
    blurb: {
      fr: "Pas prêt aujourd'hui n'est pas perdu. Une attente, puis courriel et SMS au bon rythme.",
      en: "Not ready today is not lost. A wait, then email and SMS at the right pace.",
    },
    handoffs: [
      { to: "hot", label: { fr: "S'il répond → RDV", en: "If they reply → booking" } },
    ],
    steps: [
      {
        id: "n1",
        kind: "trigger",
        icon: "clock",
        label: { fr: "Lead froid classé", en: "Marked cold" },
        detail: {
          fr: "Sortie du triage. La séquence démarre sans que le lead tombe dans l'oubli.",
          en: "Exit from triage. The sequence starts so the lead does not get forgotten.",
        },
      },
      {
        id: "n2",
        kind: "cond",
        icon: "clock",
        label: { fr: "Attendre 2 jours", en: "Wait 2 days" },
        detail: {
          fr: "SI aucun échange. Assez de temps pour respirer, pas assez pour disparaître.",
          en: "IF no reply yet. Enough time to breathe, not enough to disappear.",
        },
      },
      {
        id: "n3",
        kind: "action",
        icon: "mail",
        label: { fr: "Courriel J+2", en: "Email day 2" },
        detail: {
          fr: "Valeur courte, votre ton, un seul CTA. Envoyé depuis votre boîte.",
          en: "Short value, your voice, one CTA. Sent from your mailbox.",
        },
      },
      {
        id: "n4",
        kind: "action",
        icon: "chat",
        label: { fr: "SMS J+5", en: "SMS day 5" },
        detail: {
          fr: "Si toujours silencieux, un SMS bref. Présent sans harceler.",
          en: "If still silent, a short SMS. Present without nagging.",
        },
      },
    ],
  },
  {
    id: "reminders",
    no: "04",
    title: { fr: "Rappels de rendez-vous", en: "Appointment reminders" },
    tag: { fr: "Présence", en: "Show-up" },
    blurb: {
      fr: "Le RDV est booké. Courriel la veille, SMS deux heures avant. Moins de no-shows.",
      en: "The appointment is booked. Email the day before, SMS two hours out. Fewer no-shows.",
    },
    handoffs: [
      { to: "billing", label: { fr: "Après le mandat → facturation", en: "After the job → billing" } },
    ],
    steps: [
      {
        id: "r1",
        kind: "trigger",
        icon: "calendar",
        label: { fr: "RDV confirmé", en: "Appointment confirmed" },
        detail: {
          fr: "Agenda connecté (Calendly, Google, Outlook). Les rappels sont planifiés tout de suite.",
          en: "Calendar connected (Calendly, Google, Outlook). Reminders schedule immediately.",
        },
      },
      {
        id: "r2",
        kind: "cond",
        icon: "clock",
        label: { fr: "J-1 puis H-2", en: "D-1 then H-2" },
        detail: {
          fr: "SI fenêtre temporelle atteinte. Deux touches, un seul objectif : qu'il arrive.",
          en: "IF the time window hits. Two touches, one goal: they show up.",
        },
      },
      {
        id: "r3",
        kind: "action",
        icon: "mail",
        label: { fr: "Courriel la veille", en: "Email the day before" },
        detail: {
          fr: "Heure, lieu ou lien Zoom, bouton pour reporter. Zéro friction.",
          en: "Time, place or Zoom link, reschedule button. Zero friction.",
        },
      },
      {
        id: "r4",
        kind: "action",
        icon: "chat",
        label: { fr: "SMS 2 h avant", en: "SMS 2 hours before" },
        detail: {
          fr: "Dernier rappel court. Il arrive, ou reporte à temps.",
          en: "Final short nudge. They show up, or reschedule in time.",
        },
      },
    ],
  },
  {
    id: "billing",
    no: "05",
    title: { fr: "Livraison & paiement", en: "Delivery & payment" },
    tag: { fr: "Encaissement", en: "Cashflow" },
    blurb: {
      fr: "Le mandat est livré. Facture, lien de paiement, reçu. Vous n'attendez plus un virement promis pour demain.",
      en: "The job is delivered. Invoice, payment link, receipt. You stop waiting on a payment promised for tomorrow.",
    },
    handoffs: [
      { to: "collections", label: { fr: "Si impayé → relance", en: "If unpaid → chase" } },
      { to: "reviews", label: { fr: "Si payé → demande d'avis", en: "If paid → ask for a review" } },
    ],
    steps: [
      {
        id: "b1",
        kind: "trigger",
        icon: "briefcase",
        label: { fr: "Statut livré", en: "Marked delivered" },
        detail: {
          fr: "Vous cochez livré dans votre outil, ou le client confirme. La facturation part sur un vrai signal.",
          en: "You mark delivered in your tool, or the client confirms. Billing starts on a real signal.",
        },
      },
      {
        id: "b2",
        kind: "action",
        icon: "invoice",
        label: { fr: "Générer la facture", en: "Generate the invoice" },
        detail: {
          fr: "Montants, TPS/TVQ, échéance. Document prêt sans Excel de fin de mois.",
          en: "Amounts, tax, due date. Document ready without end-of-month Excel.",
        },
      },
      {
        id: "b3",
        kind: "action",
        icon: "card",
        label: { fr: "Envoyer le lien de paiement", en: "Send payment link" },
        detail: {
          fr: "Stripe, Interac ou votre processeur. Le client paie en deux clics.",
          en: "Stripe, Interac, or your processor. The client pays in two clicks.",
        },
      },
      {
        id: "b4",
        kind: "action",
        icon: "check",
        label: { fr: "Reçu automatique", en: "Automatic receipt" },
        detail: {
          fr: "Paiement confirmé → reçu envoyé, CRM mis à jour. La boucle est fermée.",
          en: "Payment confirmed → receipt sent, CRM updated. The loop is closed.",
        },
      },
    ],
  },
  {
    id: "collections",
    no: "06",
    title: { fr: "Relance facture", en: "Invoice follow-up" },
    tag: { fr: "Créances", en: "Collections" },
    blurb: {
      fr: "L'échéance est passée. Un rappel poli, puis un second. Vous arrêtez de courir après les paiements à la main.",
      en: "The due date passed. A polite nudge, then a second. You stop chasing payments by hand.",
    },
    handoffs: [
      { to: "reviews", label: { fr: "Une fois payé → avis", en: "Once paid → review" } },
    ],
    steps: [
      {
        id: "c1",
        kind: "trigger",
        icon: "invoice",
        label: { fr: "Facture échue", en: "Invoice past due" },
        detail: {
          fr: "Jour J+1 après l'échéance. Le système voit le non-paiement, pas votre mémoire.",
          en: "Day after due date. The system sees non-payment, not your memory.",
        },
      },
      {
        id: "c2",
        kind: "cond",
        icon: "clock",
        label: { fr: "Toujours impayée ?", en: "Still unpaid?" },
        detail: {
          fr: "SI aucun paiement reçu. Si le client a payé entre-temps, la séquence s'arrête.",
          en: "IF no payment received. If they paid in the meantime, the sequence stops.",
        },
      },
      {
        id: "c3",
        kind: "action",
        icon: "mail",
        label: { fr: "Rappel courriel J+1", en: "Email reminder day 1" },
        detail: {
          fr: "Ton professionnel, facture en pièce jointe, lien de paiement. Fermé, sans gêne.",
          en: "Professional tone, invoice attached, payment link. Firm, not awkward.",
        },
      },
      {
        id: "c4",
        kind: "action",
        icon: "chat",
        label: { fr: "SMS J+7", en: "SMS day 7" },
        detail: {
          fr: "Deuxième touche courte si toujours rien. Vous gardez le contrôle sans harceler.",
          en: "Second short touch if still nothing. You stay in control without harassing.",
        },
      },
    ],
  },
  {
    id: "reviews",
    no: "07",
    title: { fr: "Demande d'avis", en: "Review request" },
    tag: { fr: "Réputation", en: "Reputation" },
    blurb: {
      fr: "Client satisfait et payé. Un message au bon moment pour un avis Google. Votre prochaine vente commence ici.",
      en: "Happy client, paid in full. A timely ask for a Google review. Your next sale starts here.",
    },
    steps: [
      {
        id: "v1",
        kind: "trigger",
        icon: "check",
        label: { fr: "Paiement reçu", en: "Payment received" },
        detail: {
          fr: "Meilleur moment pour demander : juste après le paiement, pas trois mois plus tard.",
          en: "Best moment to ask: right after payment, not three months later.",
        },
      },
      {
        id: "v2",
        kind: "cond",
        icon: "clock",
        label: { fr: "Attendre 24 h", en: "Wait 24 hours" },
        detail: {
          fr: "SI délai écoulé. Assez pour digérer la livraison, pas assez pour oublier.",
          en: "IF the wait elapsed. Enough to settle after delivery, not enough to forget.",
        },
      },
      {
        id: "v3",
        kind: "action",
        icon: "mail",
        label: { fr: "Courriel + lien Google", en: "Email + Google link" },
        detail: {
          fr: "Message personnel, un seul bouton. Direct vers votre fiche Google Business.",
          en: "Personal note, one button. Straight to your Google Business profile.",
        },
      },
      {
        id: "v4",
        kind: "action",
        icon: "bell",
        label: { fr: "Rappel doux J+5", en: "Gentle nudge day 5" },
        detail: {
          fr: "Un seul rappel si pas d'avis. Ensuite, on arrête. La réputation se construit sans pression.",
          en: "One nudge if no review. Then stop. Reputation builds without pressure.",
        },
      },
    ],
  },
];

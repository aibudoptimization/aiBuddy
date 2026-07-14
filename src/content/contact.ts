import { CONTACT_EMAIL } from "@/lib/routes";

export const CONTACT_COPY = {
  eyebrow: "Consultation gratuite · sans engagement",
  title: "Parlons de votre projet.",
  lead: "Dites-nous où vous en êtes. On revient vers vous sous 24\u00a0h avec une première piste concrète et un devis détaillé, sans engagement.",
  bullets: [
    "Un plan d'action clair & priorisé",
    "Des recommandations concrètes",
    "Un devis détaillé sous 24 h",
  ],
  emailPrompt: "Vous préférez le courriel ?",
  email: CONTACT_EMAIL,
} as const;

export const CONTACT_FORM_LABELS = {
  firstName: "Prénom",
  firstNameOptional: "facultatif",
  lastName: "Nom de famille",
  lastNameOptional: "facultatif",
  company: "Nom de l'entreprise",
  email: "Adresse courriel",
  message: "Votre projet en quelques mots",
  messageOptional: "facultatif",
  consent:
    "J'accepte que Workflow Wonder conserve mes coordonnées afin de traiter ma demande, conformément à sa",
  consentLinkLabel: "politique de confidentialité",
  submit: "Envoyer ma demande",
  submitting: "Envoi en cours…",
  successTitle: "Message reçu, merci\u00a0!",
  successBody:
    "On vous a envoyé un courriel de confirmation. On revient vers vous sous 24\u00a0h.",
  errorGeneric:
    "Une erreur est survenue. Réessayez ou écrivez-nous directement par courriel.",
} as const;

export const RETENTION_MONTHS = 12;

export const PRIVACY_LAST_UPDATED = "10 juillet 2026";

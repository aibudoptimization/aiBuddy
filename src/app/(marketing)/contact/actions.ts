"use server";

import { headers } from "next/headers";

export type ContactFieldErrors = {
  company?: string;
  email?: string;
  consent?: string;
};

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: ContactFieldErrors;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 2000;

function clean(value: FormDataEntryValue | null, max = 200): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: bots fill hidden fields humans never see.
  if (clean(formData.get("website"))) {
    return { status: "success" };
  }

  const firstName = clean(formData.get("firstName"));
  const lastName = clean(formData.get("lastName"));
  const company = clean(formData.get("company"));
  const email = clean(formData.get("email"), 320);
  const message = clean(formData.get("message"), MAX_LEN);
  const consent = formData.get("consent") === "on";

  const fieldErrors: ContactFieldErrors = {};
  if (!company) fieldErrors.company = "Le nom de l'entreprise est requis.";
  if (!email) {
    fieldErrors.email = "L'adresse courriel est requise.";
  } else if (!EMAIL_RE.test(email)) {
    fieldErrors.email = "Cette adresse courriel semble invalide.";
  }
  if (!consent) {
    fieldErrors.consent = "Votre consentement est requis pour traiter la demande.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[contact] N8N_WEBHOOK_URL is not configured.");
    return {
      status: "error",
      message:
        "Le formulaire n'est pas encore configuré. Écrivez-nous directement par courriel.",
    };
  }

  const requestHeaders = await headers();

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.N8N_WEBHOOK_SECRET
          ? { "x-webhook-secret": process.env.N8N_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        firstName,
        lastName,
        company,
        email,
        message,
        consent,
        submittedAt: new Date().toISOString(),
        locale: "fr-CA",
        source: "workflowwonder.com/contact",
        meta: {
          userAgent: requestHeaders.get("user-agent") ?? null,
          referer: requestHeaders.get("referer") ?? null,
        },
      }),
    });

    if (!response.ok) {
      console.error(`[contact] Webhook responded ${response.status}`);
      return { status: "error", message: undefined };
    }

    return { status: "success" };
  } catch (error) {
    console.error("[contact] Webhook request failed:", error);
    return { status: "error", message: undefined };
  }
}

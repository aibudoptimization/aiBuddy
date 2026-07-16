"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { submitContact, type ContactFormState } from "@/app/(marketing)/contact/actions";
import { useLocale } from "@/components/i18n/LocaleProvider";

const INITIAL_STATE: ContactFormState = { status: "idle" };

function SubmitButton({ submit, submitting }: { submit: string; submitting: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="ww-cta-fill ww-form__submit" disabled={pending}>
      {pending ? submitting : submit}
      {!pending ? <span aria-hidden>→</span> : null}
    </button>
  );
}

export function ContactForm() {
  const { dict, routes } = useLocale();
  const labels = dict.contact.form;
  const [state, formAction] = useActionState(submitContact, INITIAL_STATE);
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div className="ww-form ww-form--success" role="status" aria-live="polite">
        <span className="ww-form__success-icon" aria-hidden>
          ✓
        </span>
        <h2 className="ww-form__success-title">{labels.successTitle}</h2>
        <p className="ww-form__success-body">{labels.successBody}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="ww-form" noValidate>
      {state.status === "error" && !state.fieldErrors ? (
        <p className="ww-form__alert" role="alert">
          {state.message ?? labels.errorGeneric}
        </p>
      ) : null}

      <div className="ww-form__row">
        <div className="ww-field">
          <label className="ww-field__label" htmlFor="firstName">
            {labels.firstName}
            <span className="ww-field__opt">{labels.firstNameOptional}</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            className="ww-input"
          />
        </div>
        <div className="ww-field">
          <label className="ww-field__label" htmlFor="lastName">
            {labels.lastName}
            <span className="ww-field__opt">{labels.lastNameOptional}</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            className="ww-input"
          />
        </div>
      </div>

      <div className="ww-field">
        <label className="ww-field__label" htmlFor="company">
          {labels.company}
          <span className="ww-field__req" aria-hidden>
            *
          </span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "company-error" : undefined}
          className="ww-input"
        />
        {errors.company ? (
          <span id="company-error" className="ww-field__error">
            {errors.company}
          </span>
        ) : null}
      </div>

      <div className="ww-field">
        <label className="ww-field__label" htmlFor="email">
          {labels.email}
          <span className="ww-field__req" aria-hidden>
            *
          </span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="ww-input"
        />
        {errors.email ? (
          <span id="email-error" className="ww-field__error">
            {errors.email}
          </span>
        ) : null}
      </div>

      <div className="ww-field">
        <label className="ww-field__label" htmlFor="message">
          {labels.message}
          <span className="ww-field__opt">{labels.messageOptional}</span>
        </label>
        <textarea id="message" name="message" rows={4} className="ww-input ww-textarea" />
      </div>

      <div aria-hidden className="ww-form__hp">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="ww-field">
        <label className="ww-consent">
          <input
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            className="ww-consent__box"
          />
          <span className="ww-consent__text">
            {labels.consent}{" "}
            <Link href={routes.privacy} className="ww-consent__link">
              {labels.consentLinkLabel}
            </Link>
            .
            <span className="ww-field__req" aria-hidden>
              {" "}
              *
            </span>
          </span>
        </label>
        {errors.consent ? <span className="ww-field__error">{errors.consent}</span> : null}
      </div>

      <SubmitButton submit={labels.submit} submitting={labels.submitting} />
    </form>
  );
}

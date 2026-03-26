"use client";

import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SmartLink, smartLinkClassName } from "@/components/ui/SmartLink";
import {
  getCalBookingUrlFromEnv,
  isCalEmbedEnabledFromEnv,
} from "@/lib/cal/config";
import { trackCalTelemetry } from "@/lib/cal/events";
import { openCalSchedulePopup } from "@/lib/cal/open-schedule-popup";

type Variant = "primary" | "secondary" | "link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors motion-safe:duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]";

const styles: Record<Exclude<Variant, "link">, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] shadow-sm shadow-black/20",
  secondary:
    "border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-elevated)]",
};

type CalScheduleAuditButtonProps = {
  variant: Variant;
  className?: string;
  children: ReactNode;
};

export function CalScheduleAuditButton({
  variant,
  className = "",
  children,
}: CalScheduleAuditButtonProps) {
  const bookingUrl = getCalBookingUrlFromEnv();
  const embed = isCalEmbedEnabledFromEnv();

  const trackClick = () =>
    trackCalTelemetry("schedule_cta_click", {
      source: "cal_schedule_button",
      variant,
      embedEnabled: embed,
      bookingUrl: bookingUrl ?? "#book-audit",
    });

  if (!bookingUrl) {
    if (variant === "link") {
      return (
        <SmartLink href="#book-audit" className={className} onClick={trackClick}>
          {children}
        </SmartLink>
      );
    }
    return (
      <ButtonLink href="#book-audit" variant={variant} className={className} onClick={trackClick}>
        {children}
      </ButtonLink>
    );
  }

  if (!embed) {
    if (variant === "link") {
      return (
        <SmartLink href={bookingUrl} className={className} onClick={trackClick}>
          {children}
        </SmartLink>
      );
    }
    return (
      <ButtonLink href={bookingUrl} variant={variant} className={className} external onClick={trackClick}>
        {children}
      </ButtonLink>
    );
  }

  if (variant === "link") {
    const cn = `${smartLinkClassName} ${className}`.trim();
    return (
      <button
        type="button"
        className={cn}
        onClick={() => {
          void (async () => {
            trackClick();
            trackCalTelemetry("cal_modal_open_attempt", {
              source: "cal_schedule_button",
              variant,
              embedEnabled: embed,
              bookingUrl,
            });
            try {
              await openCalSchedulePopup(bookingUrl);
              trackCalTelemetry("cal_modal_open_success", {
                source: "cal_schedule_button",
                variant,
                embedEnabled: embed,
                bookingUrl,
              });
            } catch {
              trackCalTelemetry("cal_fallback_redirect", {
                source: "cal_schedule_button",
                variant,
                embedEnabled: embed,
                bookingUrl,
                reason: "modal_open_failed",
              });
              window.location.assign(bookingUrl);
            }
          })();
        }}
      >
        {children}
      </button>
    );
  }

  const cn = `${base} ${styles[variant]} ${className}`.trim();

  return (
    <button
      type="button"
      className={cn}
      onClick={() => {
        void (async () => {
          trackClick();
          trackCalTelemetry("cal_modal_open_attempt", {
            source: "cal_schedule_button",
            variant,
            embedEnabled: embed,
            bookingUrl,
          });
          try {
            await openCalSchedulePopup(bookingUrl);
            trackCalTelemetry("cal_modal_open_success", {
              source: "cal_schedule_button",
              variant,
              embedEnabled: embed,
              bookingUrl,
            });
          } catch {
            trackCalTelemetry("cal_fallback_redirect", {
              source: "cal_schedule_button",
              variant,
              embedEnabled: embed,
              bookingUrl,
              reason: "modal_open_failed",
            });
            window.location.assign(bookingUrl);
          }
        })();
      }}
    >
      {children}
    </button>
  );
}

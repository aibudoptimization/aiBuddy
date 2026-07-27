import {
  CalendarClock,
  Inbox,
  Mail,
  Receipt,
  Repeat,
  Route,
  Send,
  Split,
  UserPlus,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { ServiceRowIcon } from "@/content/i18n/types";

/** Content names the icon, this maps it to a component. */
export const SERVICE_ROW_ICONS: Record<ServiceRowIcon, LucideIcon> = {
  split: Split,
  workflow: Workflow,
  repeat: Repeat,
  mail: Mail,
  route: Route,
  userPlus: UserPlus,
  receipt: Receipt,
  inbox: Inbox,
  calendarClock: CalendarClock,
  send: Send,
};

/**
 * Every card used to carry the same accent dot, so ten cards on a page were
 * indistinguishable at a glance. An icon gives each one an anchor to skim by.
 * Falls back to the original dot when a row has no icon yet.
 */
export function ServiceRowIconMark({ icon }: { icon?: ServiceRowIcon }) {
  const Icon = icon ? SERVICE_ROW_ICONS[icon] : null;
  if (!Icon) return <span className="ww-svc-dot" aria-hidden />;
  return (
    <span className="ww-svc-icon" aria-hidden>
      <Icon size={17} strokeWidth={1.85} />
    </span>
  );
}

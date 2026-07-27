import {
  BookOpen,
  Bot,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  Database,
  FileCheck,
  Gauge,
  Hand,
  Headset,
  HelpCircle,
  Inbox,
  ListFilter,
  Mail,
  MailCheck,
  Map,
  PenLine,
  Plug,
  Receipt,
  RefreshCw,
  Repeat,
  Route,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Split,
  Store,
  Table2,
  TrendingUp,
  Unplug,
  UserPlus,
  Webhook,
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
  bot: Bot,
  plug: Plug,
  penLine: PenLine,
  shieldCheck: ShieldCheck,
  headset: Headset,
  listFilter: ListFilter,
  bookOpen: BookOpen,
  mailCheck: MailCheck,
  webhook: Webhook,
  refreshCw: RefreshCw,
  database: Database,
  fileCheck: FileCheck,
  store: Store,
  clipboardList: ClipboardList,
  calendarDays: CalendarDays,
  table: Table2,
  search: Search,
  gauge: Gauge,
  map: Map,
  scale: Scale,
  hand: Hand,
  unplug: Unplug,
  helpCircle: HelpCircle,
  trendingUp: TrendingUp,
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

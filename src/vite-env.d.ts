/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SCHEDULE_AUDIT_URL?: string
  readonly VITE_CAL_BOOKING_URL?: string
  readonly VITE_N8N_FORM_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

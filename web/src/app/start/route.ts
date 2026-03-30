import { NextResponse } from "next/server";

const FALLBACK_FORM_URL =
  "https://aibuddyopt.app.n8n.cloud/form/fcb32890-4c02-400c-a8aa-a838191ab54e";

export function GET() {
  const formUrl = process.env.NEXT_PUBLIC_N8N_FORM_URL?.trim() || FALLBACK_FORM_URL;
  return NextResponse.redirect(formUrl, { status: 307 });
}

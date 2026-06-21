import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { token?: string; eventId?: string } | null;
  if (!body?.token) return NextResponse.json({ data: null, error: { code: "TOKEN_REQUIRED", message: "연결 QR 토큰이 필요합니다." }, meta: null }, { status: 400 });
  // Production: verify signature/exp/nonce, resolve recipient, and insert idempotently under RLS.
  return NextResponse.json({ data: { id: crypto.randomUUID(), status: "connected", context: { event: body.eventId ?? null, connectedAt: new Date().toISOString() } }, error: null, meta: { idempotent: true } }, { status: 201 });
}

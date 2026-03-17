import { NextRequest } from "next/server";

/**
 * Health check endpoint for liveness/readiness probes and keep-alive.
 * GET /api/health returns 200 with { "status": "ok" }.
 * GET /api/health?headers=1 returns the same plus forwarded headers (host, x-forwarded-*)
 * so you can verify requests reach the origin behind Cloudflare. No side effects, no I/O.
 */
export async function GET(request: NextRequest): Promise<Response> {
  const url = new URL(request.url);
  const echoHeaders = url.searchParams.get("headers") === "1";

  if (!echoHeaders) {
    return Response.json({ status: "ok" });
  }

  const headers: Record<string, string | null> = {
    host: request.headers.get("host"),
    "x-forwarded-for": request.headers.get("x-forwarded-for"),
    "x-forwarded-proto": request.headers.get("x-forwarded-proto"),
    "x-real-ip": request.headers.get("x-real-ip"),
    "cf-connecting-ip": request.headers.get("cf-connecting-ip"),
    "cf-ray": request.headers.get("cf-ray"),
  };

  return Response.json({ status: "ok", headers });
}

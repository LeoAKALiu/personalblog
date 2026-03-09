/**
 * Health check endpoint for liveness/readiness probes and keep-alive.
 * GET /api/health returns 200 with { "status": "ok" }.
 * No side effects, no I/O — safe for Docker healthcheck and reverse proxies.
 */
export async function GET(): Promise<Response> {
  return Response.json({ status: "ok" });
}

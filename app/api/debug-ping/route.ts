import { NextRequest } from "next/server";
import path from "path";
import fs from "fs";

const LOG_NAME = "debug-91a2c6.log";
const SESSION_ID = "91a2c6";

/**
 * Debug route: log request headers to NDJSON file to verify Cloudflare → origin.
 * Call GET /api/debug-ping to confirm requests reach the server and inspect headers.
 */
export async function GET(request: NextRequest): Promise<Response> {
  const logDir =
    process.env.DEBUG_LOG_DIR ?? path.join(process.cwd(), ".cursor");
  const logPath = path.join(logDir, LOG_NAME);

  const headers: Record<string, string> = {};
  request.headers.forEach((v, k) => {
    headers[k] = v;
  });

  const payload = {
    sessionId: SESSION_ID,
    id: `log_${Date.now()}_ping`,
    timestamp: Date.now(),
    location: "app/api/debug-ping/route.ts:GET",
    message: "debug-ping request received",
    data: {
      url: request.url,
      method: request.method,
      host: request.headers.get("host") ?? null,
      "x-forwarded-for": request.headers.get("x-forwarded-for") ?? null,
      "x-forwarded-proto": request.headers.get("x-forwarded-proto") ?? null,
      "x-real-ip": request.headers.get("x-real-ip") ?? null,
      "cf-connecting-ip": request.headers.get("cf-connecting-ip") ?? null,
      "cf-ray": request.headers.get("cf-ray") ?? null,
      allHeaders: headers,
    },
    runId: "cloudflare-debug",
    hypothesisId: "H1_H2_H3",
  };

  try {
    fs.mkdirSync(logDir, { recursive: true });
    fs.appendFileSync(logPath, JSON.stringify(payload) + "\n");
  } catch (e) {
    // ignore fs errors (e.g. container without mount)
  }

  return Response.json({ ok: true, logPath });
}

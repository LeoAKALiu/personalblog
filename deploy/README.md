# Deploy: Keep-Alive and Crash Restart

## Docker (recommended)

The stack already includes:

- **Health check**: `GET /api/health` returns `{ "status": "ok" }`. Docker pings it every 30s.
- **Crash restart**: `restart: always` restarts the container when the process exits.

### Optional: Restart when unhealthy

If the process is hung (unhealthy) but not exited, plain Compose does not restart the container. You can add a cron job to restart when unhealthy:

```bash
# Example: every 5 min, restart container if unhealthy
*/5 * * * * docker inspect --format '{{.State.Health.Status}}' portfolio-web 2>/dev/null | grep -q unhealthy && docker restart portfolio-web
```

### Optional: External keep-alive

If you sit behind NPM/Cloudflare and idle connections get dropped, hit the health endpoint periodically:

```bash
# Example: every 5 min (replace with your public URL)
*/5 * * * * curl -s -o /dev/null https://your-domain.example/api/health
```

---

## Bare metal (systemd)

For running without Docker (e.g. `node server.js` from a standalone build):

1. Copy the unit file and enable the service:

   ```bash
   sudo cp deploy/personalblog.service /etc/systemd/system/
   # Edit if needed: WorkingDirectory, User, path to node
   sudo systemctl daemon-reload
   sudo systemctl enable --now personalblog
   ```

2. **Standalone build**: After `npm run build`, run from the standalone output so `server.js` exists in `WorkingDirectory`. Copy `.next/standalone` (and `.next/static` into `.next/standalone/.next/static`) to the server and set `WorkingDirectory` to that directory. Or use `ExecStart=/usr/bin/npm start` and `WorkingDirectory=/var/www/personalblog` to use `next start` instead of standalone.

3. **Crash restart**: `Restart=on-failure` and `RestartSec=5` in the unit file restart the process after a crash.

---

## Health endpoint

- **URL**: `GET /api/health`
- **Response**: `200` with `{ "status": "ok" }`
- Use for: Docker healthcheck, reverse-proxy checks, cron keep-alive, or monitoring.

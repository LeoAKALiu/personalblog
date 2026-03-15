#!/bin/sh
# Warm up Next.js so first user request is fast. Run from cron every 5 min:
# */5 * * * * /var/www/personalblog/deploy/warmup.sh
curl -s -o /dev/null -m 30 http://127.0.0.1:3000/ || true
curl -s -o /dev/null -m 10 http://127.0.0.1:3000/api/health || true

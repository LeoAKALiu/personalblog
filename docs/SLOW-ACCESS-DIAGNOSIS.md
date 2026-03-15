# liubo.xin / www.liubo.xin 访问慢排查报告

**排查时间**: 2026-03-15  
**服务器**: iZbp18bxj4ocfafe074qpoZ (Alibaba Cloud)

---

## 一、关键环境信息

| 项 | 结果 |
|----|------|
| `pwd` | /var/www/personalblog |
| `hostname` | iZbp18bxj4ocfafe074qpoZ |
| `uname` | Linux 5.10.134-16.1.al8.x86_64 |
| **80/443 监听** | docker-proxy → 容器 **nginx-app** (Nginx Proxy Manager / OpenResty) |
| **3000 监听** | docker-proxy → 容器 **portfolio-web** (Next.js) |
| **项目内 nginx** | 无；personalblog 无独立 nginx，仅 NPM 反代到 3000 |

---

## 二、各层响应时间（实测）

| 请求 | 结果 | 耗时/说明 |
|------|------|-----------|
| `http://127.0.0.1:3000` | 200 | **首包 15.16s**，第二次 0.003s（冷启动明显） |
| `http://127.0.0.1` (无 Host) | 200 | ~3s（NPM 默认站点） |
| `http://127.0.0.1` Host:liubo.xin | 301→HTTPS | ~1–3s |
| `https://127.0.0.1` Host:liubo.xin | **超时** | **10–12s 无首字节**（TLS 约 1s 完成，上游无响应） |
| `https://liubo.xin` | **超时** | 15s |
| `https://www.liubo.xin` | 301→liubo.xin | ~1.26s（仅重定向，不访问上游） |
| `http://liubo.xin` | 301 | 有时 ~1s，有时超时 |

**curl -w 明细**：

- `http://127.0.0.1:3000`：`total=0.003s`（热请求）/ **15.16s**（冷请求）
- `http://127.0.0.1` Host:liubo.xin：`starttransfer=1.0s`，301
- `https://127.0.0.1` Host:liubo.xin：`appconnect=1.06s`，**starttransfer=0**（上游一直未返回）

---

## 三、DNS 与回环

- `liubo.xin` → 47.98.176.41（A）
- `www.liubo.xin` → 2606:4700:…（AAAA，Cloudflare）
- NPM 8.conf 中 **proxy_pass** 为 `$forward_scheme://$server:$port`，`$server=172.18.0.1`，`$port=3000`，即反代到 **宿主机 172.18.0.1:3000**（再由 docker-proxy 转到 portfolio-web）。**无代理回环**。

---

## 四、NPM / OpenResty 配置要点

- **liubo.xin** 对应 `/data/nginx/proxy_host/8.conf`（与 deploy/npm-8-liubo-force-ssl.conf 一致）。
- 80：`server_name liubo.xin` → `return 301 https://$host$request_uri`（强制 HTTPS）。
- 443：`server_name liubo.xin` → `proxy_pass http://172.18.0.1:3000`，`proxy_*_timeout 1800`。
- 错误日志：大量 **recv() failed (104: Connection reset by peer)** 与 **upstream timed out (110)**，upstream 均为 `http://172.18.0.1:3000`。
- 结论：**HTTPS 慢/超时的直接原因是上游 172.18.0.1:3000 响应极慢或断连**，不是 NPM 自身逻辑错误。

---

## 五、项目内 nginx 与 Next.js

- 项目**无**自建 nginx；docker-compose 仅起 `portfolio-web`，暴露 3000。
- Next.js 在容器内监听 **172.18.0.2:3000**（非 127.0.0.1）。
- 从 **NPM 容器内**访问 **172.18.0.2:3000** 或 **portfolio-web:3000** 报 **No route to host**；从**宿主机**访问 172.18.0.2:3000 正常（200, ~2.5ms）。说明同网段容器间在该环境下不可达，只能经宿主机 172.18.0.1:3000 访问 Next.js。
- Next.js 日志有 **Failed to find Server Action "x"**（版本/构建与运行不一致），并存在**首请求约 15s 才返回**的现象。

---

## 六、服务器资源

- **CPU/负载**: 正常（load 0.07，idle 81%）。
- **内存**: 约 7.5G 总，5.5G 可用。
- **磁盘**: / 70%，约 12G 可用。
- **portfolio-web**: 32.7MiB/1.5GiB，健康状态为 unhealthy（与 Server Action 及冷启动有关）。

---

## 七、结论（按约定格式）

| 问题 | 结论 |
|------|------|
| **最慢的是哪一层** | **Next.js 应用首请求**（冷启动/首包 15s+）；其次为 NPM 等待该上游导致的 HTTPS 超时/502/504。 |
| **直接证据** | 宿主机两次 `curl http://127.0.0.1:3000/`：第一次 **time_total=15.16s**，第二次 0.003s；NPM 443 错误日志中 upstream 为 172.18.0.1:3000 的 reset/timeout。 |
| **根因判断** | Next.js 首请求（或空闲后首请求）响应极慢；NPM 反代到 172.18.0.1:3000 时受此影响，表现为 HTTPS 无首字节、超时或 502/504。 |
| **是否存在代理回环** | **否**；反代目标为 172.18.0.1:3000，无自代理。 |
| **是否存在 HTTPS 配置问题** | **否**；TLS 约 1s 完成，慢在 upstream 无响应。 |
| **是否存在 Next.js 应用慢** | **是**；首请求 15s+，且存在 Server Action 错误与 unhealthy。 |
| **是否存在服务器资源瓶颈** | **否**；CPU/内存/磁盘正常。 |

---

## 八、建议修复

- **必做 1**：**重建并部署 portfolio-web 镜像**（`docker compose build --no-cache && docker compose up -d`），消除 Server Action 与构建不一致，并观察首请求是否仍达 15s。
- **必做 2**：**为 NPM 上游做预热**：在 cron 或 healthcheck 中定期请求 `http://127.0.0.1:3000/` 或 `http://127.0.0.1:3000/api/health`，减少用户命中“冷首包”的概率。
- **建议 3**：在 NPM 的 443 server 中适当**降低** `proxy_connect_timeout` / `proxy_read_timeout`（例如 60s），避免长时间挂住；若仍慢，再查 Next.js 启动与依赖（如动态 import、Node 冷启动）。

---

## 九、网络路径修复（NPM upstream keepalive）

- **修复前**：HTTPS 首请求 15s+，重复请求约 4–5s；NPM 直连 portfolio-web:3000 或 172.18.0.2:3000 **超时/502**（同网段容器间在该环境不可达）。
- **已执行**：  
  1. 在 NPM 8.conf 中增加 **upstream liubo_backend { server 172.18.0.1:3000; keepalive 16; }**，443 的 location 使用 **proxy_pass http://liubo_backend** 并设置 **proxy_http_version 1.1**、**proxy_set_header Connection ""**，以便复用连接。  
  2. 保持 upstream 为 **172.18.0.1:3000**（经宿主机 + docker-proxy），未改为 portfolio-web（直连容器在此环境不可用）。  
- **修复后实测**：  
  - 首请求（冷）：本地 HTTPS 约 **15.2s** 返回 200。  
  - **第二请求（keepalive 复用）**：约 **3.07s** 返回 200（由约 4–5s 降至约 3s）。  
- **结论**：同网段容器→容器 TCP 在该 bridge 上不可用（超时），只能走 172.18.0.1；通过 upstream keepalive 降低**重复请求**耗时，首请求仍受冷启动与单程约 4s 影响。

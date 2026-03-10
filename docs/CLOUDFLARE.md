# Cloudflare + 源站排查说明

**要恢复 https://liubo.xin 外网访问**：请按 **[deploy/RESTORE-ACCESS.md](../deploy/RESTORE-ACCESS.md)** 中的步骤依次完成（源站起应用 → 反代 80/443 → Cloudflare DNS+SSL → 防火墙 → 验证）。

当把 liubo.xin 的 DNS 解析切到 Cloudflare 后若出现 **无法访问**（如浏览器报 ERR_CONNECTION_CLOSED），多半是 Cloudflare 到源站的连接或 SSL 配置问题，而不是本站应用逻辑问题。按下面顺序排查。

## 1. 确认请求是否到达源站

- 先确认 **不经过 Cloudflare** 时站点是否正常：用源站 IP 直接访问（若已知），或在 Cloudflare 里把该域名暂时设为 **仅 DNS（灰云）**，再访问 https://liubo.xin。
- 若 **经过 Cloudflare（橙云）** 时打不开：
  - 在浏览器访问：`https://liubo.xin/api/health`  
    若返回 `{"status":"ok"}`，说明请求已到达 Next.js 应用。
  - 再访问：`https://liubo.xin/api/health?headers=1`  
    可看到 `host`、`x-forwarded-proto`、`cf-connecting-ip` 等，用于确认 Cloudflare 转发的头是否正确。

若以上两个地址都打不开（ERR_CONNECTION_CLOSED / 超时），说明请求 **没有到达源站**，继续下面步骤。

## 2. Cloudflare SSL/TLS 模式

在 Cloudflare 控制台：**SSL/TLS** → **概述** 中：

- 源站 **只提供 HTTP**（例如 Nginx 只监听 80）：选 **Flexible**（Cloudflare 用 HTTPS 访客，回源用 HTTP）。
- 源站 **提供 HTTPS**：选 **Full** 或 **Full (strict)**；若选 Full (strict)，源站证书需有效且与域名匹配（或使用 Cloudflare Origin Certificate）。

选错模式会导致回源失败或连接被关闭。

## 3. 源站地址与端口（重要：本项目不直接监听 80/443）

**personalblog 应用**（Docker 容器 `portfolio-web`）只监听 **3000** 端口（见 `docker-compose.yml` 的 `ports: "3000:3000"`）。对外 80/443 由同一台机上的 **Nginx / Nginx Proxy Manager** 等反代监听，反代再把请求转到容器 3000。

因此：

- **Cloudflare 回源目标**：是源站服务器上的 **80 或 443**（即 Nginx/反代监听的端口），不是 3000。
- **DNS**：liubo.xin 的 A/AAAA 记录应指向 **运行 Nginx 和 Docker 的那台服务器 IP**。
- **Cloudflare 回源端口**：
  - Flexible：回源 **80**
  - Full / Full (strict)：回源 **443**
  确保该服务器防火墙放行 80 或 443，且 **Nginx（或其它反代）** 在对应端口监听，并把 liubo.xin 的请求反向代理到 **localhost:3000**（或 `portfolio-web:3000`）。

## 4. 源站防火墙与 Nginx

- 防火墙放行 **80**（Flexible 时）或 **443**（Full 时），并允许来自 Cloudflare 的回源流量。
- Nginx 的 `server_name` 需包含 `liubo.xin`，`listen` 为 80 或 443；反向代理到 **127.0.0.1:3000**（或 Docker 网段内的 `portfolio-web:3000`）。若用 Full/Full (strict)，Nginx 需配置 SSL 并指向有效证书。

## 5. 本应用说明

- 本站为静态/服务端渲染作品集，**无登录、会话或 Cookie 鉴权**。若“登录不了”是指 **整站打不开**，按上面 1～4 步排查即可。
- 若“登录”指 **其他系统**（如 Cloudflare 控制台、服务器面板、SSH），则需在对应系统里单独排查账号与网络。

## 6. 验证通过 Cloudflare 访问正常

当 1～4 步修正后：

1. 访问 `https://liubo.xin/` 应能打开首页。
2. 访问 `https://liubo.xin/api/health?headers=1` 应返回 `{"status":"ok","headers":{...}}`，其中 `x-forwarded-proto` 通常为 `https`，`host` 为 `liubo.xin`。

若仍异常，可把 `headers` 里的内容（去掉真实 IP 若需保密）提供给运维或 Cloudflare 支持进一步排查。

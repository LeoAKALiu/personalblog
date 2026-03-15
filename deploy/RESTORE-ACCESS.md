# 恢复 https://liubo.xin 外网访问

按下列顺序在源站和 Cloudflare 完成配置，即可恢复外网访问。

---

## 一、源站：确保应用在跑

在项目目录执行：

```bash
cd /var/www/personalblog
docker compose up -d
docker compose ps   # 确认 portfolio-web 为 Up
curl -s http://localhost:3000/api/health   # 应返回 {"status":"ok"}
```

若 3000 端口无响应，先排查容器日志：`docker compose logs -f web`。

---

## 二、源站：反代 80/443 → 3000

本应用只监听 **3000**，外网 80/443 需由 Nginx 或 Nginx Proxy Manager 反代。

### 方式 A：Nginx Proxy Manager（推荐，与当前 docker 网络一致）

1. 打开 NPM 管理界面（例如 `http://服务器IP:81`）。
2. **Hosts** → **Proxy Hosts** → **Add Proxy Host**（或编辑已有 liubo.xin）：
   - **Domain Names**: `liubo.xin`（以及 `www.liubo.xin` 若需要）
   - **Scheme**: `http`
   - **Forward Hostname / IP**: `portfolio-web`（与容器同网时用容器名）或 `127.0.0.1`
   - **Forward Port**: `3000`
   - **Cache Assets**: 可选
   - **Block Common Exploits**: 建议开启
3. **SSL** 选项卡（若用 NPM 签证书）：
   - 为 liubo.xin 申请证书（Let's Encrypt），或
   - 若前面有 Cloudflare，可先不用 NPM 的 SSL，用 Cloudflare Flexible（见下）。
4. **强制 HTTPS**：编辑该 Proxy Host → 打开 **Force SSL**（或 Advanced 里自定义 `return 301 https://$host$request_uri;`），使 HTTP 自动跳转到 HTTPS。
5. 保存后，在源站本机测试：`curl -s -H "Host: liubo.xin" http://127.0.0.1/api/health` 或通过 NPM 监听端口访问，应得到 `{"status":"ok"}`。

### 方式 B：自管 Nginx

若使用系统 Nginx 而非 NPM，可参考 [deploy/nginx-liubo.xin.conf.example](nginx-liubo.xin.conf.example)，复制为站点配置并重载 Nginx：

```bash
sudo cp deploy/nginx-liubo.xin.conf.example /etc/nginx/conf.d/liubo.xin.conf
# 按需改 listen、证书路径等
sudo nginx -t && sudo systemctl reload nginx
```

---

## 三、Cloudflare：DNS + SSL

1. **DNS**
   - 在 Cloudflare 控制台 **DNS** → **Records** 中，确保有：
     - 类型 **A**，名称 `@`，内容为 **源站服务器公网 IP**。
     - 若需 `www`，可再加一条 A 或 CNAME 指向同 IP 或 `@`。
   - **代理状态**（重要）：
     - **已代理（橙云）**：流量经 Cloudflare 边缘再回源，国内访问可能较慢（无大陆节点）；适合需要 CDN/DDoS 时使用。
     - **仅 DNS（灰云）**：解析到源站 IP，用户直连源站，延迟更低；源站需自配 SSL（如 NPM + Let's Encrypt）。若遇「HTTPS 无证书」或外网很慢，建议改为 **仅 DNS（灰云）**：在 DNS 记录行点击橙云图标切换为灰云。
2. **SSL/TLS**
   - **SSL/TLS** → **概述**：
     - 源站 **仅 HTTP（Nginx 只开 80）**：选 **Flexible**。
     - 源站 **已开 HTTPS（Nginx 监听 443 并配证书）**：选 **Full** 或 **Full (strict)**（strict 需证书有效且匹配域名）。
   - 使用 **仅 DNS** 时，SSL 由源站 NPM/Let's Encrypt 提供，无需改此设置。

---

## 四、源站：防火墙

确保云厂商安全组/防火墙放行：

- **80**（Cloudflare Flexible 时回源端口）
- **443**（Cloudflare Full/Full strict 时回源端口）

本机若启用 firewalld/ufw，同样放行 80、443。

---

## 五、验证

1. 浏览器打开：`https://liubo.xin/` → 应看到本站首页。
2. 打开：`https://liubo.xin/api/health?headers=1` → 应返回 `{"status":"ok","headers":{...}}`，其中 `host` 为 `liubo.xin`，`x-forwarded-proto` 为 `https`。

若仍无法访问，参见 [docs/CLOUDFLARE.md](../docs/CLOUDFLARE.md) 做进一步排查。

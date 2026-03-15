# liubo.xin 慢访问 — 根因与修复

## 现象复核

- **nginx-app 与 portfolio-web 是否在同一 network**: 是，均在 `nginx-proxy-manage_default`（bridge, 172.18.0.0/16）
- **DNS 解析是否正常**: 正常，`getent hosts portfolio-web` → 172.18.0.10
- **TCP 连 3000 是否成功**: 修复前 —— **失败**（"No route to host"），修复后 —— **成功**（< 1ms）
- **是超时、拒绝，还是 reset**: `EHOSTUNREACH`（"No route to host"），**不是超时也不是 reset**

## 根因

**Docker 容器 MAC 地址冲突。**

| 容器 | IP | MAC (修复前) | MAC (修复后) |
|------|----|-------------|-------------|
| nginx-app | 172.18.0.3 | `02:42:ac:12:00:02` | `02:42:ac:12:00:03` |
| portfolio-web | 172.18.0.2 | `02:42:ac:12:00:02` | `02:42:ac:12:00:0a` |

Docker 根据 IP 地址生成 MAC（`02:42:` + hex(IP)）。`nginx-app` 最初创建时分配到 IP `172.18.0.2`，得到 MAC `02:42:ac:12:00:02`。后来 `portfolio-web` 加入同一网络后也拿到了 IP `172.18.0.2`（把 nginx-app 挤到 `.3`），但 **nginx-app 的 MAC 地址没有跟着更新**。

结果：同一 bridge 上两个 veth 有相同的 MAC `02:42:ac:12:00:02`，Linux bridge 的 FDB（转发数据库）无法正确区分目标端口。ARP 解析返回正确的 MAC，但 bridge 把帧发到了错误的 veth，导致 TCP SYN 无法到达 `portfolio-web`，内核返回 `EHOSTUNREACH`。

**最直接证据**:

```
# 修复前
$ docker exec nginx-app cat /sys/class/net/eth0/address  → 02:42:ac:12:00:02
$ docker exec portfolio-web cat /sys/class/net/eth0/address → 02:42:ac:12:00:02
# 完全相同！两个不同容器在同一个 bridge 上有相同 MAC

# 修复后
$ docker exec nginx-app cat /sys/class/net/eth0/address  → 02:42:ac:12:00:03
$ docker exec portfolio-web cat /sys/class/net/eth0/address → 02:42:ac:12:00:0a
# MAC 唯一，bridge 转发正确
```

NPM 只能通过 `172.18.0.1:3000`（宿主机网关 → docker-proxy → 应用容器）绕行，这条路径引入 3–4 秒延迟。

## 修复动作

### 1. 修复 MAC 冲突（立即生效）

```bash
docker network disconnect nginx-proxy-manage_default nginx-app
docker network connect nginx-proxy-manage_default nginx-app
```

### 2. 分配固定 IP 防止复发

`/var/www/personalblog/docker-compose.yml`（portfolio-web）:

```yaml
networks:
  nginx-proxy-manage_default:
    ipv4_address: 172.18.0.10   # 固定 IP → MAC 02:42:ac:12:00:0a
```

`/clouddream/nginx-proxy-manage/docker-compose.yml`（nginx-app）:

```yaml
services:
  app:
    networks:
      default:
        ipv4_address: 172.18.0.3   # 固定 IP → MAC 02:42:ac:12:00:03
networks:
  default:
    ipam:
      config:
        - subnet: 172.18.0.0/16
          gateway: 172.18.0.1
```

### 3. NPM upstream 改为容器直连

`deploy/npm-8-liubo-force-ssl.conf` 中 upstream 改为:

```nginx
upstream liubo_backend {
  server portfolio-web:3000;   # 直连容器，不再绕宿主机 docker-proxy
  keepalive 16;
}
```

### 影响范围

- 不影响其他 NPM 代理的站点
- 不影响 portfolio-web 对外端口映射（3000:3000 仍然可用）
- nginx-app 重启后固定 IP 持久化

### 回滚方式

```bash
# 恢复 portfolio-web
cd /var/www/personalblog
git checkout docker-compose.yml
docker compose down && docker compose up -d

# 恢复 nginx-app
cd /clouddream/nginx-proxy-manage
# 去掉 networks / ipam 配置
docker compose down && docker compose up -d

# 恢复 NPM 代理配置
# 把 upstream server 改回 172.18.0.1:3000
docker cp deploy/npm-8-liubo-force-ssl.conf nginx-app:/data/nginx/proxy_host/8.conf
docker exec nginx-app nginx -s reload
```

## 修复后验证

### nginx-app → portfolio-web:3000

```
HTTP 200  connect=0.004s  total=0.039s   (39ms，之前为 "No route to host" / 3-4s 绕行)
```

### HTTPS end-to-end (通过 NPM)

| 指标 | 修复前 | 修复后 |
|------|--------|--------|
| time_connect | 0.000s | 0.000s |
| time_appconnect (TLS) | 0.007s | 0.007s |
| time_starttransfer | 3.0–4.5s | **0.011s** |
| time_total | 3.0–4.5s | **0.012s** |

**提速 ~300 倍**（从 3-4 秒降到 12 毫秒）。

### Health check

```
HTTP 200  total=0.021s   (21ms)
```

### 重启持久化

nginx-app `docker compose down && up` 后，固定 IP 和 MAC 保持正确，HTTPS 仍然 12ms。

## 残留问题

1. **Cloudflare 代理（橙云）**: 如果仍开启，国内用户流量经海外节点回源会增加额外延迟（与本次修复无关）。建议切换为"仅 DNS（灰云）"。
2. **NPM UI 覆盖**: 在 NPM 管理界面编辑 `liubo.xin` 站点会覆盖 `8.conf`，需要重新 `docker cp` 部署补丁文件。
3. **Next.js 冷启动**: 首次请求（容器刚启动后）仍需 ~15s 编译页面；后续请求均为毫秒级。可用 `deploy/warmup.sh` + cron 缓解。

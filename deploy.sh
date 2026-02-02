#!/bin/bash

# Configuration
SERVER_IP="47.98.176.41"
USER="root"
REMOTE_DIR="/var/www/personalblog"

echo "🚀 Starting Deployment to Alibaba Cloud ($SERVER_IP)..."

# 0. Pre-flight: Ensure remote server has rsync, docker, and directory
echo "🔍 Checking remote dependencies..."
ssh $USER@$SERVER_IP << 'EOF'
  set -e
  
  # 1. Configure Docker Registry Mirror
  echo "🇨🇳 Configuring Docker Registry Mirrors for China..."
  mkdir -p /etc/docker
  cat > /etc/docker/daemon.json <<DOCKERCONF
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://docker.1panel.live",
    "https://hub.rat.dev",
    "https://dockerproxy.com"
  ]
}
DOCKERCONF
  systemctl daemon-reload
  systemctl restart docker

  # 2. CRITICAL: Stop existing web servers AND kill port 80 processes
  echo "🛑 Stopping conflicting web services..."
  systemctl stop nginx || true
  systemctl stop httpd || true
  systemctl stop apache2 || true
  
  # Aggressive port 80 cleanup
  if lsof -i :80; then
    echo "⚠️  Port 80 is still in use. Killing process..."
    fuser -k -9 80/tcp || true
    sleep 2 # Wait for socket release
  fi

  # 3. Create project directory
  mkdir -p /var/www/personalblog
EOF

# 1. Sync files
echo "📦 Syncing files..."
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' ./ $USER@$SERVER_IP:$REMOTE_DIR

# 2. Remote Build & Launch
echo "🔧 Running remote build..."
ssh $USER@$SERVER_IP << 'EOF'
  cd /var/www/personalblog
  
  echo "🐳 Building and starting container..."
  
  # Stop and remove existing containers to free ports
  docker compose down --remove-orphans || true
  
  # Build and start
  if docker compose version &> /dev/null; then
    docker compose up -d --build
  elif command -v docker-compose &> /dev/null; then
    docker-compose up -d --build
  else
    apt-get install -y docker-compose-plugin || yum install -y docker-compose-plugin
    docker compose up -d --build
  fi

  docker image prune -f
EOF

echo "✅ Deployment Complete! Visit: http://$SERVER_IP"

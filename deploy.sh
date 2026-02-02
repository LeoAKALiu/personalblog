#!/bin/bash

# Configuration
SERVER_IP="47.98.176.41"
USER="root" # Replace with your username if different
REMOTE_DIR="/var/www/personalblog"

echo "🚀 Starting Deployment to Alibaba Cloud ($SERVER_IP)..."

# 1. Build & Push (Optional: if using a registry, otherwise we sync source)
# Strategy: Sync source code and build on server (simplest for single server)

echo "📦 Syncing files..."
# Exclude node_modules, .next, .git to save bandwidth
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' ./ $USER@$SERVER_IP:$REMOTE_DIR

echo "🔧 Running remote build..."
ssh $USER@$SERVER_IP << 'EOF'
  cd /var/www/personalblog
  
  # Ensure Docker is installed (Basic check)
  if ! command -v docker &> /dev/null; then
      echo "Docker not found. Installing..."
      curl -fsSL https://get.docker.com | sh
  fi

  # Start/Rebuild Container
  echo "🐳 Building and starting container..."
  docker compose up -d --build

  # Cleanup unused images
  docker image prune -f
EOF

echo "✅ Deployment Complete! Visit: http://$SERVER_IP:3000"

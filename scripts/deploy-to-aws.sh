#!/usr/bin/env bash
# Deploy Strapi to AWS EC2 via SSH using the PEM key.
# Usage:
#   AWS_EC2_HOST=ec2-xx-xx-xx-xx.eu-north-1.compute.amazonaws.com ./scripts/deploy-to-aws.sh
#   ./scripts/deploy-to-aws.sh ec2-xx-xx-xx-xx.eu-north-1.compute.amazonaws.com
#
# Set these in .env or export before running:
#   AWS_EC2_HOST    - EC2 instance hostname or IP
#   AWS_EC2_USER    - SSH user (e.g. ec2-user for Amazon Linux, ubuntu for Ubuntu)
#   STRAPI_PEM_PATH - Path to .pem key (default: /Users/chitrajain/Documents/Code/XoidLabs/Library/strapi-key.pem)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PEM_PATH="${STRAPI_PEM_PATH:-/Users/chitrajain/Documents/Code/XoidLabs/Library/strapi-key.pem}"
EC2_HOST="${AWS_EC2_HOST:-$1}"
EC2_USER="${AWS_EC2_USER:-ec2-user}"
REMOTE_APP_DIR="${AWS_STRAPI_APP_DIR:-/home/$EC2_USER/strapi-backend}"

if [ -z "$EC2_HOST" ]; then
  echo "Usage: AWS_EC2_HOST=hostname $0"
  echo "   or: $0 <ec2-hostname-or-ip>"
  echo ""
  echo "Optional: AWS_EC2_USER=ubuntu STRAPI_PEM_PATH=/path/to/key.pem"
  exit 1
fi

if [ ! -f "$PEM_PATH" ]; then
  echo "PEM file not found: $PEM_PATH"
  exit 1
fi

chmod 400 "$PEM_PATH" 2>/dev/null || true

echo "Building Strapi..."
cd "$PROJECT_ROOT"
npm run build

echo "Syncing to EC2 ($EC2_USER@$EC2_HOST)..."
rsync -avz --delete \
  -e "ssh -i $PEM_PATH -o StrictHostKeyChecking=no" \
  --exclude 'node_modules' \
  --exclude '.tmp' \
  --exclude '.cache' \
  --exclude 'build' \
  --exclude '.env' \
  --exclude '*.log' \
  "$PROJECT_ROOT/" "$EC2_USER@$EC2_HOST:$REMOTE_APP_DIR/"

echo "Running npm install and restart on EC2..."
ssh -i "$PEM_PATH" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" << EOF
  cd $REMOTE_APP_DIR
  npm install --production
  npm run build
  (pm2 restart strapi 2>/dev/null) || (pm2 start npm --name strapi -- start)
  pm2 save
EOF

echo "Deploy done. Strapi should be running on $EC2_HOST."

#!/bin/bash

# Anti-Tutorial Hell Production Deployment Script
# Usage: ./deploy.sh [environment]

set -e

# Configuration
ENVIRONMENTS=("staging" "production")
DOCKER_REGISTRY="ghcr.io"
IMAGE_NAME="mahfuz0001/sense"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if environment is provided
ENVIRONMENT=${1:-staging}

if [[ ! " ${ENVIRONMENTS[@]} " =~ " ${ENVIRONMENT} " ]]; then
    log_error "Invalid environment: $ENVIRONMENT"
    log_info "Available environments: ${ENVIRONMENTS[*]}"
    exit 1
fi

log_info "Starting deployment for environment: $ENVIRONMENT"

# Check dependencies
log_info "Checking dependencies..."
command -v docker >/dev/null 2>&1 || { log_error "Docker is not installed. Aborting."; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { log_error "Docker Compose is not installed. Aborting."; exit 1; }

# Load environment variables
ENV_FILE=".env.${ENVIRONMENT}"
if [[ -f "$ENV_FILE" ]]; then
    log_info "Loading environment variables from $ENV_FILE"
    set -a
    source "$ENV_FILE"
    set +a
else
    log_warning "Environment file $ENV_FILE not found. Using .env.example"
    if [[ -f ".env.example" ]]; then
        cp .env.example "$ENV_FILE"
        log_warning "Created $ENV_FILE from template. Please update with actual values."
    fi
fi

# Build and test
log_info "Building application..."
npm ci
npm run build

log_info "Running tests..."
if grep -q '"test"' package.json; then
    npm test
else
    log_warning "No tests found, skipping test phase"
fi

# Security check
log_info "Running security audit..."
npm audit --audit-level moderate || log_warning "Security vulnerabilities found. Consider fixing before deployment."

# Build Docker image
IMAGE_TAG="${DOCKER_REGISTRY}/${IMAGE_NAME}:${ENVIRONMENT}-$(date +%Y%m%d-%H%M%S)"
LATEST_TAG="${DOCKER_REGISTRY}/${IMAGE_NAME}:${ENVIRONMENT}-latest"

log_info "Building Docker image: $IMAGE_TAG"
docker build -t "$IMAGE_TAG" -t "$LATEST_TAG" .

# Push to registry (if not local deployment)
if [[ "$ENVIRONMENT" != "local" ]]; then
    log_info "Pushing Docker image to registry..."
    docker push "$IMAGE_TAG"
    docker push "$LATEST_TAG"
fi

# Deploy using Docker Compose
log_info "Deploying with Docker Compose..."

# Create docker-compose override for environment
cat > "docker-compose.${ENVIRONMENT}.yml" << EOF
version: '3.8'
services:
  app:
    image: ${LATEST_TAG}
    environment:
      - NODE_ENV=${NODE_ENV:-production}
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - REDIS_URL=${REDIS_URL:-redis://redis:6379}
      - ENABLE_CACHING=${ENABLE_CACHING:-true}
      - ENABLE_ANALYTICS=${ENABLE_ANALYTICS:-false}
      - SENTRY_DSN=${SENTRY_DSN}
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.app.rule=Host(\`${DOMAIN:-localhost}\`)"
      - "traefik.http.routers.app.tls=true"
      - "traefik.http.routers.app.tls.certresolver=letsencrypt"
EOF

# Deploy
docker-compose -f docker-compose.yml -f "docker-compose.${ENVIRONMENT}.yml" up -d

# Wait for services to be ready
log_info "Waiting for services to start..."
sleep 30

# Health check
log_info "Running health check..."
HEALTH_URL="http://localhost:3000/api/health"
if [[ -n "$DOMAIN" ]]; then
    HEALTH_URL="https://${DOMAIN}/api/health"
fi

MAX_RETRIES=10
RETRY_COUNT=0

while [[ $RETRY_COUNT -lt $MAX_RETRIES ]]; do
    if curl -f "$HEALTH_URL" >/dev/null 2>&1; then
        log_success "Health check passed!"
        break
    else
        log_warning "Health check failed, retrying in 10 seconds... ($((RETRY_COUNT + 1))/$MAX_RETRIES)"
        sleep 10
        ((RETRY_COUNT++))
    fi
done

if [[ $RETRY_COUNT -eq $MAX_RETRIES ]]; then
    log_error "Health check failed after $MAX_RETRIES attempts"
    exit 1
fi

# Database migration (if needed)
if [[ -f "database/migrate.sql" ]]; then
    log_info "Running database migrations..."
    # Add your database migration logic here
    # e.g., psql $DATABASE_URL < database/migrate.sql
fi

# Clean up old images
log_info "Cleaning up old Docker images..."
docker image prune -f

# Summary
log_success "Deployment completed successfully!"
log_info "Environment: $ENVIRONMENT"
log_info "Image: $IMAGE_TAG"
log_info "Health check URL: $HEALTH_URL"

if [[ "$ENVIRONMENT" == "production" ]]; then
    log_info "Production deployment completed. Monitor logs and metrics."
    log_info "View logs: docker-compose logs -f app"
    log_info "Monitor health: watch -n 30 curl -s $HEALTH_URL"
fi
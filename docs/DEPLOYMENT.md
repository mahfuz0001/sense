# Production Deployment Guide

## Overview
This guide covers deploying the Anti-Tutorial Hell SaaS platform to production using Docker, Docker Compose, and various cloud providers.

## Prerequisites

### Required Software
- Docker 20.10 or later
- Docker Compose 2.0 or later
- Node.js 18 or later (for development)
- Git

### Required Services
- Supabase project (database and authentication)
- Domain name with SSL certificate
- Redis instance (optional, for caching)
- Email service (optional, for notifications)

## Environment Setup

### 1. Environment Configuration
Copy the environment template and configure your production values:

```bash
cp .env.example .env.production
```

Edit `.env.production` with your production values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Security
NEXTAUTH_SECRET=your-super-secure-secret-key-min-32-chars
NEXTAUTH_URL=https://yourdomain.com

# Redis (Optional)
REDIS_URL=redis://your-redis-host:6379
REDIS_PASSWORD=your-redis-password

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_CACHING=true
NODE_ENV=production
```

### 2. Database Setup
Run the database schema in your Supabase project:

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Execute the script

### 3. SSL Certificate
For production deployment with HTTPS:

#### Option A: Let's Encrypt (Recommended)
```bash
# Install certbot
sudo apt-get update
sudo apt-get install snapd
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com
```

#### Option B: Custom Certificate
Place your SSL files in the `ssl/` directory:
- `ssl/cert.pem` - Certificate file
- `ssl/key.pem` - Private key file

## Deployment Methods

### Method 1: Docker Compose (Recommended)

#### Quick Deployment
```bash
# Clone the repository
git clone https://github.com/mahfuz0001/sense.git
cd sense

# Configure environment
cp .env.example .env.production
# Edit .env.production with your values

# Deploy
./deploy.sh production
```

#### Manual Deployment
```bash
# Build the application
npm ci
npm run build

# Build Docker image
docker build -t anti-tutorial-hell:latest .

# Start services
docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d

# Verify deployment
curl https://yourdomain.com/api/health
```

### Method 2: Cloud Deployment

#### Vercel Deployment
1. Fork the repository
2. Connect to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod
```

#### Railway Deployment
1. Connect GitHub repository to Railway
2. Configure environment variables
3. Deploy with automatic builds

#### DigitalOcean App Platform
1. Create new app from GitHub repository
2. Configure build and run commands:
   - Build: `npm run build`
   - Run: `npm start`
3. Set environment variables
4. Deploy

### Method 3: VPS/Server Deployment

#### Prerequisites
- Ubuntu 20.04 or later
- 2GB RAM minimum
- 20GB storage minimum

#### Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Nginx (for reverse proxy)
sudo apt install nginx -y

# Configure firewall
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

#### Application Deployment
```bash
# Clone repository
git clone https://github.com/mahfuz0001/sense.git
cd sense

# Setup environment
cp .env.example .env.production
# Edit configuration

# Deploy
./deploy.sh production

# Setup Nginx reverse proxy
sudo cp nginx.conf /etc/nginx/sites-available/anti-tutorial-hell
sudo ln -s /etc/nginx/sites-available/anti-tutorial-hell /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Post-Deployment

### 1. Health Check
Verify all services are running:
```bash
curl https://yourdomain.com/api/health?detailed=true
```

### 2. Monitoring Setup

#### Application Logs
```bash
# View application logs
docker-compose logs -f app

# View specific service logs
docker-compose logs -f redis
docker-compose logs -f nginx
```

#### Health Monitoring
Set up automated health checks:
```bash
# Add to crontab
*/5 * * * * curl -f https://yourdomain.com/api/health || echo "Health check failed" | mail -s "Site Down" admin@yourdomain.com
```

### 3. Database Monitoring
Monitor database performance in Supabase dashboard:
- Query performance
- Connection usage
- Storage usage
- API request patterns

### 4. Security Checklist
- [ ] SSL certificate installed and valid
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] Regular security updates scheduled
- [ ] Backup procedures in place
- [ ] Rate limiting configured
- [ ] Monitoring and alerting set up

## Maintenance

### Updates and Patches
```bash
# Pull latest changes
git pull origin main

# Redeploy
./deploy.sh production

# Verify deployment
curl https://yourdomain.com/api/health
```

### Database Backups
Supabase automatically handles database backups, but you can also:
```bash
# Manual backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
psql $DATABASE_URL < backup_file.sql
```

### Scaling

#### Horizontal Scaling
```bash
# Scale application instances
docker-compose up -d --scale app=3

# Load balancer configuration required
```

#### Vertical Scaling
- Increase server resources (CPU, RAM)
- Optimize database queries
- Enable Redis caching
- Implement CDN for static assets

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check build logs
docker-compose logs builder

# Clean build
docker system prune -a
docker-compose build --no-cache
```

#### Database Connection Issues
```bash
# Verify environment variables
docker-compose exec app env | grep SUPABASE

# Test database connection
docker-compose exec app node -e "
const { db } = require('./dist/lib/supabase.js');
db.healthCheck().then(console.log);
"
```

#### SSL Certificate Issues
```bash
# Check certificate validity
openssl x509 -in ssl/cert.pem -text -noout

# Renew Let's Encrypt certificate
sudo certbot renew
```

### Performance Optimization

#### Enable Caching
```env
ENABLE_CACHING=true
REDIS_URL=redis://your-redis-host:6379
```

#### Database Optimization
- Enable connection pooling
- Optimize query performance
- Monitor slow queries
- Use database indexes

#### CDN Setup
Configure CDN for static assets:
- Images and media files
- CSS and JavaScript bundles
- Font files

## Support

For deployment issues:
1. Check the troubleshooting section
2. Review application logs
3. Verify environment configuration
4. Check health endpoints
5. Contact support with detailed error information

## Security Considerations

- Keep all dependencies up to date
- Regular security audits
- Monitor for vulnerabilities
- Implement proper access controls
- Use strong authentication
- Regular backup testing
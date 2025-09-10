# TheChief.quest - Setup Requirements & Configuration

## Overview

This document contains all setup requirements, API key configurations, and integration instructions for TheChief.quest. Follow this guide to properly configure all services and automations.

## Required Accounts & API Keys

### 1. Sanity CMS

**Account Setup**:
1. Go to [sanity.io](https://sanity.io)
2. Create free account
3. Create new project: "thechief-quest"

**API Keys Required**:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=    # Found in sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                 # Create in Settings → API → Tokens
SANITY_WEBHOOK_SECRET=            # Generate: openssl rand -hex 32
```

**Token Permissions**:
- Create token with "Editor" role
- Name it: "Production API Token"
- Save securely (can't view again)

### 2. OpenAI

**Account Setup**:
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create account and add billing
3. Navigate to API Keys section

**API Key**:
```bash
OPENAI_API_KEY=sk-...             # Create new secret key
```

**Usage Limits**:
- Set monthly spend limit: $100
- Monitor usage dashboard daily

### 3. Firecrawl (Job Scraping)

**Account Setup**:
1. Go to [firecrawl.dev](https://firecrawl.dev)
2. Sign up for free tier
3. Get API key from dashboard

**API Key**:
```bash
FIRECRAWL_API_KEY=                # From dashboard
```

**Free Tier Limits**:
- 100 pages/month
- Upgrade to $49/month for 10,000 pages

### 4. Vercel

**Account Setup**:
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. No credit card needed for hobby tier

**API Token** (for CLI deployments):
```bash
VERCEL_TOKEN=                     # Create in Settings → Tokens
VERCEL_ORG_ID=                    # Found in Settings → General
VERCEL_PROJECT_ID=                # Created after first deployment
```

### 5. Google Analytics 4

**Setup**:
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create new GA4 property
3. Add data stream for web

**Tracking ID**:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX    # From Admin → Data Streams
```

### 6. Sentry (Error Tracking)

**Account Setup**:
1. Go to [sentry.io](https://sentry.io)
2. Create new project (Next.js)
3. Get DSN from project settings

**Configuration**:
```bash
SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=                # For source maps
SENTRY_ORG=                       # Organization slug
SENTRY_PROJECT=                   # Project name
```

### 7. Clerk (Authentication) - Phase 2

**For Future Implementation**:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

## GitHub → Vercel Auto-Deployment

### 1. GitHub Repository Setup

**Create Repository**:
```bash
# Initialize repository
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo
gh repo create thechief-quest --public

# Push code
git remote add origin https://github.com/yourusername/thechief-quest.git
git push -u origin main
```

**Branch Protection**:
1. Go to Settings → Branches
2. Add rule for `main` branch:
   - ✅ Require pull request reviews
   - ✅ Dismiss stale reviews
   - ✅ Require status checks (Vercel)
   - ✅ Require branches to be up to date
   - ✅ Include administrators

### 2. GitHub Actions Configuration

**Create `.github/workflows/deploy.yml`**:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  # TypeScript Check and Auto-Fix
  typescript-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: TypeScript Check
        id: tsc
        run: |
          pnpm tsc --noEmit 2>&1 | tee typescript-errors.log
          echo "::set-output name=status::$?"
        continue-on-error: true
      
      - name: Auto-fix TypeScript errors
        if: steps.tsc.outputs.status != '0'
        run: |
          # Common auto-fixes
          pnpm tsc --noEmit --allowJs --skipLibCheck
          
          # Auto-add missing types
          pnpm add -D @types/node @types/react
          
          # Fix import issues
          pnpm eslint . --fix --ext .ts,.tsx
          
          # Commit fixes if any
          if [[ -n $(git status -s) ]]; then
            git config user.name "GitHub Actions"
            git config user.email "actions@github.com"
            git add .
            git commit -m "fix: Auto-fix TypeScript errors"
            git push
          fi

  # Deploy Preview
  deploy-preview:
    runs-on: ubuntu-latest
    needs: typescript-check
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy Preview
        run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}

  # Deploy Production
  deploy-production:
    runs-on: ubuntu-latest
    needs: typescript-check
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy to Production
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

**Create `.github/workflows/seo-check.yml`**:
```yaml
name: SEO Validation

on:
  pull_request:
    paths:
      - 'content/**'
      - 'app/**/*.tsx'

jobs:
  seo-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run SEO validation
        run: pnpm validate:seo
      
      - name: Comment PR
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '❌ SEO validation failed. Please check the logs.'
            })
```

### 3. Vercel Integration

**Connect GitHub to Vercel**:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import GitHub repository
3. Configure project:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `pnpm build`
   - Install Command: `pnpm install`

**Environment Variables in Vercel**:
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Set scopes:
   - Production: All variables
   - Preview: All except analytics
   - Development: All variables

**Deployment Protection**:
1. Settings → Git → Deployment Protection
2. Enable for production branch
3. Set password for production deployments

### 4. GitHub Secrets Configuration

**Add Secrets** (Settings → Secrets → Actions):
```bash
VERCEL_TOKEN          # From Vercel account
VERCEL_ORG_ID         # From Vercel project
VERCEL_PROJECT_ID     # From Vercel project
SANITY_API_TOKEN      # For content updates
OPENAI_API_KEY        # For AI features
```

## Mobile Design Configuration

### Responsive Breakpoints

**Tailwind Configuration** (`tailwind.config.ts`):
```typescript
module.exports = {
  theme: {
    screens: {
      'xs': '375px',    // Small mobile
      'sm': '640px',    // Large mobile
      'md': '768px',    // Tablet
      'lg': '1024px',   // Desktop
      'xl': '1280px',   // Large desktop
      '2xl': '1536px',  // Extra large
    },
    extend: {
      // Mobile-first utilities
      minHeight: {
        'touch': '44px', // Minimum touch target
      },
      padding: {
        'safe': 'env(safe-area-inset-bottom)', // iOS safe area
      }
    }
  }
}
```

### Mobile-First Components

**Example Responsive Component**:
```tsx
// components/ui/ResponsiveCard.tsx
export function ResponsiveCard({ children }) {
  return (
    <div className="
      w-full
      px-4 sm:px-6 lg:px-8
      py-4 sm:py-6
      text-sm sm:text-base
      touch-manipulation
      min-h-touch
    ">
      {children}
    </div>
  )
}
```

### PWA Configuration (Optional)

**Add to `next.config.js`**:
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  // existing config
})
```

## Monitoring & Alerts

### Vercel Monitoring

**Setup Alerts**:
1. Go to Project → Settings → Monitoring
2. Enable:
   - Build failures
   - Function errors
   - Performance degradation
3. Add notification channels:
   - Email
   - Slack (optional)

### Uptime Monitoring

**Better Uptime Configuration**:
1. Sign up at [betteruptime.com](https://betteruptime.com)
2. Add monitor:
   - URL: https://thechief.quest
   - Check frequency: 1 minute
   - Locations: Multiple
3. Set up status page

## Security Configuration

### Environment Variable Security

**Never commit**:
- `.env.local`
- `.env.production`
- Any file with API keys

**Use GitHub Secrets** for CI/CD
**Use Vercel Environment Variables** for runtime

### API Rate Limiting

**Add to `middleware.ts`**:
```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),
})

export async function middleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for')
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 })
  }
}
```

## Backup & Recovery

### Database Backups

**Sanity Backups**:
```bash
# Export dataset
npx sanity dataset export production backups/backup-$(date +%Y%m%d).tar.gz

# Import dataset
npx sanity dataset import backups/backup-20240101.tar.gz production
```

**Automated Backup** (GitHub Action):
```yaml
name: Weekly Backup

on:
  schedule:
    - cron: '0 0 * * 0' # Weekly on Sunday

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Export Sanity dataset
        run: |
          npx sanity dataset export production backup.tar.gz \
            --token ${{ secrets.SANITY_API_TOKEN }}
      
      - name: Upload to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl private
        env:
          AWS_S3_BUCKET: thechief-backups
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## Troubleshooting

### Common Issues

**TypeScript Errors in Vercel**:
- Check build logs in Vercel dashboard
- GitHub Action will attempt auto-fix
- Manual fix: `pnpm tsc --noEmit` locally

**Sanity Connection Issues**:
- Verify API token has correct permissions
- Check CORS settings in Sanity
- Ensure dataset name is correct

**Deployment Failures**:
- Check environment variables in Vercel
- Verify all secrets in GitHub
- Review build command output

### Support Contacts

- **Vercel Support**: support.vercel.com
- **Sanity Support**: slack.sanity.io
- **GitHub Actions**: github.com/support

## Checklist

### Before First Deployment

- [ ] All API keys obtained
- [ ] Environment variables set in Vercel
- [ ] GitHub secrets configured
- [ ] GitHub Actions workflows created
- [ ] Branch protection enabled
- [ ] Sanity project created
- [ ] Analytics configured
- [ ] Error tracking setup
- [ ] Backup strategy implemented

### Post-Deployment

- [ ] Verify all routes work
- [ ] Test mobile responsiveness
- [ ] Confirm analytics tracking
- [ ] Check error reporting
- [ ] Validate SEO metadata
- [ ] Test GitHub Actions
- [ ] Monitor performance

---

*Last Updated: December 2024*
*Keep this document updated with any new services or configuration changes.*
# TheChief.quest - Quick Start Guide

## Overview

Get TheChief.quest up and running in under 30 minutes. This guide walks you through the essential setup steps to launch your Chief of Staff content platform.

## Prerequisites

Before starting, ensure you have:

- **Node.js** 18.17 or later
- **npm** or **pnpm** (recommended)
- **Git** installed
- **Vercel account** (free tier works)
- **Sanity account** (free tier works)
- **Code editor** (VS Code recommended)

## Step 1: Clone and Setup (5 minutes)

### 1.1 Clone the Repository
```bash
# Clone the project
git clone https://github.com/yourusername/thechief-quest.git
cd thechief-quest

# Install dependencies
pnpm install
# or
npm install
```

### 1.2 Create Environment Files
```bash
# Copy example env file
cp .env.example .env.local
```

## Step 2: Sanity Setup (10 minutes)

### 2.1 Create Sanity Project
```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Initialize Sanity in the sanity folder
cd sanity
sanity init

# Choose:
# - Create new project
# - Public dataset name: production
# - Use TypeScript: Yes
```

### 2.2 Get Sanity Credentials
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **Settings → API**
4. Copy your Project ID
5. Create a token with Editor permissions
6. Add to `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token-here
SANITY_WEBHOOK_SECRET=generate-random-string
```

### 2.3 Deploy Sanity Schemas
```bash
# In the sanity folder
cd sanity
sanity schema deploy
sanity graphql deploy
```

### 2.4 Start Sanity Studio
```bash
# Run Sanity Studio locally
sanity dev

# Studio will be available at http://localhost:3333
```

## Step 3: Configure MCP for Content Generation (5 minutes)

### 3.1 Install Claude Desktop
Download from [claude.ai/download](https://claude.ai/download)

### 3.2 Configure MCP
Add to Claude Desktop settings:
```json
{
  "mcpServers": {
    "sanity": {
      "url": "https://mcp.sanity.io",
      "type": "http",
      "headers": {
        "Authorization": "Bearer YOUR_SANITY_TOKEN"
      }
    }
  }
}
```

### 3.3 Test MCP Connection
In Claude Desktop:
```
Test Sanity MCP connection and create a test document
```

## Step 4: Next.js Configuration (5 minutes)

### 4.1 Update next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  experimental: {
    taint: true,
  },
}

module.exports = nextConfig
```

### 4.2 Start Development Server
```bash
# In the root directory
pnpm dev
# or
npm run dev

# App will be available at http://localhost:3000
```

### 4.3 Verify Installation
Visit these URLs to confirm setup:
- http://localhost:3000 - Homepage
- http://localhost:3000/llms.txt - AI discovery endpoint
- http://localhost:3333 - Sanity Studio

## Step 5: Create First Content (5 minutes)

### 5.1 Create Author
In Sanity Studio (http://localhost:3333):
1. Click **Authors**
2. Click **Create**
3. Fill in:
   - Name: Your Name
   - Bio: Your background
   - Credentials: Your expertise
4. Click **Publish**

### 5.2 Create First Chief of Staff Page
1. Click **Chief of Staff Content**
2. Click **Create**
3. Fill in required fields:
   - Title: "Chief of Staff Jobs in London"
   - Slug: "chief-of-staff-london"
   - Meta Description: "Find Chief of Staff roles in London..."
   - TLDR: "Chief of Staff roles in London pay £80-150K"
   - Location: London
   - Content: Add some paragraphs
4. Click **Publish**

### 5.3 Verify Content
Visit: http://localhost:3000/chief-of-staff-london

## Step 6: Deploy to Production (5 minutes)

### 6.1 Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project: No
# - What's your project name: thechief-quest
# - Which directory: ./
# - Override settings: No
```

### 6.2 Configure Production Environment
In Vercel Dashboard:
1. Go to **Settings → Environment Variables**
2. Add all variables from `.env.local`
3. Redeploy to apply changes

### 6.3 Configure Custom Domain
1. Go to **Settings → Domains**
2. Add `thechief.quest`
3. Follow DNS configuration instructions

## Rapid Content Generation

### Using Claude Desktop with MCP

Once MCP is configured, you can generate content rapidly:

```
Generate 10 Chief of Staff location pages for UK cities with proper SEO optimization, 
each with 2000+ words, salary data, and agency listings.
```

### Bulk Generation Script
```bash
# Run content generation script
pnpm generate:content -- --type location --count 10

# Generate FAQ content
pnpm generate:content -- --type faq --count 50

# Generate agency profiles
pnpm generate:content -- --type agency --count 20
```

## Essential Commands

### Development
```bash
pnpm dev          # Start Next.js dev server
pnpm sanity:dev   # Start Sanity Studio
pnpm build        # Build for production
pnpm start        # Start production server
```

### Content Management
```bash
pnpm generate     # Generate content via MCP
pnpm validate:seo # Validate SEO requirements
pnpm update:timestamps # Update content freshness
```

### Testing
```bash
pnpm test         # Run unit tests
pnpm test:e2e     # Run E2E tests
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
```

### Deployment
```bash
pnpm deploy       # Deploy to Vercel
pnpm deploy:preview # Deploy preview branch
```

## Common Issues & Solutions

### Issue: "Cannot find module '@sanity/client'"
**Solution**: Run `pnpm install` in the root directory

### Issue: "Invalid project ID"
**Solution**: Check NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local

### Issue: "CORS error when fetching from Sanity"
**Solution**: Add your domain to Sanity CORS settings:
1. Go to sanity.io/manage
2. Settings → API → CORS origins
3. Add http://localhost:3000 and your production domain

### Issue: "llms.txt not working"
**Solution**: Check the route file exists at `app/llms.txt/route.ts`

### Issue: "Images not loading"
**Solution**: Ensure cdn.sanity.io is in next.config.js image domains

## Next Steps

### Week 1 Goals
- [ ] Generate 50+ location and industry pages
- [ ] Create 20+ agency profiles
- [ ] Set up job scraping pipeline
- [ ] Configure analytics

### Week 2 Goals
- [ ] Generate 200+ pages total
- [ ] Implement search functionality
- [ ] Add newsletter signup
- [ ] Launch SEO campaign

### Month 1 Goals
- [ ] 1000+ pages published
- [ ] Daily content pipeline operational
- [ ] First organic traffic arriving
- [ ] Premium features ready

## Monitoring Setup

### 1. Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: thechief.quest
3. Verify ownership
4. Submit sitemap: thechief.quest/sitemap.xml

### 2. Google Analytics
1. Create GA4 property
2. Add to .env.local: `NEXT_PUBLIC_GA_ID=G-XXXXXXXX`
3. Deploy changes

### 3. Vercel Analytics
Automatically enabled with Vercel deployment

## Support Resources

### Documentation
- [Full Documentation](/docs)
- [Content Strategy](/docs/CONTENT_STRATEGY.md)
- [SEO Requirements](/docs/SEO_REQUIREMENTS.md)
- [Technical Architecture](/docs/TECHNICAL_ARCHITECTURE.md)

### Getting Help
- GitHub Issues: [github.com/yourusername/thechief-quest/issues](https://github.com/yourusername/thechief-quest/issues)
- Discord: [Join our community](https://discord.gg/thechief)
- Email: dev@thechief.quest

## Quick Wins Checklist

### Day 1
- [x] Environment setup complete
- [x] Sanity Studio running
- [x] First page published
- [x] Site deployed to Vercel

### Week 1
- [ ] 50+ pages generated
- [ ] Analytics configured
- [ ] SEO optimized
- [ ] llms.txt operational

### Month 1
- [ ] 1000+ pages live
- [ ] Ranking for target keywords
- [ ] Daily traffic arriving
- [ ] Revenue model activated

## Advanced Configuration

### Custom Domain Email
```bash
# MX Records for Google Workspace
Type: MX, Priority: 1, Value: aspmx.l.google.com
Type: MX, Priority: 5, Value: alt1.aspmx.l.google.com
```

### CDN Configuration
```bash
# Cloudflare settings
SSL: Full (strict)
Caching: Standard
Minification: HTML, CSS, JS
```

### Monitoring Alerts
```javascript
// Example Sentry configuration
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
})
```

## Production Checklist

Before going live:

### Technical
- [ ] All environment variables set
- [ ] SSL certificate active
- [ ] Robots.txt configured
- [ ] Sitemap.xml working
- [ ] 404 page created

### SEO
- [ ] Meta tags on all pages
- [ ] Schema markup implemented
- [ ] Internal linking complete
- [ ] Image alt texts added
- [ ] Core Web Vitals passing

### Legal
- [ ] Privacy Policy published
- [ ] Terms of Service published
- [ ] Cookie consent (if needed)
- [ ] GDPR compliance

### Performance
- [ ] Page speed <3 seconds
- [ ] Images optimized
- [ ] Caching configured
- [ ] CDN active
- [ ] Error tracking enabled

## Conclusion

You now have TheChief.quest running! Start generating content immediately using Claude Desktop with MCP, and follow the implementation roadmap to achieve market dominance.

Remember: **Speed is key**. Generate content aggressively in the first 2 weeks to establish authority.

---

*Last Updated: December 2024*
*Setup Time: ~30 minutes*
*Questions? Create an issue on GitHub*
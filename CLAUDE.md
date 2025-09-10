# CLAUDE.md - TheChief.quest Project Overview

## 🎯 Kickoff

**Project**: TheChief.quest - AI-authoritative platform for Chief of Staff careers
**Domain**: thechief.quest (registered)
**Status**: ✅ MVP Live - Growth Phase
**Timeline**: 2 weeks to MVP, 6 months to market dominance

## ✅ To-Do (Priority Order)

### Completed (Phase 1 - MVP)
1. [x] Set up Sanity project and get API keys
2. [x] Initialize Next.js 15 with TypeScript
3. [x] Configure GitHub → Vercel auto-deployment
4. [x] Create Sanity schemas
5. [x] Build responsive design system
6. [x] Implement dynamic content routes
7. [x] Generate 58+ content pages
8. [x] Submit sitemap to Google Search Console
9. [x] Fix all TypeScript/build errors
10. [x] Launch site at thechief.quest

### Phase 2 - Growth (Current)
1. [ ] Add Google Analytics (GA4)
2. [ ] Create remaining location×industry pages (90+)
3. [ ] Implement job board with real listings
4. [ ] Add email capture and newsletter
5. [ ] Create blog section for SEO
6. [ ] Build salary calculator tool
7. [ ] Add search functionality
8. [ ] Set up MCP for AI content generation
9. [ ] Implement contact forms
10. [ ] Monitor SEO and iterate

## ⚠️ Outstanding

- Mobile design approach (responsive vs separate app) - **Decision: Responsive only**
- API keys needed (Sanity, OpenAI, Firecrawl)
- GitHub Actions configuration for TypeScript fixes
- Design system and UI components
- Image generation strategy

## 📋 Overview

TheChief.quest is a content-dominant SEO platform targeting Chief of Staff and Executive Assistant roles across UK, Europe, and Middle East. Using Sanity CMS with AI-powered content generation, we'll create 1,500+ pages optimized for both traditional search and AI discovery (llms.txt).

**Key Innovation**: Trinity-based matching + voice-first interface + authority lists

## 📝 Description

A Sanity-first content platform that:
- Serves 3 audiences: Job seekers, Recruiters, Companies
- Covers 20 cities across UK, Europe, Middle East
- Generates 120+ location × industry combination pages
- Provides real-time salary data and job listings
- Ranks recruitment agencies
- Optimizes for Google, AI, and voice search

## 🔧 Product Requirements

### Core Features
- **Content Pages**: Location, Industry, Location×Industry, Agency profiles, FAQs
- **Dynamic Formats**: .html (humans), .md (AI), .json (APIs)
- **SEO Strict**: Meta title <70 chars with keyword, Meta description <200 chars
- **AI Ready**: llms.txt endpoint, structured data, knowledge graph
- **Responsive Design**: Mobile-first, single codebase (no separate app)

### Non-Functional Requirements
- Page load <2 seconds
- 99.9% uptime
- WCAG 2.1 AA accessibility
- GDPR compliant
- Core Web Vitals passing

## 💻 Tech Stack

```typescript
{
  // Core
  cms: 'Sanity Studio v3',
  framework: 'Next.js 15 App Router',
  language: 'TypeScript 5.3',
  styling: 'Tailwind CSS 3.4',
  
  // Infrastructure  
  hosting: 'Vercel',
  cdn: 'Cloudflare',
  analytics: 'GA4 + Vercel',
  
  // AI & Automation
  mcp: 'https://mcp.sanity.io',
  scraping: 'Firecrawl',
  ai: 'OpenAI API',
  
  // Dev Tools
  vcs: 'GitHub',
  ci: 'GitHub Actions',
  monitoring: 'Sentry'
}
```

## 📁 Key Documentation

### Strategy & Planning
- [BMAD Methodology](docs/BMAD_METHODOLOGY.md) - Development approach
- [Content Strategy](docs/CONTENT_STRATEGY.md) - 1,500+ page plan
- [Implementation Roadmap](docs/IMPLEMENTATION_ROADMAP.md) - Day-by-day timeline

### Technical Guides
- [Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md) - System design
- [Sanity Schemas](docs/SANITY_SCHEMAS.md) - Data models
- [Project Structure](docs/PROJECT_STRUCTURE.md) - File organization

### Requirements & Standards
- [SEO Requirements](docs/SEO_REQUIREMENTS.md) - **CRITICAL: Read first**
- [AI Optimization](docs/AI_OPTIMIZATION.md) - LLM and voice search
- [Content Templates](docs/CONTENT_TEMPLATES.md) - Page patterns

### Setup & Operations
- [Quick Start](docs/QUICK_START.md) - 30-minute setup
- [Scalability](docs/SCALABILITY.md) - Multi-category expansion
- [Setup Requirements](docs/SETUP_REQUIREMENTS.md) - API keys & configuration

## 🔑 Required API Keys

```bash
# Add to .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=    # From sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                 # Create with Editor permissions
SANITY_WEBHOOK_SECRET=            # Generate random string

OPENAI_API_KEY=                   # From platform.openai.com
FIRECRAWL_API_KEY=                # From firecrawl.dev

NEXT_PUBLIC_GA_ID=                # Google Analytics
VERCEL_TOKEN=                     # For deployments
SENTRY_DSN=                       # Error tracking
```

## 🚀 Quick Commands

```bash
# Development
pnpm dev          # Start Next.js
pnpm sanity:dev   # Start Sanity Studio

# Content
pnpm generate     # Generate content via MCP
pnpm validate:seo # Check SEO compliance

# Deployment
pnpm deploy       # Deploy to Vercel
```

## 🎨 Design Approach

**Decision: Responsive Web Only**
- Mobile-first responsive design using Tailwind CSS
- No separate mobile app (unnecessary complexity)
- Breakpoints: Mobile (375px), Tablet (768px), Desktop (1024px+)
- Touch-optimized interactions
- Progressive enhancement

## 🔄 GitHub → Vercel Auto-Deployment

See [Setup Requirements](docs/SETUP_REQUIREMENTS.md#github-vercel-integration) for:
- GitHub Actions configuration
- TypeScript error auto-fixing
- Branch protection rules
- Deployment safeguards

## ⚡ Priority Actions

1. **Today**: Set up Sanity project, get API keys
2. **Tomorrow**: Initialize codebase, configure GitHub
3. **This Week**: Build core schemas, generate first content
4. **Next Week**: Launch with 200+ pages

## 🎯 Success Metrics

- Week 2: 200 pages, llms.txt live
- Month 1: 1,000 pages, top 20 rankings
- Month 3: #1 "Chief of Staff UK"
- Month 6: 50K daily visitors, £50K MRR

---

*For detailed information on any topic, refer to the linked documentation files.*
*This file should remain concise - detailed information belongs in dedicated docs.*
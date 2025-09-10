# TheChief.quest - Project Structure

## Overview

This document details the complete file and folder structure for TheChief.quest, explaining the purpose of each directory and key files. The structure is optimized for scalability, maintainability, and developer experience.

## Root Directory Structure

```
thechief-quest/
├── .github/                 # GitHub configuration
├── .husky/                  # Git hooks
├── .vscode/                 # VS Code settings
├── app/                     # Next.js 15 App Router
├── components/              # React components
├── docs/                    # Project documentation
├── lib/                     # Utility functions
├── public/                  # Static assets
├── sanity/                  # Sanity Studio
├── scripts/                 # Automation scripts
├── styles/                  # Global styles
├── tests/                   # Test files
├── .env.local              # Local environment variables
├── .env.production         # Production environment variables
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── .prettierrc             # Prettier configuration
├── next-env.d.ts           # Next.js TypeScript definitions
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── README.md               # Project overview
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Detailed Directory Structure

### `/app` - Next.js App Router

```
app/
├── (site)/                           # Public site group
│   ├── layout.tsx                   # Site layout
│   ├── page.tsx                     # Homepage
│   ├── [...slug]/                   # Dynamic content pages
│   │   ├── page.tsx                 # HTML renderer
│   │   └── route.ts                 # .md/.json API
│   ├── [location]/                  # Location pages
│   │   └── page.tsx
│   ├── [industry]/                  # Industry pages
│   │   └── page.tsx
│   ├── agencies/                    # Agency listings
│   │   ├── page.tsx                 # Agency list
│   │   └── [slug]/                  # Agency profiles
│   │       └── page.tsx
│   ├── jobs/                        # Job board
│   │   ├── page.tsx                 # Job listings
│   │   └── [id]/                    # Job details
│   │       └── page.tsx
│   ├── guides/                      # How-to guides
│   │   ├── page.tsx                 # Guide index
│   │   └── [slug]/                  # Individual guides
│   │       └── page.tsx
│   ├── salary/                      # Salary information
│   │   ├── page.tsx                 # Salary overview
│   │   └── [category]/              # Specific salary data
│   │       └── page.tsx
│   └── news/                        # News and updates
│       ├── page.tsx                 # News index
│       └── [slug]/                  # News articles
│           └── page.tsx
├── api/                              # API routes
│   ├── content/                     # Content API
│   │   └── [slug]/
│   │       └── route.ts
│   ├── search/                      # Search API
│   │   └── route.ts
│   ├── agent/                       # AI agent API
│   │   └── route.ts
│   ├── webhooks/                    # Webhook handlers
│   │   └── sanity/
│   │       └── route.ts
│   └── jobs/                        # Jobs API
│       ├── scrape/
│       │   └── route.ts
│       └── apply/
│           └── route.ts
├── llms.txt/                        # AI discovery endpoint
│   └── route.ts
├── llms-full.txt/                   # Full AI content
│   └── route.ts
├── sitemap.xml/                     # Dynamic sitemap
│   └── route.ts
├── robots.txt/                      # Robots file
│   └── route.ts
├── layout.tsx                       # Root layout
├── error.tsx                        # Error handler
├── not-found.tsx                    # 404 page
└── global-error.tsx                 # Global error boundary
```

### `/components` - React Components

```
components/
├── layout/
│   ├── Header.tsx                   # Site header
│   ├── Footer.tsx                   # Site footer
│   ├── Navigation.tsx               # Main navigation
│   └── MobileMenu.tsx               # Mobile navigation
├── seo/
│   ├── SEOHead.tsx                  # Meta tags component
│   ├── StructuredData.tsx          # Schema.org markup
│   └── Breadcrumbs.tsx             # Breadcrumb navigation
├── content/
│   ├── ArticleContent.tsx          # Article renderer
│   ├── FAQSection.tsx              # FAQ component
│   ├── TableOfContents.tsx         # TOC generator
│   └── RelatedContent.tsx          # Related links
├── agencies/
│   ├── AgencyCard.tsx              # Agency preview card
│   ├── AgencyList.tsx              # Agency listing
│   ├── AgencyFilters.tsx           # Filter controls
│   └── AgencyComparison.tsx        # Comparison table
├── jobs/
│   ├── JobCard.tsx                 # Job preview
│   ├── JobFilters.tsx              # Job filters
│   ├── JobApplication.tsx          # Application form
│   └── SalaryCalculator.tsx        # Salary tool
├── ui/
│   ├── Button.tsx                  # Button component
│   ├── Card.tsx                    # Card component
│   ├── Input.tsx                   # Input fields
│   ├── Modal.tsx                   # Modal dialog
│   ├── Tabs.tsx                    # Tab component
│   └── Toast.tsx                   # Toast notifications
└── analytics/
    ├── GoogleAnalytics.tsx          # GA4 integration
    └── VercelAnalytics.tsx         # Vercel Analytics
```

### `/sanity` - Sanity Studio Configuration

```
sanity/
├── schemas/
│   ├── documents/
│   │   ├── chiefOfStaff.ts        # Chief of Staff content
│   │   ├── recruitmentAgency.ts    # Agency schema
│   │   ├── jobListing.ts           # Job schema
│   │   ├── faqContent.ts           # FAQ schema
│   │   ├── newsArticle.ts          # News schema
│   │   └── author.ts               # Author schema
│   ├── objects/
│   │   ├── seoMetadata.ts          # SEO fields
│   │   ├── aiOptimization.ts       # AI fields
│   │   ├── salaryRange.ts          # Salary object
│   │   ├── location.ts             # Location object
│   │   └── portableText.ts         # Rich text config
│   └── index.ts                    # Schema exports
├── desk/
│   ├── structure.ts                # Desk structure
│   ├── defaultDocumentNode.ts      # Document views
│   └── actions.ts                  # Custom actions
├── components/
│   ├── previews/                   # Preview components
│   └── inputs/                     # Custom inputs
├── lib/
│   ├── client.ts                   # Sanity client
│   ├── queries.ts                  # GROQ queries
│   └── helpers.ts                  # Helper functions
├── plugins/
│   └── seo-tools.ts               # SEO validation
├── sanity.cli.ts                   # CLI configuration
├── sanity.config.ts                # Studio configuration
└── package.json                    # Studio dependencies
```

### `/lib` - Utility Functions

```
lib/
├── sanity/
│   ├── client.ts                   # Sanity client setup
│   ├── queries.ts                  # GROQ query library
│   ├── image.ts                    # Image URL builder
│   ├── preview.ts                  # Preview mode
│   └── serializers.ts              # Content serializers
├── ai/
│   ├── llms-generator.ts           # llms.txt generator
│   ├── structured-data.ts          # Schema.org generator
│   ├── knowledge-graph.ts          # Knowledge graph builder
│   └── agent-handler.ts            # AI agent logic
├── seo/
│   ├── meta-tags.ts                # Meta tag generator
│   ├── sitemap.ts                  # Sitemap generator
│   ├── robots.ts                   # Robots.txt generator
│   └── validation.ts               # SEO validation
├── utils/
│   ├── formatting.ts               # Text formatting
│   ├── dates.ts                    # Date utilities
│   ├── slugify.ts                  # URL slug generator
│   └── constants.ts                # App constants
├── hooks/
│   ├── useSanityData.ts           # Sanity data hook
│   ├── useSearch.ts                # Search hook
│   ├── useInfiniteScroll.ts       # Pagination hook
│   └── useAnalytics.ts            # Analytics hook
└── types/
    ├── sanity.ts                   # Sanity types
    ├── content.ts                  # Content types
    └── api.ts                      # API types
```

### `/scripts` - Automation Scripts

```
scripts/
├── content/
│   ├── generate-content.ts         # MCP content generation
│   ├── validate-seo.ts             # SEO validation
│   ├── update-timestamps.ts        # Freshness updates
│   └── cross-link.ts               # Internal linking
├── data/
│   ├── scrape-agencies.ts          # Agency scraper
│   ├── scrape-jobs.ts              # Job scraper (Firecrawl)
│   ├── import-data.ts              # Data importer
│   └── export-data.ts              # Data exporter
├── migration/
│   ├── migrate-schemas.ts          # Schema migration
│   └── update-content.ts           # Content updates
├── monitoring/
│   ├── check-links.ts              # Broken link checker
│   ├── check-performance.ts        # Performance monitor
│   └── check-indexation.ts         # Indexation checker
└── deployment/
    ├── pre-deploy.ts               # Pre-deployment checks
    └── post-deploy.ts              # Post-deployment tasks
```

### `/public` - Static Assets

```
public/
├── images/
│   ├── logo.svg                    # Site logo
│   ├── og-image.jpg                # Default OG image
│   ├── favicon.ico                 # Favicon
│   └── icons/                      # Icon assets
├── fonts/                          # Custom fonts
├── documents/                      # Downloadable files
└── _redirects                      # Redirect rules
```

### `/styles` - Global Styles

```
styles/
├── globals.css                     # Global styles
├── typography.css                  # Typography styles
└── components/                     # Component styles
    └── [component].module.css
```

### `/tests` - Test Files

```
tests/
├── unit/
│   ├── components/                 # Component tests
│   ├── lib/                        # Utility tests
│   └── api/                        # API tests
├── integration/
│   ├── sanity.test.ts             # Sanity integration
│   └── search.test.ts             # Search tests
├── e2e/
│   ├── navigation.test.ts         # Navigation tests
│   ├── content.test.ts            # Content tests
│   └── seo.test.ts                # SEO tests
└── fixtures/
    └── test-data.ts               # Test data
```

### `/docs` - Documentation

```
docs/
├── BMAD_METHODOLOGY.md             # Development methodology
├── TECHNICAL_ARCHITECTURE.md      # Technical details
├── CONTENT_STRATEGY.md             # Content plan
├── AI_OPTIMIZATION.md              # AI optimization guide
├── SEO_REQUIREMENTS.md             # SEO checklist
├── IMPLEMENTATION_ROADMAP.md       # Implementation timeline
├── PROJECT_STRUCTURE.md            # This file
├── CONTENT_TEMPLATES.md            # Content templates
├── SANITY_SCHEMAS.md              # Schema documentation
├── QUICK_START.md                  # Quick start guide
└── API_DOCUMENTATION.md           # API reference
```

## Configuration Files

### `next.config.js`
```javascript
module.exports = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  async rewrites() {
    return [
      {
        source: '/:path*.md',
        destination: '/api/markdown/:path*',
      },
      {
        source: '/:path*.json',
        destination: '/api/json/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ]
  },
}
```

### `package.json` Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "test": "jest",
    "test:e2e": "playwright test",
    "sanity": "cd sanity && sanity dev",
    "generate": "ts-node scripts/content/generate-content.ts",
    "scrape": "ts-node scripts/data/scrape-jobs.ts",
    "validate": "ts-node scripts/content/validate-seo.ts",
    "deploy": "vercel --prod"
  }
}
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
SANITY_WEBHOOK_SECRET=your-webhook-secret

# AI Services
OPENAI_API_KEY=your-openai-key
FIRECRAWL_API_KEY=your-firecrawl-key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-id

# External Services
CLERK_SECRET_KEY=your-clerk-key
SENTRY_DSN=your-sentry-dsn
```

## File Naming Conventions

### Components
- PascalCase: `ComponentName.tsx`
- Exports: Named exports for components
- Tests: `ComponentName.test.tsx`

### Utilities
- camelCase: `utilityFunction.ts`
- Exports: Named exports
- Tests: `utilityFunction.test.ts`

### Styles
- kebab-case: `component-name.module.css`
- Global: `globals.css`

### Routes
- kebab-case: `route-name/page.tsx`
- Dynamic: `[param]/page.tsx`
- Catch-all: `[...slug]/page.tsx`

## Import Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/styles/*": ["./styles/*"],
      "@/types/*": ["./lib/types/*"]
    }
  }
}
```

## Git Workflow

### Branch Structure
```
main                    # Production branch
├── develop            # Development branch
├── feature/*          # Feature branches
├── fix/*              # Bug fix branches
└── release/*          # Release branches
```

### Commit Convention
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

## Development Workflow

### Local Development
```bash
# Start development servers
npm run dev          # Next.js
npm run sanity       # Sanity Studio

# Run tests
npm run test         # Unit tests
npm run test:e2e     # E2E tests

# Code quality
npm run lint         # ESLint
npm run format       # Prettier
```

### Content Generation
```bash
# Generate content
npm run generate -- --type location --count 10

# Scrape data
npm run scrape -- --source indeed

# Validate SEO
npm run validate -- --path /chief-of-staff-london
```

### Deployment
```bash
# Build and deploy
npm run build
npm run deploy

# Preview deployment
vercel --preview
```

## Monitoring Structure

### Analytics Events
```typescript
// Track page views
analytics.page('Chief of Staff London', {
  category: 'Location',
  location: 'London'
})

// Track conversions
analytics.track('Job Application', {
  jobId: '123',
  company: 'TechCorp'
})
```

### Error Tracking
```typescript
// Sentry integration
Sentry.captureException(error, {
  tags: {
    section: 'job-board'
  }
})
```

## Security Considerations

### File Permissions
- No sensitive data in `/public`
- API keys only in environment variables
- Sanitize all user inputs
- Validate all file uploads

### Access Control
- Protected API routes
- Rate limiting on endpoints
- CORS configuration
- CSP headers

## Conclusion

This project structure provides a scalable, maintainable foundation for TheChief.quest. The organization supports rapid development while maintaining code quality and enabling team collaboration. Key principles include separation of concerns, reusability, and clear naming conventions.

---

*Last Updated: December 2024*
*Version: 1.0*
*Next Review: As needed*
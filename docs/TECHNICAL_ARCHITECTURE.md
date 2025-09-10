# TheChief.quest - Technical Architecture

## Overview

This document defines the technical architecture for TheChief.quest, a Sanity-first content platform optimized for SEO, AI discovery, and voice search. The architecture prioritizes content velocity, AI optimization, and scalability.

## Core Technology Stack

### Content Management Layer
```typescript
{
  cms: 'Sanity Studio v3',
  query: 'GROQ (Graph-Relational Object Queries)',
  mcp: 'https://mcp.sanity.io',
  cdn: 'Sanity native CDN',
  webhooks: 'Real-time content updates'
}
```

### Application Layer
```typescript
{
  framework: 'Next.js 15 (App Router)',
  language: 'TypeScript 5.3+',
  styling: 'Tailwind CSS 3.4',
  components: 'React 18.3 with RSC',
  package: 'pnpm for speed'
}
```

### AI Optimization Layer
```typescript
{
  formats: {
    html: 'SEO-optimized pages',
    markdown: 'Dynamic .md routes',
    json: 'Structured data API',
    txt: 'llms.txt for AI discovery'
  },
  search: 'Sanity semantic search',
  embeddings: 'OpenAI text-embedding-3',
  knowledge: 'Graph relationships'
}
```

### Infrastructure Layer
```typescript
{
  hosting: 'Vercel (Edge Runtime)',
  domain: 'thechief.quest',
  dns: 'Cloudflare',
  monitoring: 'Vercel Analytics + Sentry',
  auth: 'Clerk (Phase 2)'
}
```

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                                │
│                   (Web, Mobile, Voice, AI)                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    CDN / EDGE (Vercel)                       │
│              - Static Assets                                 │
│              - Cached Responses                              │
│              - Edge Functions                                │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                  NEXT.JS APPLICATION                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    App Router                          │ │
│  │  - Dynamic Routes ([...slug])                          │ │
│  │  - API Routes (/api/*)                                 │ │
│  │  - Server Components                                   │ │
│  │  - .md/.json serializers                              │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    SANITY CMS                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │               Content Lake                             │ │
│  │  - Documents (Chief, Agency, Job, FAQ)                 │ │
│  │  - Assets (Images, PDFs)                               │ │
│  │  - Relationships (Graph)                               │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  GROQ API                              │ │
│  │  - Complex queries                                     │ │
│  │  - Projections                                         │ │
│  │  - Joins                                               │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                 EXTERNAL SERVICES                            │
│  - MCP Server (Content Generation)                           │
│  - OpenAI (Embeddings)                                       │
│  - Firecrawl (Job Scraping)                                  │
│  - Webhook Consumers                                         │
└──────────────────────────────────────────────────────────────┘
```

## Dynamic Content Serialization

### Route Structure
```typescript
// app/[...slug]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const path = params.slug.join('/')
  const format = extractFormat(path) // .md, .json, or html
  
  // Fetch content from Sanity
  const content = await sanityClient.fetch(
    groq`*[slug.current == $slug][0]`,
    { slug: cleanPath(path) }
  )
  
  // Serialize based on format
  switch(format) {
    case 'markdown':
      return new Response(
        toMarkdown(content),
        { headers: { 'Content-Type': 'text/markdown' } }
      )
    
    case 'json':
      return Response.json({
        ...content,
        _links: generateHATEOAS(content)
      })
    
    default:
      return new Response(
        renderHTML(content),
        { headers: { 'Content-Type': 'text/html' } }
      )
  }
}
```

### Example URLs
```
thechief.quest/chief-of-staff-london          → HTML page
thechief.quest/chief-of-staff-london.md       → Markdown for LLMs
thechief.quest/chief-of-staff-london.json     → Structured data
```

## Sanity Schema Architecture

### Base Schema Pattern
```typescript
// schemas/documents/baseContent.ts
export const baseContent = {
  name: 'baseContent',
  type: 'document',
  fields: [
    // SEO Essentials
    {
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required().max(60)
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    },
    {
      name: 'keyword',
      type: 'string',
      description: 'Primary SEO keyword',
      validation: Rule => Rule.required()
    },
    
    // AI Optimization
    {
      name: 'tldr',
      type: 'string',
      description: 'Answer in 150 chars (AI Overview)',
      validation: Rule => Rule.required().max(150)
    },
    {
      name: 'question',
      type: 'string',
      description: 'The question this content answers'
    },
    {
      name: 'answer',
      type: 'portableText',
      description: 'Detailed answer'
    },
    
    // Metadata
    {
      name: 'lastUpdated',
      type: 'datetime',
      options: { dateFormat: 'YYYY-MM-DD' }
    },
    {
      name: 'confidence',
      type: 'number',
      description: 'Data confidence 0-1',
      validation: Rule => Rule.min(0).max(1)
    },
    
    // Relationships
    {
      name: 'relatedContent',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'baseContent' }] }]
    }
  ]
}
```

### Content Type Extensions
```typescript
// schemas/documents/chiefOfStaff.ts
export const chiefOfStaff = {
  name: 'chiefOfStaff',
  type: 'document',
  title: 'Chief of Staff Content',
  fields: [
    ...baseContent.fields,
    {
      name: 'location',
      type: 'string',
      options: {
        list: [
          'London', 'Manchester', 'Birmingham',
          'Edinburgh', 'Glasgow', 'Leeds',
          'Bristol', 'Cardiff', 'Liverpool',
          'Newcastle', 'Sheffield'
        ]
      }
    },
    {
      name: 'industry',
      type: 'string',
      options: {
        list: [
          'Private Equity', 'Hedge Fund',
          'Venture Capital', 'Startup',
          'Utilities', 'Telecoms'
        ]
      }
    },
    {
      name: 'salaryRange',
      type: 'object',
      fields: [
        { name: 'min', type: 'number' },
        { name: 'max', type: 'number' },
        { name: 'currency', type: 'string', initialValue: 'GBP' }
      ]
    }
  ]
}
```

## GROQ Query Examples

### Complex Content Query
```groq
// Get Chief of Staff content with related data
*[_type == "chiefOfStaff" && slug.current == $slug][0] {
  ...,
  "readTime": round(length(pt::text(content)) / 250),
  "relatedJobs": *[_type == "jobListing" 
    && location == ^.location 
    && industry == ^.industry][0...5] {
    title,
    company,
    salary,
    slug
  },
  "agencies": *[_type == "recruitmentAgency" 
    && locations[] == ^.location][0...10] {
    name,
    rating,
    specializations,
    slug
  },
  "semanticRelated": *[_type == "chiefOfStaff" 
    && _id != ^._id] | score(
    boost(location == ^.location, 3),
    boost(industry == ^.industry, 2)
  )[0...5]
}
```

### Knowledge Graph Query
```groq
// Build knowledge graph for AI
*[_type in ["chiefOfStaff", "jobListing", "recruitmentAgency"]] {
  _id,
  _type,
  title,
  "entity": select(
    _type == "chiefOfStaff" => "Role",
    _type == "jobListing" => "Job",
    _type == "recruitmentAgency" => "Agency"
  ),
  "relationships": {
    "location": location,
    "industry": industry,
    "related": relatedContent[]-> {
      _id,
      title,
      _type
    }
  }
}
```

## API Design

### RESTful Endpoints
```typescript
// app/api/content/[slug]/route.ts
GET  /api/content/{slug}         // Get content
GET  /api/content/{slug}/related // Get related content
POST /api/content/{slug}/track   // Track engagement

// app/api/search/route.ts
GET  /api/search?q={query}       // Search content
GET  /api/search/suggest?q={q}   // Search suggestions

// app/api/ai/route.ts
POST /api/ai/query               // Direct AI query
GET  /api/ai/knowledge-graph     // Get knowledge graph
```

### Agent API
```typescript
// app/api/agent/route.ts
export async function POST(request: Request) {
  const { query } = await request.json()
  
  // Parse intent
  const intent = await parseIntent(query)
  
  // Execute GROQ query based on intent
  const data = await sanityClient.fetch(
    buildQuery(intent)
  )
  
  // Format response for AI
  return Response.json({
    query,
    intent,
    answer: formatAnswer(data),
    confidence: calculateConfidence(data),
    sources: extractSources(data)
  })
}
```

## Performance Optimization

### Caching Strategy
```typescript
// next.config.js
module.exports = {
  experimental: {
    incrementalCacheHandlerPath: './cache-handler.js'
  },
  
  // Revalidation strategy
  revalidate: {
    '/': 3600,                    // Homepage: 1 hour
    '/[location]': 7200,          // Location pages: 2 hours
    '/agencies/*': 86400,         // Agency lists: 24 hours
    '/api/*': 0                   // API: No cache
  }
}
```

### Image Optimization
```typescript
// lib/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
    .auto('format')
    .quality(80)
    .fit('max')
}

// Usage with Next.js Image
<Image
  src={urlFor(image)
    .width(800)
    .height(600)
    .url()}
  alt={image.alt}
  width={800}
  height={600}
  loading="lazy"
/>
```

### Database Indexes (Sanity)
```javascript
// sanity/indexes.js
export default [
  {
    name: 'slug_index',
    type: 'index',
    spec: [['slug.current', 'asc']]
  },
  {
    name: 'location_industry_index',
    type: 'compound',
    spec: [
      ['location', 'asc'],
      ['industry', 'asc']
    ]
  },
  {
    name: 'updated_index',
    type: 'index',
    spec: [['lastUpdated', 'desc']]
  }
]
```

## Security Considerations

### Content Security Policy
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  response.headers.set(
    'Content-Security-Policy',
    `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https://cdn.sanity.io;
      font-src 'self' data:;
      connect-src 'self' https://api.sanity.io;
    `.replace(/\s+/g, ' ').trim()
  )
  
  return response
}
```

### API Rate Limiting
```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true
})

export async function rateLimitMiddleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success, limit, reset, remaining } = await ratelimit.limit(ip)
  
  if (!success) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': new Date(reset).toISOString()
      }
    })
  }
  
  return null
}
```

## Monitoring and Observability

### Metrics Collection
```typescript
// lib/metrics.ts
export async function trackMetric(
  name: string,
  value: number,
  tags?: Record<string, string>
) {
  // Send to Vercel Analytics
  await fetch('/_vercel/insights/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      value,
      tags
    })
  })
  
  // Also send to custom analytics
  if (process.env.NODE_ENV === 'production') {
    await sendToAnalytics(name, value, tags)
  }
}

// Usage
await trackMetric('page_view', 1, {
  page: '/chief-of-staff-london',
  source: 'organic'
})
```

### Error Tracking
```typescript
// app/error.tsx
'use client'

import * as Sentry from '@sentry/nextjs'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])
  
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

## Deployment Architecture

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install Dependencies
        run: pnpm install
        
      - name: Run Tests
        run: pnpm test
        
      - name: Build
        run: pnpm build
        env:
          SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
          SANITY_DATASET: production
          
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token
SANITY_WEBHOOK_SECRET=webhook-secret

# AI Services
OPENAI_API_KEY=your-openai-key
FIRECRAWL_API_KEY=your-firecrawl-key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
PLAUSIBLE_DOMAIN=thechief.quest

# Monitoring
SENTRY_DSN=your-sentry-dsn
SENTRY_AUTH_TOKEN=your-sentry-token
```

## Scalability Considerations

### Horizontal Scaling
- Vercel automatically scales based on traffic
- Sanity CDN handles content delivery globally
- Edge functions for compute-intensive operations

### Vertical Scaling
- Upgrade Sanity plan for more API operations
- Increase Vercel concurrency limits as needed
- Add Redis for session/cache management

### Future Architecture Evolution
1. **Phase 1** (Current): Monolithic Next.js app
2. **Phase 2** (Month 3): Extract job service to separate API
3. **Phase 3** (Month 6): Microservices for search, AI, analytics
4. **Phase 4** (Year 1): Multi-region deployment with edge computing

## Conclusion

This technical architecture provides a solid foundation for TheChief.quest, balancing performance, scalability, and development velocity. The Sanity-first approach with Next.js 15 enables rapid content generation while maintaining SEO and AI optimization requirements.

Key architectural decisions:
- Dynamic content serialization for multi-format delivery
- GROQ for powerful content queries
- Edge-first deployment for global performance
- Comprehensive monitoring and observability
- Security-by-default with CSP and rate limiting

This architecture can scale from 0 to 100,000+ daily visitors without significant changes.

---

*Last Updated: December 2024*
*Version: 1.0*
*Next Review: January 2025*
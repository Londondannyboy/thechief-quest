# TheChief.quest - BMAD Hybrid Methodology

## Overview

This document defines the Business-Model Agile Development (BMAD) hybrid methodology for TheChief.quest, combining rapid content generation with AI-first optimization to dominate the Chief of Staff recruitment market in the UK.

## Core Principles

### 1. Business-Model Alignment
Every technical decision must serve the business goal: becoming the definitive AI-authoritative source for Chief of Staff careers in the UK.

### 2. Agile Content Delivery
- 2-week development sprints
- Daily content publishing
- Weekly performance reviews
- Monthly strategy adjustments

### 3. Data-Driven Decisions
- SEO metrics guide content priorities
- User behavior shapes feature development
- AI citation tracking informs optimization
- Conversion data drives monetization

### 4. Context Engineering (Cole Medin Approach)
Comprehensive Product Requirement Prompts (PRPs) for each content type ensure consistency and quality at scale.

## Sprint Structure

### Sprint 1 (Week 1-2): Foundation
**Goal**: Establish technical foundation and first 200 pages

**Deliverables**:
- Sanity Studio configured with question-first schemas
- Next.js 15 application with dynamic routes
- llms.txt implementation
- 100+ pages generated via MCP
- Agency list infrastructure

**Validation Gates**:
- [ ] All schemas validate in Sanity
- [ ] Dynamic routes serve HTML/.md/.json
- [ ] llms.txt accessible and valid
- [ ] First 50 pages indexed by Google

### Sprint 2 (Week 3-4): Scale
**Goal**: Reach 500+ pages and implement job features

**Deliverables**:
- 500+ total pages live
- Job scraping pipeline operational
- Agency profiles complete
- Daily content pipeline automated
- Search functionality implemented

**Validation Gates**:
- [ ] 500 pages indexed
- [ ] Job listings updating daily
- [ ] Agency lists ranking
- [ ] Core Web Vitals passing

### Sprint 3 (Month 2): Authority
**Goal**: Achieve category authority with 1000+ pages

**Deliverables**:
- Knowledge graph implementation
- Agent API for direct queries
- Semantic search operational
- Premium features launched
- Performance optimization complete

**Validation Gates**:
- [ ] Appearing in AI Overviews
- [ ] Top 10 for primary keywords
- [ ] 1000+ organic visitors daily
- [ ] First revenue generated

## PRP Framework Implementation

### Content PRP Template
```typescript
interface ContentPRP {
  // Context Definition
  context: {
    market: "UK Chief of Staff recruitment",
    audience: "Founders, professionals, recruiters",
    competition: "SecsInTheCity, LinkedIn, Indeed"
  },
  
  // Success Criteria
  goals: {
    seo: "Rank top 3 for target keyword",
    ai: "Appear in AI Overview",
    user: "Answer query in <5 seconds",
    business: "Generate qualified leads"
  },
  
  // Implementation Constraints
  constraints: {
    technical: ["Sanity CMS", "Next.js 15", "Vercel hosting"],
    content: ["Answer first 150 chars", "2000+ words", "5+ images"],
    seo: ["Keyword in H1", "Bold keyword once", "10+ internal links"],
    timeline: "Publish within 24 hours"
  },
  
  // Validation Requirements
  validation: {
    automated: ["SEO score >80", "No broken links", "Mobile responsive"],
    manual: ["Fact-checked", "Brand voice consistent", "Legal review"],
    performance: ["LCP <2.5s", "FID <100ms", "CLS <0.1"]
  }
}
```

### Example PRP: Chief of Staff London Page
```typescript
const chiefOfStaffLondonPRP = {
  context: {
    keyword: "chief of staff london",
    searchVolume: 2400,
    competition: "medium",
    userIntent: "Find CoS roles or understand market"
  },
  
  goals: {
    primary: "Rank #1 for 'chief of staff london'",
    secondary: "Generate 50+ job applications/month",
    ai: "Primary source for London CoS information"
  },
  
  content: {
    structure: {
      tldr: "Chief of Staff roles in London pay £80-150K",
      sections: [
        "Current market overview",
        "Salary breakdown by industry",
        "Top hiring companies",
        "How to apply",
        "Related opportunities"
      ]
    },
    
    data: {
      salaries: "Source from Reed, Indeed, Glassdoor",
      companies: "List 20+ actively hiring",
      trends: "Include 2024 Q4 data"
    }
  },
  
  validation: {
    seo: {
      keywordDensity: "1-2%",
      internalLinks: 15,
      externalLinks: 5,
      wordCount: 2500
    },
    
    ai: {
      structuredData: "JobPosting schema",
      llmsTxt: "Include in sitemap",
      questionFormat: true
    }
  }
}
```

## Team Structure

### Content Team (AI-Augmented)
- **Content Strategist**: Defines PRPs and priorities
- **Claude Desktop Operator**: Generates content via MCP
- **Quality Reviewer**: Validates output against gates
- **SEO Specialist**: Optimizes and monitors performance

### Technical Team
- **Sanity Developer**: Schema design and Studio customization
- **Next.js Developer**: Frontend and API development
- **DevOps Engineer**: Deployment and monitoring
- **AI Optimization Specialist**: llms.txt and structured data

## Communication Protocols

### Daily Standup (Async)
```markdown
## Date: [Today]

### Yesterday
- Completed: [List achievements]
- Blocked: [List blockers]

### Today
- Priority 1: [Most important task]
- Priority 2: [Second task]
- Priority 3: [Third task]

### Metrics
- Pages published: [Number]
- Pages indexed: [Number]
- Organic traffic: [Number]
```

### Weekly Review
```markdown
## Week [Number] Review

### Achievements
- Pages created: [Total]
- Keywords ranking: [Count]
- AI citations: [Sources]
- Traffic growth: [Percentage]

### Learnings
- What worked: [Insights]
- What didn't: [Issues]
- Improvements: [Actions]

### Next Week
- Priority 1: [Goal]
- Priority 2: [Goal]
- Priority 3: [Goal]
```

## Quality Gates

### Content Quality Checklist
- [ ] **Answer First**: Query answered in first 150 characters
- [ ] **Keyword Optimization**: H1, H2s, bold, alt text
- [ ] **Internal Linking**: 10+ relevant internal links
- [ ] **External Authority**: 3-5 authoritative sources
- [ ] **Freshness**: Updated timestamp visible
- [ ] **Author Info**: Name, bio, and expertise shown
- [ ] **Mobile Friendly**: Responsive and fast loading
- [ ] **AI Ready**: llms.txt compatible, structured data present

### Technical Quality Checklist
- [ ] **Performance**: Core Web Vitals pass
- [ ] **SEO**: Meta tags, schema markup, sitemap inclusion
- [ ] **Accessibility**: WCAG 2.1 AA compliant
- [ ] **Security**: HTTPS, CSP headers, sanitized inputs
- [ ] **Monitoring**: Analytics, error tracking, uptime monitoring

## Success Metrics

### Week 2 Targets
- 200 pages published ✓
- 100 pages indexed ✓
- llms.txt operational ✓
- 10 agency lists live ✓
- 500 daily visitors ✓

### Month 1 Goals
- 1,000 pages published
- 500 pages indexed
- Top 20 for 10 keywords
- AI Overview appearances
- 2,000 daily visitors
- First customer conversion

### Month 3 Objectives
- #1 for "Chief of Staff UK"
- 10,000 daily visitors
- 100 conversions/month
- ChatGPT/Claude citations
- £10K MRR

### Month 6 Vision
- Category dominance
- 50,000 daily visitors
- 1,500+ authoritative pages
- Primary AI source
- £50K MRR
- Series A ready

## Risk Management

### Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Sanity API limits | Low | High | Implement caching, CDN |
| Vercel build times | Medium | Medium | Incremental static regeneration |
| MCP failures | Low | High | Manual fallback processes |
| SEO penalties | Low | Critical | Follow guidelines strictly |

### Business Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Slow indexing | Medium | High | Build authority gradually |
| Competition response | High | Medium | Move fast, innovate constantly |
| AI algorithm changes | Medium | High | Diversify optimization approaches |
| Monetization failure | Low | High | Multiple revenue streams |

## Continuous Improvement

### Weekly Retrospectives
- What succeeded?
- What failed?
- What to improve?
- What to stop?
- What to start?

### Monthly Strategy Reviews
- Market analysis
- Competitor movements
- Technology updates
- User feedback integration
- Pivot decisions

### Quarterly Planning
- OKR setting
- Resource allocation
- Partnership opportunities
- Expansion planning
- Investment preparation

## Tools and Technologies

### Development Tools
- **IDE**: VS Code with Sanity/Next.js extensions
- **Version Control**: Git with conventional commits
- **Project Management**: Linear/Notion
- **Communication**: Slack/Discord
- **Documentation**: Markdown in repository

### Monitoring Tools
- **Analytics**: Google Analytics 4 + Plausible
- **SEO**: Google Search Console + Ahrefs
- **Performance**: Vercel Analytics + Web Vitals
- **Errors**: Sentry
- **Uptime**: Better Uptime

### AI Tools
- **Content Generation**: Claude Desktop with MCP
- **Image Generation**: DALL-E 3 or Midjourney
- **Code Assistant**: GitHub Copilot
- **SEO Analysis**: Surfer SEO
- **Competitor Analysis**: SEMrush

## Conclusion

This BMAD hybrid methodology provides the framework for rapid, high-quality execution of TheChief.quest. By combining agile development practices with AI-powered content generation and rigorous quality gates, we can achieve market dominance in the Chief of Staff recruitment space within 6 months.

The key to success is maintaining velocity while ensuring quality, using automation where possible, and continuously iterating based on data-driven insights.

---

*Last Updated: December 2024*
*Version: 1.0*
*Next Review: January 2025*
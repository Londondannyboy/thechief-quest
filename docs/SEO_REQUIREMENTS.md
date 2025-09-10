# TheChief.quest - SEO Requirements

## Overview

This document defines the strict SEO requirements for all content on TheChief.quest. Every page must meet these requirements before publication. These guidelines are based on proven SEO best practices and specific insights from successful AI Overview rankings.

## Critical SEO Rules

### 🔴 MANDATORY Requirements (Must Have)

1. **H1 Tag with Primary Keyword**
   - Exactly ONE H1 per page
   - Must contain the primary keyword
   - Should be 20-60 characters
   - Must be unique across the site

2. **Header Hierarchy (H2-H5)**
   - Proper nesting (H2 → H3 → H4)
   - At least 2-3 H2 tags per page
   - H2 tags should contain keyword variations
   - No skipping levels (H2 → H4 is wrong)

3. **Keyword in Bold**
   - Primary keyword must be bolded AT LEAST once
   - First instance should be within first 200 words
   - Use `<strong>` tag, not `<b>`

4. **Keyword Spacing**
   - Do NOT repeat keyword within 200-300 words
   - Natural distribution throughout content
   - Keyword density: 1-2% maximum

5. **File and Image Naming**
   - Files: `chief-of-staff-london.html`
   - Images: `chief-of-staff-salary-chart.jpg`
   - Use hyphens, not underscores
   - All lowercase

6. **Alt Text Requirements**
   - EVERY image must have alt text
   - Alt text must include relevant keyword
   - Be descriptive (5-15 words)
   - Example: `alt="Chief of Staff salary comparison chart for London 2024"`

7. **Internal Linking**
   - Minimum 10 internal links per page
   - Anchor text should include target page keyword
   - Mix of contextual and navigational links
   - No broken links

8. **Answer First Principle**
   - Answer the query in first 150 characters
   - Use clear, direct language
   - Include the primary keyword naturally

## Page Structure Template

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
    <title>Primary Keyword - Secondary | TheChief</title>
    <meta name="description" content="150-160 character description with primary keyword...">
    <link rel="canonical" href="https://thechief.quest/exact-url">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Description">
    <meta property="og:image" content="/images/og-image.jpg">
    
    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        ...
    }
    </script>
</head>
<body>
    <article>
        <h1>Chief of Staff Jobs in London - Complete Guide 2024</h1>
        
        <!-- Answer first -->
        <p class="tldr">
            <strong>Chief of Staff</strong> roles in London pay £80-150K 
            with 200+ positions currently available across industries.
        </p>
        
        <h2>What is a Chief of Staff?</h2>
        <p>Content with natural keyword usage...</p>
        
        <h2>Chief of Staff Salary in London</h2>
        <p>Detailed salary information...</p>
        
        <h3>By Industry</h3>
        <ul>
            <li>Private Equity: £120-150K</li>
            <li>Startups: £80-110K</li>
        </ul>
        
        <img src="/images/chief-of-staff-london-salaries.jpg" 
             alt="Chief of Staff salary ranges in London by industry">
        
        <!-- Internal links with keyword anchor text -->
        <p>
            Learn more about 
            <a href="/manchester">Chief of Staff roles in Manchester</a> or 
            <a href="/agencies">recruitment agencies specializing in Chief of Staff positions</a>.
        </p>
    </article>
</body>
</html>
```

## Keyword Implementation Guide

### Primary Keyword Placement
| Location | Requirement | Example |
|----------|------------|---------|
| Title Tag | Required | "Chief of Staff London - Jobs & Salary Guide" |
| H1 | Required | "Chief of Staff Jobs in London" |
| First Paragraph | Required | Within first 100 words |
| Meta Description | Required | Natural inclusion |
| URL | Required | `/chief-of-staff-london` |
| Image Alt Text | Required | "Chief of Staff London salary chart" |
| Bold Text | Required (1x) | `<strong>Chief of Staff</strong>` |

### Keyword Density Guidelines
```
Total Word Count: 2000
Primary Keyword: "Chief of Staff London"
- Target occurrences: 20-40 (1-2%)
- Minimum spacing: 200 words between uses
- Natural variations allowed

Related Keywords:
- "Chief of Staff" - 10-15 times
- "London" - 15-20 times  
- "CoS" - 2-3 times
- "Chiefs of Staff" - 3-5 times
```

## Meta Tag Requirements

### Title Tag (CRITICAL)
```html
<title>Primary Keyword - Secondary Keyword | TheChief</title>
```
**Mandatory Rules:**
- **Maximum 70 characters** (Google truncates after this)
- **Primary keyword MUST be included** (preferably at start)
- **Format**: `[Primary Keyword] - [Secondary/Location] | TheChief`
- Brand name at the end
- Unique for every page
- Action words encouraged (Guide, Jobs, Salary, Top, Best)

**Examples:**
```html
<!-- Good -->
<title>Chief of Staff London - Jobs & Salary Guide | TheChief</title> <!-- 56 chars ✓ -->
<title>Chief of Staff Dubai - Executive Roles UAE | TheChief</title> <!-- 55 chars ✓ -->
<title>Executive Assistant Zurich - Finance Jobs | TheChief</title> <!-- 54 chars ✓ -->

<!-- Bad -->
<title>TheChief - Chief of Staff Jobs</title> <!-- Keyword not first ✗ -->
<title>Find Amazing Chief of Staff Opportunities in London...</title> <!-- Too vague ✗ -->
```

### Meta Description (CRITICAL)
```html
<meta name="description" content="Primary keyword early + value proposition + 
location/industry + call-to-action. Maximum 200 characters.">
```
**Mandatory Rules:**
- **Maximum 200 characters** (expanded from 160 for better coverage)
- **Primary keyword MUST appear within first 100 characters**
- **Include location or industry specifier**
- **End with clear call-to-action**
- Unique for every page
- Use active voice

**Formula:**
`[Primary Keyword] in [Location/Industry]. [Value prop/data point]. [Secondary detail]. [CTA]`

**Examples:**
```html
<!-- Good -->
<meta name="description" content="Chief of Staff jobs in Dubai and UAE. 
£100-200K tax-free salaries, 50+ roles available. Top companies hiring now. 
Apply today with TheChief."> <!-- 186 chars ✓ -->

<meta name="description" content="Executive Assistant roles in Zurich 
financial services. CHF 120-180K packages, work with C-suite executives. 
Find your perfect role at TheChief."> <!-- 195 chars ✓ -->

<!-- Bad -->
<meta name="description" content="Find opportunities and advance your career 
with our platform..."> <!-- No keyword ✗ -->
```

### Canonical URL
```html
<link rel="canonical" href="https://thechief.quest/exact-page-url">
```
- Always use absolute URLs
- Must match the page URL
- Required on every page

## Image Optimization

### File Naming Convention
```
✅ Correct:
chief-of-staff-london-salary.jpg
executive-assistant-career-path.png
recruitment-agencies-uk-map.webp

❌ Incorrect:
image1.jpg
ChiefOfStaff.png
chief_of_staff.jpg
IMG_12345.png
```

### Image Requirements Checklist
- [ ] Descriptive filename with keywords
- [ ] Alt text includes keyword (5-15 words)
- [ ] Compressed for web (<200KB ideally)
- [ ] Proper dimensions (no oversized images)
- [ ] WebP format preferred
- [ ] Lazy loading implemented
- [ ] Responsive images (srcset)

### Alt Text Examples
```html
<!-- Good -->
<img alt="Chief of Staff salary comparison chart for London financial services">
<img alt="Career progression path from Executive Assistant to Chief of Staff">
<img alt="Top 10 Chief of Staff recruitment agencies in the UK map">

<!-- Bad -->
<img alt="Chart">
<img alt="Image">
<img alt="chief of staff chief of staff chief of staff">
```

## Internal Linking Strategy

### Anchor Text Rules
1. **Use descriptive anchor text** with target page keywords
2. **Avoid generic text** like "click here" or "read more"
3. **Vary anchor text** for the same target page
4. **Natural placement** within content flow

### Examples
```html
<!-- Good Internal Links -->
<a href="/london">Chief of Staff jobs in London</a>
<a href="/salary-guide">comprehensive salary guide for Chiefs of Staff</a>
<a href="/agencies/knightsbridge">Knightsbridge Recruitment's Chief of Staff practice</a>

<!-- Bad Internal Links -->
<a href="/london">click here</a>
<a href="/salary-guide">read more</a>
<a href="/agencies/knightsbridge">link</a>
```

### Internal Linking Requirements
- Minimum 10 internal links per page
- Maximum 100 internal links per page
- Mix contextual and navigational links
- Link to related content clusters
- Include links to cornerstone content

## Content Structure Requirements

### Word Count Guidelines
| Content Type | Minimum | Optimal | Maximum |
|--------------|---------|---------|---------|
| Location Pages | 1,500 | 2,500 | 4,000 |
| Agency Profiles | 1,000 | 1,500 | 2,500 |
| How-to Guides | 2,000 | 3,000 | 5,000 |
| News Articles | 500 | 800 | 1,500 |
| FAQ Pages | 1,500 | 2,000 | 3,000 |

### Content Formatting
- **Paragraphs**: 2-3 sentences maximum
- **Sentences**: 20 words or less (average)
- **Bullet Points**: Use for lists of 3+ items
- **Bold/Strong**: Important points and first keyword instance
- **Tables**: For comparisons and data
- **Images**: Every 300-400 words

## URL Structure

### URL Requirements
```
✅ Correct URLs:
/chief-of-staff-london
/agencies/knightsbridge-recruitment  
/guides/ea-to-chief-of-staff
/salary/private-equity-2024

❌ Incorrect URLs:
/chief_of_staff_london
/Chief-Of-Staff-London
/page1
/content/articles/2024/12/chief-of-staff
```

### URL Best Practices
- All lowercase
- Use hyphens to separate words
- Keep under 60 characters
- Include primary keyword
- Avoid stop words when possible
- No special characters
- No parameters for content pages

## Schema Markup Requirements

### Required Schema Types
1. **Organization** (Homepage)
2. **Article** (Blog posts, guides)
3. **FAQPage** (FAQ content)
4. **JobPosting** (Job listings)
5. **BreadcrumbList** (All pages)
6. **Person** (Author pages)

### Implementation Example
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Chief of Staff Salary Guide London 2024",
  "description": "Comprehensive salary data for Chief of Staff roles",
  "author": {
    "@type": "Person",
    "name": "Jane Smith",
    "url": "https://thechief.quest/authors/jane-smith"
  },
  "datePublished": "2024-12-19",
  "dateModified": "2024-12-19",
  "publisher": {
    "@type": "Organization",
    "name": "TheChief",
    "logo": {
      "@type": "ImageObject",
      "url": "https://thechief.quest/logo.png"
    }
  }
}
```

## Mobile Optimization

### Mobile Requirements
- [ ] Responsive design (mobile-first)
- [ ] Touch-friendly buttons (44x44px minimum)
- [ ] Readable font size (16px minimum)
- [ ] No horizontal scrolling
- [ ] Fast loading (<3 seconds on 3G)
- [ ] Compressed images
- [ ] Minimal JavaScript

## Page Speed Requirements

### Core Web Vitals Targets
| Metric | Target | Maximum |
|--------|--------|---------|
| LCP (Largest Contentful Paint) | <2.5s | 4.0s |
| FID (First Input Delay) | <100ms | 300ms |
| CLS (Cumulative Layout Shift) | <0.1 | 0.25 |

### Performance Checklist
- [ ] Images optimized and lazy-loaded
- [ ] CSS minified and critical CSS inlined
- [ ] JavaScript deferred/async
- [ ] Fonts preloaded
- [ ] CDN configured
- [ ] Caching headers set
- [ ] Gzip/Brotli compression enabled

## SEO Validation Checklist

### Pre-Publication Checklist
```markdown
## Content
- [ ] Primary keyword in H1
- [ ] Keyword in first 100 words
- [ ] Keyword bolded at least once
- [ ] 200-300 word spacing between keyword uses
- [ ] Minimum word count met
- [ ] Answer provided in first 150 characters

## Technical
- [ ] Title tag optimized (50-60 chars)
- [ ] Meta description written (150-160 chars)
- [ ] URL contains keyword
- [ ] Canonical tag present
- [ ] Schema markup implemented

## Images
- [ ] All images have alt text
- [ ] Alt text contains keywords
- [ ] Images compressed (<200KB)
- [ ] Filenames optimized

## Links
- [ ] 10+ internal links
- [ ] Keyword-rich anchor text
- [ ] No broken links
- [ ] External links to authoritative sources

## Mobile & Speed
- [ ] Mobile responsive
- [ ] Core Web Vitals passing
- [ ] Page loads <3 seconds
```

## Common SEO Mistakes to Avoid

### ❌ Never Do This
1. **Keyword Stuffing**: Unnatural repetition of keywords
2. **Duplicate Content**: Same content on multiple pages
3. **Missing Alt Text**: Images without descriptions
4. **Broken Links**: Links that 404
5. **Slow Pages**: >3 second load time
6. **Poor Mobile Experience**: Not responsive
7. **Thin Content**: <300 words
8. **No Internal Links**: Orphan pages
9. **Multiple H1 Tags**: More than one H1
10. **Generic Anchor Text**: "Click here" links

## Monitoring and Reporting

### Weekly SEO Checks
- Google Search Console errors
- Core Web Vitals scores
- Broken link report
- Indexation status
- Keyword rankings

### Monthly SEO Audit
- Full technical SEO audit
- Content gap analysis
- Competitor comparison
- Backlink profile review
- Schema validation

## Tools and Resources

### Recommended SEO Tools
- **Google Search Console**: Indexation and errors
- **Google PageSpeed Insights**: Performance
- **Schema Validator**: Structured data testing
- **Screaming Frog**: Technical SEO audits
- **Ahrefs/SEMrush**: Keyword research and tracking

## Conclusion

These SEO requirements are non-negotiable for all content on TheChief.quest. Every page must pass the validation checklist before publication. Consistent adherence to these guidelines ensures maximum visibility in both traditional search and AI-driven discovery.

Remember: SEO is not about gaming the system but providing the best possible experience for users while making content easily discoverable and understandable by search engines.

---

*Last Updated: December 2024*
*Version: 1.0*
*Next Review: January 2025*
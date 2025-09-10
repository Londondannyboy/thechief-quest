# TheChief.quest - Sanity Schema Definitions

## Overview

This document defines all Sanity schemas for TheChief.quest. These schemas are designed to support SEO optimization, AI discovery, and content management at scale while maintaining data integrity and relationships.

## Schema Categories

1. **Document Schemas** - Main content types
2. **Object Schemas** - Reusable components
3. **Validation Rules** - Data integrity
4. **Preview Configuration** - Studio customization
5. **Desk Structure** - Content organization

---

## Document Schemas

### 1. Chief of Staff Content

```typescript
// schemas/documents/chiefOfStaff.ts
import { defineType, defineField } from 'sanity'

export const chiefOfStaffSchema = defineType({
  name: 'chiefOfStaff',
  title: 'Chief of Staff Content',
  type: 'document',
  fields: [
    // SEO Fields
    defineField({
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      description: 'SEO title with primary keyword (max 70 chars) - Format: [Keyword] - [Secondary] | TheChief',
      validation: Rule => Rule.required()
        .min(30)
        .max(70)
        .custom((title: string) => {
          if (!title) return true
          // Check if title is too long for Google
          if (title.length > 70) return 'Title will be truncated by Google (max 70 chars)'
          // Check if it contains the brand
          if (!title.includes('TheChief')) return 'Title must include brand name "TheChief"'
          return true
        })
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'metaTitle',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
      description: 'SEO description with keyword in first 100 chars (max 200 chars)',
      validation: Rule => Rule.required()
        .min(120)
        .max(200)
        .custom((desc: string) => {
          if (!desc) return true
          if (desc.length > 200) return 'Description too long (max 200 chars)'
          // Could add keyword checking here if needed
          return true
        })
    }),
    
    defineField({
      name: 'pageTitle',
      title: 'Page Title (H1)',
      type: 'string',
      description: 'H1 heading for the page (can be different from meta title)',
      validation: Rule => Rule.required()
    }),
    
    // AI Optimization Fields
    defineField({
      name: 'tldr',
      title: 'Quick Answer (TLDR)',
      type: 'string',
      description: 'Answer in 150 chars for AI snippets',
      validation: Rule => Rule.required().max(150)
    }),
    
    defineField({
      name: 'question',
      title: 'Primary Question',
      type: 'string',
      description: 'The main question this content answers',
      validation: Rule => Rule.required()
    }),
    
    // Content Fields
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      options: {
        list: [
          // UK Cities
          { title: 'London, UK', value: 'london' },
          { title: 'Manchester, UK', value: 'manchester' },
          { title: 'Birmingham, UK', value: 'birmingham' },
          { title: 'Edinburgh, UK', value: 'edinburgh' },
          { title: 'Glasgow, UK', value: 'glasgow' },
          { title: 'Leeds, UK', value: 'leeds' },
          { title: 'Bristol, UK', value: 'bristol' },
          { title: 'Cardiff, UK', value: 'cardiff' },
          { title: 'Liverpool, UK', value: 'liverpool' },
          { title: 'Newcastle, UK', value: 'newcastle' },
          { title: 'Sheffield, UK', value: 'sheffield' },
          // Europe
          { title: 'Zurich, Switzerland', value: 'zurich' },
          { title: 'Geneva, Switzerland', value: 'geneva' },
          { title: 'Luxembourg City, Luxembourg', value: 'luxembourg' },
          // Middle East
          { title: 'Dubai, UAE', value: 'dubai' },
          { title: 'Abu Dhabi, UAE', value: 'abu-dhabi' },
          { title: 'Doha, Qatar', value: 'doha' },
          { title: 'Riyadh, Saudi Arabia', value: 'riyadh' },
          { title: 'Kuwait City, Kuwait', value: 'kuwait-city' },
          { title: 'Manama, Bahrain', value: 'manama' }
        ]
      }
    }),
    
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      description: 'Geographic region for filtering',
      options: {
        list: [
          { title: 'United Kingdom', value: 'uk' },
          { title: 'Europe', value: 'europe' },
          { title: 'Middle East', value: 'middle-east' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Private Equity', value: 'private-equity' },
          { title: 'Hedge Fund', value: 'hedge-fund' },
          { title: 'Venture Capital', value: 'venture-capital' },
          { title: 'Startup', value: 'startup' },
          { title: 'Utilities', value: 'utilities' },
          { title: 'Telecoms', value: 'telecoms' }
        ]
      }
    }),
    
    defineField({
      name: 'content',
      title: 'Main Content',
      type: 'portableText'
    }),
    
    // Salary Data
    defineField({
      name: 'salaryData',
      title: 'Salary Information',
      type: 'object',
      fields: [
        defineField({
          name: 'min',
          title: 'Minimum Salary',
          type: 'number',
          validation: Rule => Rule.min(0)
        }),
        defineField({
          name: 'max',
          title: 'Maximum Salary',
          type: 'number',
          validation: Rule => Rule.min(0)
        }),
        defineField({
          name: 'average',
          title: 'Average Salary',
          type: 'number',
          validation: Rule => Rule.min(0)
        }),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'GBP',
          options: {
            list: ['GBP', 'EUR', 'USD']
          }
        }),
        defineField({
          name: 'lastUpdated',
          title: 'Last Updated',
          type: 'date'
        }),
        defineField({
          name: 'dataSource',
          title: 'Data Source',
          type: 'string'
        })
      ]
    }),
    
    // Metadata
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime'
    }),
    
    // Related Content
    defineField({
      name: 'relatedContent',
      title: 'Related Pages',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'chiefOfStaff' },
            { type: 'recruitmentAgency' },
            { type: 'faqContent' }
          ]
        }
      ]
    }),
    
    // SEO Score Tracking
    defineField({
      name: 'seoScore',
      title: 'SEO Score',
      type: 'seoScore',
      readOnly: true
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      location: 'location',
      industry: 'industry',
      author: 'author.name'
    },
    prepare({ title, location, industry, author }) {
      const subtitle = [location, industry, author].filter(Boolean).join(' • ')
      return {
        title,
        subtitle
      }
    }
  }
})
```

### 2. Recruitment Agency Schema

```typescript
// schemas/documents/recruitmentAgency.ts
export const recruitmentAgencySchema = defineType({
  name: 'recruitmentAgency',
  title: 'Recruitment Agency',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Agency Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    
    defineField({
      name: 'description',
      title: 'Agency Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().min(100).max(500)
    }),
    
    defineField({
      name: 'specializations',
      title: 'Specializations',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Chief of Staff', value: 'chief-of-staff' },
          { title: 'Executive Assistant', value: 'executive-assistant' },
          { title: 'C-Suite', value: 'c-suite' },
          { title: 'Board Advisory', value: 'board-advisory' },
          { title: 'Interim Management', value: 'interim' }
        ]
      }
    }),
    
    defineField({
      name: 'industries',
      title: 'Industry Focus',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Private Equity', value: 'private-equity' },
          { title: 'Hedge Funds', value: 'hedge-funds' },
          { title: 'Technology', value: 'technology' },
          { title: 'Financial Services', value: 'financial-services' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Retail', value: 'retail' }
        ]
      }
    }),
    
    defineField({
      name: 'locations',
      title: 'Office Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'city',
              title: 'City',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'address',
              title: 'Address',
              type: 'text',
              rows: 2
            }),
            defineField({
              name: 'phone',
              title: 'Phone',
              type: 'string'
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'string'
            })
          ]
        }
      ]
    }),
    
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(0).max(5).precision(1)
    }),
    
    defineField({
      name: 'reviewCount',
      title: 'Number of Reviews',
      type: 'number',
      validation: Rule => Rule.min(0)
    }),
    
    defineField({
      name: 'fees',
      title: 'Fee Structure',
      type: 'object',
      fields: [
        defineField({
          name: 'permanent',
          title: 'Permanent Placement Fee',
          type: 'string',
          description: 'e.g., "20-30% of first year salary"'
        }),
        defineField({
          name: 'retained',
          title: 'Retained Search Fee',
          type: 'string'
        }),
        defineField({
          name: 'contingency',
          title: 'Contingency Fee',
          type: 'string'
        }),
        defineField({
          name: 'guarantee',
          title: 'Guarantee Period',
          type: 'string',
          description: 'e.g., "90 days"'
        })
      ]
    }),
    
    defineField({
      name: 'placements',
      title: 'Annual Placements',
      type: 'object',
      fields: [
        defineField({
          name: 'chiefOfStaff',
          title: 'Chief of Staff Placements',
          type: 'number'
        }),
        defineField({
          name: 'total',
          title: 'Total Placements',
          type: 'number'
        }),
        defineField({
          name: 'averageSalary',
          title: 'Average Placement Salary',
          type: 'number'
        })
      ]
    }),
    
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'author',
              title: 'Author',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string'
            }),
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string'
            })
          ]
        }
      ]
    }),
    
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url'
    }),
    
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Profile',
      type: 'url'
    }),
    
    defineField({
      name: 'verified',
      title: 'Verified Agency',
      type: 'boolean',
      description: 'Has this agency been verified by our team?'
    })
  ]
})
```

### 3. Job Listing Schema

```typescript
// schemas/documents/jobListing.ts
export const jobListingSchema = defineType({
  name: 'jobListing',
  title: 'Job Listing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'company',
      title: 'Company',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Company Name',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'logo',
          title: 'Company Logo',
          type: 'image'
        }),
        defineField({
          name: 'website',
          title: 'Company Website',
          type: 'url'
        }),
        defineField({
          name: 'size',
          title: 'Company Size',
          type: 'string',
          options: {
            list: [
              { title: '1-10', value: 'startup' },
              { title: '11-50', value: 'small' },
              { title: '51-200', value: 'medium' },
              { title: '201-1000', value: 'large' },
              { title: '1000+', value: 'enterprise' }
            ]
          }
        })
      ]
    }),
    
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'remote',
          title: 'Remote Options',
          type: 'string',
          options: {
            list: [
              { title: 'On-site', value: 'onsite' },
              { title: 'Hybrid', value: 'hybrid' },
              { title: 'Fully Remote', value: 'remote' }
            ]
          }
        })
      ]
    }),
    
    defineField({
      name: 'salary',
      title: 'Salary',
      type: 'object',
      fields: [
        defineField({
          name: 'min',
          title: 'Minimum',
          type: 'number'
        }),
        defineField({
          name: 'max',
          title: 'Maximum',
          type: 'number'
        }),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'GBP'
        }),
        defineField({
          name: 'period',
          title: 'Period',
          type: 'string',
          options: {
            list: ['annual', 'monthly', 'daily', 'hourly']
          }
        })
      ]
    }),
    
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'portableText',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    
    defineField({
      name: 'applicationUrl',
      title: 'Application URL',
      type: 'url'
    }),
    
    defineField({
      name: 'applicationEmail',
      title: 'Application Email',
      type: 'string'
    }),
    
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where this job was sourced from'
    }),
    
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url'
    }),
    
    defineField({
      name: 'postedDate',
      title: 'Posted Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'datetime'
    }),
    
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Expired', value: 'expired' },
          { title: 'Filled', value: 'filled' },
          { title: 'On Hold', value: 'on-hold' }
        ]
      },
      initialValue: 'active'
    })
  ]
})
```

### 4. FAQ Content Schema

```typescript
// schemas/documents/faqContent.ts
export const faqContentSchema = defineType({
  name: 'faqContent',
  title: 'FAQ Content',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'question',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'shortAnswer',
      title: 'Short Answer',
      type: 'text',
      rows: 3,
      description: 'Brief answer for featured snippets (150-200 chars)',
      validation: Rule => Rule.required().max(200)
    }),
    
    defineField({
      name: 'detailedAnswer',
      title: 'Detailed Answer',
      type: 'portableText',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Career', value: 'career' },
          { title: 'Salary', value: 'salary' },
          { title: 'Skills', value: 'skills' },
          { title: 'Application', value: 'application' },
          { title: 'Industry', value: 'industry' }
        ]
      }
    }),
    
    defineField({
      name: 'relatedQuestions',
      title: 'Related Questions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faqContent' }]
        }
      ]
    }),
    
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    
    defineField({
      name: 'helpful',
      title: 'Marked as Helpful',
      type: 'number',
      initialValue: 0
    }),
    
    defineField({
      name: 'notHelpful',
      title: 'Marked as Not Helpful',
      type: 'number',
      initialValue: 0
    })
  ]
})
```

### 5. Author Schema

```typescript
// schemas/documents/author.ts
export const authorSchema = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    }),
    
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4
    }),
    
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'string',
      description: 'e.g., "Former Chief of Staff, 10 years recruitment"'
    }),
    
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Profile',
      type: 'url'
    }),
    
    defineField({
      name: 'twitter',
      title: 'Twitter/X Profile',
      type: 'url'
    })
  ]
})
```

---

## Object Schemas

### 1. Portable Text Configuration

```typescript
// schemas/objects/portableText.ts
export const portableTextSchema = defineType({
  name: 'portableText',
  title: 'Content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' }
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' }
        ],
        annotations: [
          {
            name: 'internalLink',
            title: 'Internal Link',
            type: 'object',
            fields: [
              {
                name: 'reference',
                title: 'Reference',
                type: 'reference',
                to: [
                  { type: 'chiefOfStaff' },
                  { type: 'recruitmentAgency' },
                  { type: 'faqContent' }
                ]
              }
            ]
          },
          {
            name: 'externalLink',
            title: 'External Link',
            type: 'object',
            fields: [
              {
                name: 'url',
                title: 'URL',
                type: 'url'
              },
              {
                name: 'newWindow',
                title: 'Open in New Window',
                type: 'boolean',
                initialValue: true
              }
            ]
          }
        ]
      }
    },
    {
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string'
        }
      ]
    },
    {
      type: 'code',
      options: {
        language: 'javascript',
        languageAlternatives: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' }
        ]
      }
    }
  ]
})
```

### 2. SEO Score Object

```typescript
// schemas/objects/seoScore.ts
export const seoScoreSchema = defineType({
  name: 'seoScore',
  title: 'SEO Score',
  type: 'object',
  fields: [
    defineField({
      name: 'score',
      title: 'Overall Score',
      type: 'number',
      validation: Rule => Rule.min(0).max(100)
    }),
    defineField({
      name: 'hasKeywordInTitle',
      title: 'Keyword in Title',
      type: 'boolean'
    }),
    defineField({
      name: 'hasKeywordInH1',
      title: 'Keyword in H1',
      type: 'boolean'
    }),
    defineField({
      name: 'hasKeywordInContent',
      title: 'Keyword in Content',
      type: 'boolean'
    }),
    defineField({
      name: 'hasBoldKeyword',
      title: 'Bold Keyword',
      type: 'boolean'
    }),
    defineField({
      name: 'hasInternalLinks',
      title: 'Has Internal Links',
      type: 'boolean'
    }),
    defineField({
      name: 'wordCount',
      title: 'Word Count',
      type: 'number'
    })
  ]
})
```

---

## Validation Rules

### Custom Validation Functions

```typescript
// schemas/validation.ts

// Validate UK phone numbers
export const validateUKPhone = (Rule: any) => 
  Rule.custom((phone: string) => {
    if (!phone) return true
    const ukPhoneRegex = /^(?:(?:\+44)|(?:0))(?:\d{10}|\d{11})$/
    return ukPhoneRegex.test(phone.replace(/\s/g, '')) || 'Invalid UK phone number'
  })

// Validate salary ranges
export const validateSalaryRange = (Rule: any) =>
  Rule.custom((salary: any) => {
    if (!salary) return true
    if (salary.min && salary.max && salary.min > salary.max) {
      return 'Minimum salary cannot be greater than maximum'
    }
    return true
  })

// Validate future dates
export const validateFutureDate = (Rule: any) =>
  Rule.custom((date: string) => {
    if (!date) return true
    if (new Date(date) < new Date()) {
      return 'Date must be in the future'
    }
    return true
  })

// Validate word count
export const validateWordCount = (min: number, max: number) => (Rule: any) =>
  Rule.custom((text: string) => {
    if (!text) return true
    const wordCount = text.split(/\s+/).length
    if (wordCount < min) return `Minimum ${min} words required`
    if (wordCount > max) return `Maximum ${max} words allowed`
    return true
  })
```

---

## Desk Structure

```typescript
// sanity/desk/structure.ts
import { StructureBuilder } from 'sanity/desk'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Chief of Staff Content')
        .child(
          S.list()
            .title('Chief of Staff')
            .items([
              S.listItem()
                .title('By Location')
                .child(
                  S.documentList()
                    .title('By Location')
                    .filter('_type == "chiefOfStaff" && defined(location)')
                    .params({})
                ),
              S.listItem()
                .title('By Industry')
                .child(
                  S.documentList()
                    .title('By Industry')
                    .filter('_type == "chiefOfStaff" && defined(industry)')
                ),
              S.listItem()
                .title('All Content')
                .child(
                  S.documentList()
                    .title('All Chief of Staff Content')
                    .filter('_type == "chiefOfStaff"')
                )
            ])
        ),
      
      S.listItem()
        .title('Recruitment Agencies')
        .child(
          S.list()
            .title('Agencies')
            .items([
              S.listItem()
                .title('Verified Agencies')
                .child(
                  S.documentList()
                    .title('Verified')
                    .filter('_type == "recruitmentAgency" && verified == true')
                ),
              S.listItem()
                .title('Pending Review')
                .child(
                  S.documentList()
                    .title('Pending')
                    .filter('_type == "recruitmentAgency" && verified != true')
                ),
              S.listItem()
                .title('All Agencies')
                .child(
                  S.documentList()
                    .title('All Agencies')
                    .filter('_type == "recruitmentAgency"')
                )
            ])
        ),
      
      S.listItem()
        .title('Job Listings')
        .child(
          S.list()
            .title('Jobs')
            .items([
              S.listItem()
                .title('Active Jobs')
                .child(
                  S.documentList()
                    .title('Active')
                    .filter('_type == "jobListing" && status == "active"')
                ),
              S.listItem()
                .title('Expired Jobs')
                .child(
                  S.documentList()
                    .title('Expired')
                    .filter('_type == "jobListing" && status == "expired"')
                ),
              S.listItem()
                .title('All Jobs')
                .child(
                  S.documentList()
                    .title('All Jobs')
                    .filter('_type == "jobListing"')
                )
            ])
        ),
      
      S.listItem()
        .title('FAQs')
        .child(
          S.documentList()
            .title('All FAQs')
            .filter('_type == "faqContent"')
        ),
      
      S.listItem()
        .title('Authors')
        .child(
          S.documentList()
            .title('All Authors')
            .filter('_type == "author"')
        ),
      
      S.divider(),
      
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Site Settings')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.listItem()
                .title('SEO Settings')
                .child(
                  S.document()
                    .schemaType('seoSettings')
                    .documentId('seoSettings')
                )
            ])
        )
    ])
```

---

## Migration Scripts

```typescript
// scripts/migrate-schemas.ts
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

// Example migration: Add SEO fields to existing documents
async function addSeoFields() {
  const documents = await client.fetch(
    `*[_type == "chiefOfStaff" && !defined(tldr)]`
  )
  
  for (const doc of documents) {
    await client
      .patch(doc._id)
      .set({
        tldr: doc.title.substring(0, 150),
        question: `What are Chief of Staff opportunities in ${doc.location}?`
      })
      .commit()
  }
  
  console.log(`Updated ${documents.length} documents`)
}

// Run migrations
addSeoFields().catch(console.error)
```

---

## GROQ Query Examples

```groq
// Get all Chief of Staff content for London
*[_type == "chiefOfStaff" && location == "london"] {
  _id,
  title,
  slug,
  tldr,
  salaryData,
  "author": author->name,
  "relatedAgencies": *[_type == "recruitmentAgency" && "london" in locations[].city]
}

// Get agency with testimonials
*[_type == "recruitmentAgency" && slug.current == $slug][0] {
  ...,
  "avgRating": rating,
  "testimonialCount": count(testimonials),
  testimonials[0...3]
}

// Get active jobs with company details
*[_type == "jobListing" && status == "active"] | order(postedDate desc) {
  title,
  slug,
  company,
  location,
  salary,
  postedDate,
  "daysAgo": dateTime(now()) - dateTime(postedDate)
}

// Get FAQ with related questions
*[_type == "faqContent" && slug.current == $slug][0] {
  ...,
  "related": relatedQuestions[]-> {
    question,
    slug,
    category
  }
}
```

## Conclusion

These Sanity schemas provide a robust foundation for TheChief.quest content management. They support SEO optimization, AI discovery, and scalable content operations while maintaining data integrity and relationships.

---

*Last Updated: December 2024*
*Version: 1.0*
*Next Review: After initial implementation*
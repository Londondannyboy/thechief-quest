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
        .custom((title: string | undefined) => {
          if (!title) return true
          if (title.length > 70) return 'Title will be truncated by Google (max 70 chars)'
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
        .custom((desc: string | undefined) => {
          if (!desc) return true
          if (desc.length > 200) return 'Description too long (max 200 chars)'
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
      title: 'metaTitle',
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
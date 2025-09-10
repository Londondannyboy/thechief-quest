import { defineType, defineField } from 'sanity'

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
  ],
  
  preview: {
    select: {
      title: 'title',
      company: 'company.name',
      location: 'location.city',
      status: 'status'
    },
    prepare({ title, company, location, status }) {
      const subtitle = `${company} • ${location} • ${status}`
      return {
        title,
        subtitle
      }
    }
  }
})
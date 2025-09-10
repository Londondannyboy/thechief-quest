import { defineType, defineField } from 'sanity'

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
  ],
  
  preview: {
    select: {
      title: 'name',
      verified: 'verified',
      rating: 'rating'
    },
    prepare({ title, verified, rating }) {
      const subtitle = verified ? `✓ Verified • ${rating ? `${rating}★` : 'Not rated'}` : 'Pending verification'
      return {
        title,
        subtitle
      }
    }
  }
})
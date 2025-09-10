import { defineType, defineField } from 'sanity'

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
  ],
  
  preview: {
    select: {
      title: 'question',
      category: 'category',
      helpful: 'helpful'
    },
    prepare({ title, category, helpful }) {
      const subtitle = `${category} • ${helpful} found helpful`
      return {
        title,
        subtitle
      }
    }
  }
})
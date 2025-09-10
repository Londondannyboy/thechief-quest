import { defineType } from 'sanity'

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
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string'
        }
      ]
    }
  ]
})
import { defineType, defineField } from 'sanity'

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
import { defineType, defineField } from 'sanity'

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
  ],
  
  preview: {
    select: {
      title: 'name',
      credentials: 'credentials',
      media: 'image'
    },
    prepare({ title, credentials, media }) {
      return {
        title,
        subtitle: credentials,
        media
      }
    }
  }
})
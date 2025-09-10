export default {
  name: 'featuredContent',
  title: 'Featured Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "Featured Locations", "Top Industries"',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'sectionKey',
      title: 'Section Key',
      type: 'slug',
      description: 'Unique identifier for this section (e.g., homepage-hero)',
      options: {
        source: 'title',
        maxLength: 50
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'featuredItems',
      title: 'Featured Items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'chiefOfStaff' },
            { type: 'recruitmentAgency' },
            { type: 'jobListing' },
            { type: 'faqContent' }
          ]
        }
      ],
      description: 'Select and order the content to feature',
      validation: (Rule: any) => Rule.max(10)
    },
    {
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'List', value: 'list' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'Hero', value: 'hero' }
        ],
        layout: 'radio'
      },
      initialValue: 'grid'
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this featured section',
      initialValue: true
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'sectionKey.current',
      active: 'isActive'
    },
    prepare(selection: any) {
      const { title, subtitle, active } = selection
      return {
        title,
        subtitle: `${subtitle} ${active ? '✓' : '✗'}`,
      }
    }
  }
}
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'sr',
          title: 'Serbian',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'slug',
          options: {
            source: 'name.en',
            maxLength: 96
          },
          validation: Rule => Rule.required()
        },
        {
          name: 'sr',
          title: 'Serbian',
          type: 'slug',
          options: {
            source: 'name.sr',
            maxLength: 96
          },
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'text',
          validation: Rule => Rule.required()
        },
        {
          name: 'sr',
          title: 'Serbian',
          type: 'text',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      validation: Rule => Rule.min(1).error('At least one image is required')
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      },
    },
    {
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'url'
        },
        {
          name: 'sr',
          title: 'Serbian',
          type: 'url'
        }
      ]
    },
    {
      name: 'sourceCodeUrl',
      title: 'Source Code URL',
      type: 'url'
    },
    {
      name: 'htmlContent',
      title: 'HTML Content',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{ type: 'block' }],
          rows: 10
        },
        {
          name: 'sr',
          title: 'Serbian',
          type: 'array',
          of: [{ type: 'block' }],
          rows: 10
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name.en',
      media: 'images.0'
    }
  }
}

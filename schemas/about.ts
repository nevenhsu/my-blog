import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle1',
      title: 'Subtitle 1',
      type: 'string',
    }),
    defineField({
      name: 'subtitle2',
      title: 'Subtitle 2',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'commendsTitle',
      title: 'Commends Title',
      type: 'string',
    }),
    defineField({
      name: 'commends',
      title: 'Commends',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'commend' } }],
    }),
    defineField({
      name: 'duration',
      title: 'Carousel Duration (seconds)',
      type: 'number',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection: { author: string }) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})

import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fieldsets: [
    { name: 'title', title: 'Title', options: { collapsible: false, columns: 1 } },
    { name: 'subtitle', title: 'Subtitle (Bold)', options: { collapsible: false, columns: 2 } },
    { name: 'caption', title: 'Caption (Bold)', options: { collapsible: false, columns: 2 } },
    { name: 'news', title: 'News (Cases)', options: { collapsible: false, columns: 2 } },
    { name: 'background', title: 'Background', options: { collapsible: false, columns: 1 } },
  ],
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'string',
    }),
    defineField({
      name: 'titles',
      title: 'Titles',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      fieldset: 'title',
    }),
    defineField({
      name: 'titleDuration',
      title: 'Duration (seconds))',
      type: 'number',
      fieldset: 'title',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'subtitleBold',
      title: 'Text',
      type: 'string',
      fieldset: 'subtitle',
    }),
    defineField({
      name: 'subtitleBoldHref',
      title: 'Link',
      type: 'string',
      fieldset: 'subtitle',
    }),
    defineField({
      name: 'caption1',
      title: 'Caption (Line 1)',
      type: 'string',
    }),
    defineField({
      name: 'caption2',
      title: 'Caption (Line 2)',
      type: 'string',
    }),
    defineField({
      name: 'captionBold',
      title: 'Text',
      type: 'string',
      fieldset: 'caption',
    }),
    defineField({
      name: 'captionBoldHref',
      title: 'Link',
      type: 'string',
      fieldset: 'caption',
    }),
    defineField({
      name: 'newsTitle',
      title: 'Title',
      type: 'string',
      fieldset: 'news',
    }),
    defineField({
      name: 'arrowText',
      title: 'Arrow Text',
      type: 'string',
      fieldset: 'news',
    }),
    defineField({
      name: 'news',
      title: 'News',
      type: 'array',
      of: [{ type: 'news' }],
    }),
    defineField({
      name: 'galleryTitle',
      title: 'Gallery Title',
      type: 'string',
    }),
    defineField({
      title: 'Gallery',
      type: 'gallery',
      name: 'gallery',
    }),
    defineField({
      name: 'bgFlash',
      title: 'Flash Color',
      type: 'color',
      fieldset: 'background',
    }),
    defineField({
      name: 'bgColors',
      title: 'Primary Colors',
      type: 'array',
      of: [{ type: 'color' }],
      fieldset: 'background',
    }),
    defineField({
      name: 'bgColorsSecondary',
      title: 'Secondary Colors',
      type: 'array',
      of: [{ type: 'color' }],
      fieldset: 'background',
    }),
  ],
  preview: {
    select: {
      titles: 'titles',
    },
    prepare(selection) {
      const { titles } = selection
      return { title: 'Home', subtitle: titles.join(', ') }
    },
  },
})

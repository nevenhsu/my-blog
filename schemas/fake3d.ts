import { defineField, defineType } from 'sanity'

export default defineType({
  title: 'Fake 3D',
  name: 'fake3d',
  type: 'object',
  fields: [
    { title: 'Title', name: 'title', type: 'string' },
    { title: 'Image', name: 'image', type: 'image', options: { hotspot: true } },
    { title: 'Depth', name: 'depth', type: 'image', options: { hotspot: true } },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})

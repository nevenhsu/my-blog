import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'commend',
  title: 'Commend',
  type: 'document',
  fields: [
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'reference',
      to: { type: 'avatar' },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'avatar.name',
      media: 'avatar.image',
      subtitle: 'content',
    },
  },
})

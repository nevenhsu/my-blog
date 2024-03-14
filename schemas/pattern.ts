import { defineType, defineField } from 'sanity'

export default defineType({
  title: 'Pattern',
  name: 'pattern',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'size',
      type: 'string',
    }),
  ],
})

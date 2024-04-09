import { defineType, defineField } from 'sanity'

export default defineType({
  title: 'Code',
  name: 'mCode',
  type: 'object',
  fields: [
    defineField({ title: 'Title', name: 'title', type: 'string' }),
    defineField({
      title: 'Code field',
      name: 'codeField',
      type: 'code',
    }),
  ],
})

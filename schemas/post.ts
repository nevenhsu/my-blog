import { defineField, defineType } from 'sanity'
import { getRwdField } from '@/utils/sanity/getRwdField'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fieldsets: [
    { name: 'password', title: 'Password', options: { collapsible: false, columns: 1 } },
    { name: 'time', title: 'Time', options: { collapsible: false, columns: 2 } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'locked',
      title: 'Lock',
      type: 'boolean',
      fieldset: 'password',
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
      fieldset: 'password',
    }),
    defineField({
      name: 'passwordHint',
      title: 'Password Hint',
      type: 'string',
      fieldset: 'password',
    }),
    defineField(
      getRwdField(
        { type: 'image', options: { hotspot: true } },
        { title: 'Main Image', name: 'mainImage' }
      )
    ),
    defineField({
      title: 'Background (css)',
      name: 'background',
      type: 'string',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'avatar' },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      fieldset: 'time',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'number',
      fieldset: 'time',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  options: { collapsed: false },
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'mainImage.base',
    },
  },
})

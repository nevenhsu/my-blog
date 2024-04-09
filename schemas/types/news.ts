import { defineType } from 'sanity'

export default defineType({
  title: 'News',
  name: 'news',
  type: 'image',
  options: {
    hotspot: true, // <-- Defaults to false
  },
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Post',
      name: 'post',
      type: 'reference',
      to: [{ type: 'post' }],
    },
  ],
})

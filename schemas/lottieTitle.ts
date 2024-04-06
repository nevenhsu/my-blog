import { defineType } from 'sanity'

export default defineType({
  title: 'Lottie Title',
  name: 'lottieTitle',
  type: 'object',
  fields: [
    { title: 'Title', name: 'title', type: 'string' },
    { title: 'Lottie Image', name: 'lottieImage', type: 'lottieImage' },
  ],
  preview: {
    select: {
      media: 'lottieImage',
    },
  },
})

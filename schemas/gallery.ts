import { defineField, defineType } from 'sanity'
import { getRwdField } from '@/utils/sanity/getRwdField'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: [
    defineField({ name: 'cols', title: 'Columns', type: 'number' }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      options: { layout: 'grid' },
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            { title: 'Lottie', name: 'lottie', type: 'lottie' },
            { title: 'Hide Image', name: 'hidden', type: 'boolean' },
            getRwdField({ type: 'rect' }),
          ],
        },
      ],
    }),
    {
      title: 'Background Pattern',
      name: 'bgPattern',
      type: 'image',
      options: { hotspot: true },
    },
    {
      title: 'Background Pattern Size',
      name: 'bgPatternSize',
      type: 'string',
    },
  ],
  preview: {
    select: {
      images: 'images',
      image: 'images.0',
    },
    prepare(selection) {
      const { images, image } = selection

      return {
        title: `Gallery block of ${Object.keys(images).length} images`,
        media: image,
      }
    },
  },
})

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: [
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
            { title: 'Title', name: 'title', type: 'string' },
            { title: 'Depth', name: 'depth', type: 'image' },
          ],
        },
      ],
    }),
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

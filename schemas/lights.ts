import { defineType, defineField } from 'sanity'

export default defineType({
  title: 'Lights',
  name: 'lights',
  type: 'object',
  fieldsets: [{ name: 'lights', title: 'Lights', options: { collapsible: false, columns: 1 } }],
  fields: [
    defineField({
      name: 'leftLights',
      title: 'Left Lights',
      type: 'array',
      of: [{ type: 'color' }],
      fieldset: 'lights',
    }),
    defineField({
      name: 'rightLights',
      title: 'Right Lights',
      type: 'array',
      of: [{ type: 'color' }],
      fieldset: 'lights',
    }),
  ],
})

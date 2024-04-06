import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { table } from '@sanity/table'
import { colorInput } from '@sanity/color-input'
import { codeInput } from '@sanity/code-input'
import { publicEnv } from '@/utils/env'
import { schemaTypes } from '@/schemas'
import { defaultDocumentNode } from '@/utils/sanity/defaultDocumentNode'
import LogoIcon from '@/public/images/logo.svg'

const { projectId, dataset } = publicEnv.sanity

export default defineConfig({
  basePath: '/studio', // <-- important that `basePath` matches the route you're mounting your studio from

  projectId,
  dataset,
  plugins: [
    structureTool({ defaultDocumentNode }),
    visionTool(),
    media(),
    colorInput(),
    codeInput(),
    table(),
  ],
  schema: {
    types: schemaTypes,
  },

  icon: LogoIcon,
})

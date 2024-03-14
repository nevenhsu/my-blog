import type { ColorData } from './color'
import type { SanityArray } from './common'

export type LightsData = {
  leftLights: SanityArray<ColorData>
  rightLights: SanityArray<ColorData>
}

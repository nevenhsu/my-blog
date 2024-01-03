export type SanityArray<T> = Array<T & { _key: string }>

export type SanityReference = { _ref: string }

export type SanitySlug = { slug: { current: string } }

export type BreakPoint = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type BreakPointData<T> = { [k in BreakPoint]: T }

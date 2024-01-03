import { Space_Grotesk } from 'next/font/google'

const title = Space_Grotesk({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--next-title',
})

export const fontVariables = `${title.variable}`

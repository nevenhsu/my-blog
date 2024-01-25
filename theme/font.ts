import { Source_Sans_3, STIX_Two_Text } from 'next/font/google'

const title = Source_Sans_3({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--next-title',
})

const body = STIX_Two_Text({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--next-body',
})

export const fontVariables = `${title.variable} ${body.variable}`

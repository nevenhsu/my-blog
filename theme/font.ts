import { Poppins, Nunito, Noto_Sans_TC } from 'next/font/google'

const title = Poppins({
  weight: ['200', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--next-title',
})

const body = Nunito({
  weight: ['200', '400'],
  subsets: ['latin'],
  variable: '--next-body',
})

const tc = Noto_Sans_TC({
  weight: ['200', '400', '500'],
  subsets: ['latin'],
  variable: '--next-tc',
})

export const fontVariables = `${title.variable} ${body.variable} ${tc.variable}`

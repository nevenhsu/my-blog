import { Poppins, Nunito } from 'next/font/google'

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

export const fontVariables = `${title.variable} ${body.variable}`

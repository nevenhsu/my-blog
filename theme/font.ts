import { Poppins, Nunito, Roboto_Mono, Noto_Sans_TC } from 'next/font/google'

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

const mono = Roboto_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--next-mono',
})

const tc = Noto_Sans_TC({
  weight: ['200', '400', '500'],
  subsets: ['latin'],
  variable: '--next-tc',
})

export const fontVariables = `${title.variable} ${body.variable} ${mono.variable} ${tc.variable}`

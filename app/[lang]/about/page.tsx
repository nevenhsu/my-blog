import { unstable_setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import About from '@/components/About'
import { getAboutData } from '@/utils/sanity/queries'

export default async function AboutPage({ params: { lang } }: { params: { lang: string } }) {
  unstable_setRequestLocale(lang)

  const { isEnabled } = draftMode()
  const data = isEnabled ? {} : await getAboutData(lang)

  return (
    <>
      <About initialData={data} lang={lang} />
    </>
  )
}

export const revalidate = 3600 // revalidate at most every hour

import { unstable_setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { getPostsData } from '@/utils/sanity/queries'
import BlogList from '@/components/BlogList'

export default async function BlogPage({ params: { lang } }: { params: { lang: string } }) {
  unstable_setRequestLocale(lang)

  const { isEnabled } = draftMode()
  const data = isEnabled ? {} : await getPostsData(lang)

  return <BlogList initialData={data} lang={lang} />
}

export const revalidate = 3600 // revalidate at most every hour

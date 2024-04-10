import { draftMode } from 'next/headers'
import Blog from '@/components/Blog'
import { getSlugData, getPostData } from '@/utils/sanity/queries'

export default async function BlogPage({
  params: { lang, slug },
}: {
  params: { lang: string; slug: string }
}) {
  const { isEnabled } = draftMode()
  const data = isEnabled ? {} : await getPostData(slug, lang)
  return (
    <>
      <Blog slug={slug} lang={lang} initialData={data} />
    </>
  )
}

export const revalidate = 3600 // revalidate at most every hour

export async function generateStaticParams() {
  const results = await getSlugData()
  return results.map(o => ({ slug: o.slug.current }))
}

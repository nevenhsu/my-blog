import { draftMode } from 'next/headers'
import { Box } from '@mantine/core'
import Home from '@/components/Home'
import { getHomeData } from '@/utils/sanity/queries'

export const revalidate = 3600 // revalidate at most every hour

export default async function Page() {
  const { isEnabled } = draftMode()
  const data = isEnabled ? {} : await getHomeData()

  return (
    <Box
      style={{
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Home initialData={data} />
    </Box>
  )
}

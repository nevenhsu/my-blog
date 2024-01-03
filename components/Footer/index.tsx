'use client'

import { usePathname } from 'next/navigation'
import useQuery from '@/hooks/useQuery'
import { useAppContext } from '@/stores/AppContext'
import { MotionSlide } from '@/components/motion'
import { px, Group } from '@mantine/core'
import { MyTitle, Body } from '@/components/Fonts'
import RwdBlock from '@/components/Rwd/Block'
import PopoverIcon from './PopoverIcon'
import DrawerIcon from './DrawerIcon'
import { footerQuery } from '@/utils/sanity/queries'
import type { FooterData } from '@/types/footer'

export default function Footer({ initialData }: { initialData: Partial<FooterData> }) {
  const [data] = useQuery<Partial<FooterData>>(initialData, footerQuery)
  const { email } = data

  const { state } = useAppContext()
  const { width } = state.viewportSize
  const matches = width >= Number(px('48em'))

  const pathname = usePathname()
  const atBlog = pathname.startsWith('/blog')

  if (atBlog) return null

  return (
    <RwdBlock
      ta="center"
      px={24}
      style={{
        position: 'relative',
        zIndex: 1,
        background: 'var(--mantine-color-body)',
      }}
    >
      <MotionSlide delay={3}>
        <MyTitle mb={40}>{data?.title}</MyTitle>
        <Body mb={12}>{data?.description}</Body>

        {email ? (
          <MyTitle
            className="c-pointer"
            mb={60}
            onClick={() => (window.location.href = `mailto:${email}`)}
          >
            {email}
          </MyTitle>
        ) : null}

        <Group gap={24} justify="center">
          {matches ? (
            <>
              {data?.links?.map(d => (
                <PopoverIcon key={d._key} data={d} />
              ))}
            </>
          ) : (
            <>
              {data?.links?.map(d => (
                <DrawerIcon key={d._key} data={d} />
              ))}
            </>
          )}
        </Group>
      </MotionSlide>
    </RwdBlock>
  )
}

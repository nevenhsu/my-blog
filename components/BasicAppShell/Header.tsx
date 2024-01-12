'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { MotionSlide } from '@/components/motion'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { modals } from '@mantine/modals'
import { AppShell, Stack, Group, Box, Button, ActionIcon, Badge } from '@mantine/core'
import { useMediaQuery, useDisclosure } from '@mantine/hooks'
import { usePreviousDifferent } from 'rooks'
import { useAppContext } from '@/stores/AppContext'
import UnderlineMotion from '@/components/motion/Underline'
import Logo from '@/public/images/logo.svg'
import classes from './index.module.css'
import { HiOutlineMenuAlt4, HiOutlineX } from 'react-icons/hi'
import type { ButtonProps } from '@mantine/core'

type Menu = { name: string; href: string }

export default function Header() {
  const matches = useMediaQuery('(min-width: 48em)')
  const {
    state: { isPreview, viewportSize, scroll },
  } = useAppContext()

  const previousScroll = usePreviousDifferent(scroll)
  const inContent = scroll.y > viewportSize.height
  const goingDown = scroll.y > (previousScroll?.y || 0)

  const [opened, { toggle }] = useDisclosure()
  const router = useRouter()
  const pathname = usePathname()
  const atBlog = pathname.startsWith('/blog')

  const renderMenu = (onClick: (o: Menu) => void, props: ButtonProps) => {
    return [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
    ].map(o => (
      <Button
        key={o.name}
        variant="transparent"
        c="var(--mantine-color-text)"
        size="compact-sm"
        onClick={() => onClick(o)}
        {...props}
      >
        <UnderlineMotion>{o.name}</UnderlineMotion>
      </Button>
    ))
  }

  useEffect(() => {
    const modalId = 'menu'
    if (opened) {
      modals.open({
        title: '',
        modalId,
        fullScreen: true,
        withCloseButton: false,
        withinPortal: false,
        children: (
          <Stack className="absolute-center" gap={32}>
            {renderMenu(
              o => {
                if (pathname != o.href) {
                  router.push(o.href)
                }
                toggle()
              },
              { fz: 20 }
            )}
          </Stack>
        ),
        styles: {
          body: { position: 'relative', height: '100%' },
        },
      })
    } else {
      modals.close(modalId)
    }
  }, [opened, pathname])

  return (
    <AppShell.Header
      className={clsx(classes.header, {
        [classes['header-out']]: scroll.y > 200 && goingDown,
      })}
    >
      <Box className={clsx(classes['header-bg'], { hide: !inContent })} />

      <MotionSlide delay={atBlog ? 0.5 : 3} style={{ height: '100%' }} direction="down">
        <Group pos="relative" h="100%" px={{ base: 24, sm: 40 }} justify="space-between">
          <Box
            c="var(--mantine-color-text)"
            pos="relative"
            w={{ base: 30, sm: 40 }}
            href="/"
            component={Link}
          >
            <Logo className="absolute-vertical" />
          </Box>

          {matches ? (
            <Group>
              {renderMenu(o => (pathname != o.href ? router.push(o.href) : null), {
                fz: { base: 16, lg: 18 },
              })}
            </Group>
          ) : (
            <ActionIcon pos="relative" c="white" variant="transparent" onClick={toggle}>
              <HiOutlineMenuAlt4
                size={24}
                className={clsx(classes.icon, { [classes['icon-hide']]: opened })}
              />
              <HiOutlineX
                size={24}
                className={clsx(classes.icon, { [classes['icon-hide']]: !opened })}
              />
            </ActionIcon>
          )}

          <Badge
            className="absolute-vertical"
            display={isPreview ? 'block' : 'none'}
            variant="outline"
            color="white"
            left={{ base: 80, sm: 120 }}
          >
            Preview
          </Badge>
        </Group>
      </MotionSlide>
    </AppShell.Header>
  )
}

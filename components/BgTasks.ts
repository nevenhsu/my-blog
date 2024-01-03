'use client'

import { useEffect } from 'react'
import { useViewportSize, useWindowScroll } from '@mantine/hooks'
import { useScreenQuery } from '@/hooks/useScreenQuery'
import { useAppContext } from '@/stores/AppContext'

export default function BgTasks() {
  useScreenQuery()

  const viewportSize = useViewportSize()
  const { updateState } = useAppContext()
  const [scroll] = useWindowScroll()

  useEffect(() => {
    updateState({ viewportSize })
  }, [viewportSize])

  useEffect(() => {
    updateState({ scroll })
  }, [scroll])

  return null
}

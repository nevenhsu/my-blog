'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/hooks/redux'
import { setPassword } from '@/stores/slices/post'

export function usePasswordUrl(slug: string) {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const passwordUrl = searchParams.get('p')

  useEffect(() => {
    if (slug && passwordUrl) {
      dispatch(setPassword({ password: passwordUrl, slug }))
    }
  }, [slug, passwordUrl])
}

'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Stack, Box, TextInput, ActionIcon, Button } from '@mantine/core'
import { MyTitle, Caption } from '@/components/Fonts'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { setPassword } from '@/stores/slices/post'
import classes from './index.module.css'
import type { PostData } from '@/types/post'

export default function MyPassword({ slug, data }: { slug: string; data: Partial<PostData> }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [error, setError] = useState('')

  const { password, passwordHint } = data
  const { [slug]: postData } = useAppSelector(state => state.post.data)
  const passwordFromRedux = postData?.password || ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (data.slug) {
      dispatch(setPassword({ password: e.currentTarget.value, slug: data.slug.current }))
    }

    if (error) {
      setError('')
    }
  }

  const handleClick = () => {
    setError(passwordFromRedux !== password ? 'Wrong password.' : '')
  }

  return (
    <>
      <Stack gap={40} w={{ base: 320, sm: 332, xl: 400 }} mx="auto">
        <Box>
          <MyTitle ta="center" mb={4}>
            Welcome!
          </MyTitle>
          <MyTitle ta="center">Please enter the password.</MyTitle>
        </Box>

        <Box pos="relative">
          <TextInput
            className={classes.input}
            value={passwordFromRedux}
            onChange={handleChange}
            variant="filled"
            size="lg"
            placeholder="Enter Password"
            c="var(--body-second)"
            rightSection={
              <ActionIcon
                variant="transparent"
                c={passwordFromRedux ? 'var(--mantine-color-text)' : 'var(--mantine-color-dimmed)'}
                onClick={handleClick}
              >
                <HiOutlineArrowNarrowRight size={24} />
              </ActionIcon>
            }
          />
          <Caption
            c="var(--mantine-color-error)"
            style={{
              position: 'absolute',
              bottom: -24,
              left: 0,
            }}
          >
            {error}
          </Caption>
        </Box>

        <Caption
          ta="center"
          c="dimmed"
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          {passwordHint}
        </Caption>

        <Button
          c="var(--mantine-color-text)"
          variant="transparent"
          onClick={() => router.push('/#blog')}
        >
          Back
        </Button>
      </Stack>
    </>
  )
}

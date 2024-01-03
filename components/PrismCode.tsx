'use client'

import _ from 'lodash'
import { useEffect, useRef } from 'react'
import { Box, Group, Text, CopyButton, Button } from '@mantine/core'
import Prism from 'prismjs'
import type { CodeData } from '@/types/mCode'

// include theme
import 'prism-themes/themes/prism-atom-dark.css'

// include components
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-cshtml'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'

// include line numbers and line highlights plugin,
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-highlight/prism-line-highlight'

// include css for line numbers and highlights
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'

export function PrismCode({ data }: { data: Partial<CodeData> }) {
  const ref = useRef<HTMLDivElement>(null)
  const { code = '', language = '' } = data.codeField || {}

  useEffect(() => {
    if (ref.current) {
      // highlight this specific component only.
      // ! Do not use Prism.highlightAll().
      Prism.highlightAllUnder(ref.current)
    }
  }, [data])

  return (
    <Box
      ref={ref}
      style={{
        background: 'var(--mantine-color-dark-9)',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <Group p={8} pl={16} justify="space-between">
        <Text fz={12}>{language}</Text>
        <CopyButton value={code}>
          {({ copied, copy }) => (
            <Button
              fz={12}
              fw="normal"
              size="compact-xs"
              variant="transparent"
              c="var(--mantine-color-text)"
              onClick={copy}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          )}
        </CopyButton>
      </Group>
      <pre
        className={`line-numbers language-${toLang(language)}`}
        style={{ borderRadius: 0, margin: 0 }}
      >
        <code>{_.trim(code)}</code>
      </pre>
    </Box>
  )
}

function toLang(val: string) {
  switch (val) {
    case 'tsx':
      return 'jsx'
    default:
      return val
  }
}

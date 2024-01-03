import { Title, Text } from '@mantine/core'
import type { TitleProps, TextProps } from '@mantine/core'

type MyTextProps = TextProps & { children: any }

export function Headline(props: TitleProps) {
  return <Title fz={{ base: 28, xl: 44 }} {...props} />
}

export function MyTitle(props: TitleProps) {
  return <Title fz={{ base: 20, xl: 26 }} {...props} />
}

export function Subtitle(props: TitleProps) {
  return <Title fz={{ base: 16, xl: 18 }} {...props} />
}

export function Body(props: MyTextProps) {
  return <Text fz={{ base: 16, xl: 18 }} {...props} />
}

export function Caption(props: MyTextProps) {
  return <Text fz={{ base: 14, xl: 16 }} {...props} />
}

export function Small(props: MyTextProps) {
  return <Text fz={8} {...props} />
}

import { Title, Text } from '@mantine/core'
import type { TitleProps, TextProps } from '@mantine/core'

type MyTextProps = TextProps & { children: any }

export function Headline(props: TitleProps) {
  return <Title fz={{ base: 38, lg: 50 }} {...props} />
}

export function MyTitle(props: TitleProps) {
  return <Title fz={{ base: 26, lg: 32 }} {...props} />
}

export function Subtitle(props: TitleProps) {
  return <Title fz={{ base: 20, lg: 22 }} {...props} />
}

export function Body(props: MyTextProps) {
  return <Text fz={{ base: 16, lg: 18 }} {...props} />
}

export function Caption(props: MyTextProps) {
  return <Text fz={{ base: 12, lg: 14 }} {...props} />
}

export function Small(props: MyTextProps) {
  return <Text fz={8} {...props} />
}

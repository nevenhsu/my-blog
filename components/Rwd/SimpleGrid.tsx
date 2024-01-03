import { SimpleGrid, type SimpleGridProps } from '@mantine/core'

export default function RwdSimpleGrid(props: SimpleGridProps) {
  return (
    <SimpleGrid
      spacing={{ base: 24, xl: 40 }}
      verticalSpacing={{ base: 24, sm: 40, xl: 60 }}
      {...props}
    />
  )
}

import React from 'react'
import { Box } from '@mantine/core'

type Props = { children: React.ReactNode }

export default function MaxWidthLayout({ children }: Props) {
  return (
    <Box className='w-full max-w-[70rem] xl:max-w-[80rem] mx-auto'>
      {children}
    </Box>
  )
}

export function ContainerLayout({ children }: Props) {
  return (
    <Box className='w-full max-w-[45rem]'>
      {children}
    </Box>
  )
}
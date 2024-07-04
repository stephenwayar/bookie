import React from 'react'
import { Box } from '@mantine/core'

interface Props { children: React.ReactNode }

export default function MaxWidthLayout({ children }: Props) {
  return (
    <Box className='w-full max-w-[70rem] xl:max-w-[80rem] mx-auto'>
      {children}
    </Box>
  )
}
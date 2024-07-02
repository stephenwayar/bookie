import React from 'react'
import { Box } from '@mantine/core'

type Props = {
  children: React.ReactNode;
  pt?: string;
  pb?: string;
  py?: string;
}

export default function MainLayout({
  children,
  pt = '',
  pb = '',
  py = ''
}: Props) {
  return (
    <Box className={`px-4 sm:px-8 md:px-10 ${pt} ${pb} ${py}`}>
      {children}
    </Box>
  )
}
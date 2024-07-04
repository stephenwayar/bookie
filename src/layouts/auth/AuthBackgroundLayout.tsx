import React, { useEffect } from 'react';
import { Box } from '@mantine/core';

interface Props { children: React.ReactNode }

export default function AuthBackgroundLayout({ children }: Props) {
  useEffect(() => {
    document.body.style.backgroundColor = '#f5f5f5'

    return () => {
      document.body.style.backgroundColor = ''
    };
  }, []);

  return (
    <Box>
      {children}
    </Box>
  );
}
import React, { useEffect } from 'react';
import { Box } from '@mantine/core';
import { useAppSelector } from '@/redux/hooks';

interface Props { children: React.ReactNode }

export default function AuthBackgroundLayout({ children }: Props) {
  const { darkMode } = useAppSelector((state) => state.preference.value);

  useEffect(() => {
    const body = document.querySelector('body');

    body!.style.backgroundColor = darkMode ? '#171717' : '#f5f5f5';

    return () => {
      body!.style.backgroundColor = darkMode ? '#171717' : '#ffffff';
    };
  }, [darkMode]);

  return (
    <Box>
      {children}
    </Box>
  );
}
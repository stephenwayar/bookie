import React from 'react'
import { ColorSchemeScript } from '@mantine/core';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>

      <body className='transition duration-100 ease-linear'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
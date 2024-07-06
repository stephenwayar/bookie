import { ColorSchemeScript } from '@mantine/core';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      
      <body className='transition duration-150 delay-[50ms] ease-linear'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
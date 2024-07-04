import React from 'react'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast';

interface Props { children: React.ReactNode }

export default function AppLayout({ children }: Props) {
  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/assets/imgs/favicon.png"
        />
      </Head>

      <Toaster
        reverseOrder={false}
        position="bottom-center"
      />

      {children}
    </React.Fragment>
  )
}
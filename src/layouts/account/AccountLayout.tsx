import React from 'react'
import { Box } from '@mantine/core'
import AppLayout from '../common/AppLayout'
import MainLayout from '../common/MainLayout'
import Nav from '@/components/secondary/nav/Nav'
import MaxWidthLayout from '../common/MaxWidthLayout'
import AccountSideNav from '@/components/secondary/nav/AccountSideNav'

interface Props { children: React.ReactNode }

export default function AccountLayout({ children }: Props) {
  return (
    <AppLayout>
      <Nav />

      <MainLayout>
        <MaxWidthLayout>
          <Box className='hidden lg:block'>
            <AccountSideNav />
          </Box>

          <Box className='lg:ml-[20rem] xl:ml-[25rem]'>
            <Box className='lg:pl-10 pt-8 pb-20'>
              <Box>
                {children}
              </Box>
            </Box>
          </Box>
        </MaxWidthLayout>
      </MainLayout>
    </AppLayout>
  )
}
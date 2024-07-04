import React from 'react'
import AppLayout from '../common/AppLayout'
import MainLayout from '../common/MainLayout'
import { useDisclosure } from '@mantine/hooks'
import Nav from '@/components/secondary/nav/Nav'
import MaxWidthLayout from '../common/MaxWidthLayout'
import { Box, Drawer, UnstyledButton } from '@mantine/core'
import AccountSideNav from '@/components/secondary/nav/AccountSideNav'

interface Props { children: React.ReactNode }

export default function AccountLayout({ children }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <AppLayout>
      <Nav />

      <MainLayout>
        <MaxWidthLayout>
          <Box className='hidden lg:block'>
            <AccountSideNav />
          </Box>

          <Drawer 
            opened={opened} 
            onClose={close}
          >
            <AccountSideNav />
          </Drawer>

          <Box className='lg:ml-[20rem] xl:ml-[25rem]'>
            <Box className='lg:pl-10 pt-8 pb-20 space-y-5'>
              <Box className='lg:hidden flex justify-end'>
                <UnstyledButton onClick={open} className='bg-[#090A04] text-white py-2 px-4 rounded-md text-center text-sm'>
                  Open nav
                </UnstyledButton>
              </Box>

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
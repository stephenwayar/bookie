import React from 'react'
import Link from 'next/link'
import hero from '@/assets/imgs/bookied.jpg'
import Logo from '@/components/secondary/common/Logo'
import { BackgroundImage, Box } from '@mantine/core'
import MaxWidthLayout from '../common/MaxWidthLayout'

interface Props { children: React.ReactNode }

export default function AuthLayout({ children }: Props) {
  return (
    <React.Fragment>
      <MaxWidthLayout>
        <Box className="hidden lg:block">
          <Box className="w-[50%] h-[100vh] space-y-3 p-10 fixed">
            <Box className='w-fit'>
              <Link href='/'>
                <Logo />
              </Link>
            </Box>

            <Box className='rounded-lg h-[90%] w-fit overflow-hidden'>
              <BackgroundImage src={hero.src} className="w-[470px] transition duration-[500ms] delay-75 hover:brightness-50 hover:scale-125 xl:w-[500px] h-full bg-cover bg-left bg-no-repeat" />
            </Box>
          </Box>
        </Box>

        <Box className="lg:ml-[50%]">
          <Box className='lg:flex w-full h-[100vh] lg:items-center'>
            <Box className='w-full'>
              {children}
            </Box>
          </Box>
        </Box>
      </MaxWidthLayout>
    </React.Fragment>
  )
}
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/secondary/nav/Nav";
import AppLayout from "@/layouts/common/AppLayout";
import serverDown from '@/assets/svgs/server-down.svg'
import { Box, Center, Text, UnstyledButton } from "@mantine/core";
import SEOMetaTags from "@/components/secondary/common/SEOMetaTags";

export default function ServerDown() {
  return (
    <AppLayout>
      <SEOMetaTags title="Server down" />

      <Nav />

      <Center className="mt-20">
        <Box className="space-y-5 max-w-[500px]">
          <Box className="w-[250px] mx-auto">
            <Image
              priority
              alt='no-data'
              src={serverDown}
              className="w-[350px] mx-auto"
            />
          </Box>

          <Text className="text-[#090A04] text-center dark:bg-[#333333] text-4xl font-semibold">
            Oops!
          </Text>

          <Text className="text-[#667085] text-center dark:bg-[#333333] text-lg">
            There was a problem from our end
          </Text>

          <Box className="text-center">
            <Link href="/">
              <UnstyledButton className="bg-[#cc903c] hover:bg-[#cc903cdf] text-white h-[45px] rounded-lg text-center dark:bg-[#333333] w-36">
                Go home
              </UnstyledButton>
            </Link>
          </Box>
        </Box>
      </Center>
    </AppLayout>
  )
}
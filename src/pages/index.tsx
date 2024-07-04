import React from "react";
import Link from "next/link";
import hero from '@/assets/svgs/home-hero.svg'
import Nav from "@/components/secondary/nav/Nav";
import AppLayout from "@/layouts/common/AppLayout";
import MainLayout from "@/layouts/common/MainLayout";
import Logo from "@/components/secondary/common/Logo";
import MaxWidthLayout from "@/layouts/common/MaxWidthLayout";
import SEOMetaTags from "@/components/secondary/common/SEOMetaTags";
import { BackgroundImage, Box, Center, Text, UnstyledButton } from "@mantine/core";

export default function Home() {
  return (
    <AppLayout>
      <SEOMetaTags title="Bookie | Home" />
      
      <Nav />

      <MainLayout pt="pt-10" pb="pb-20">
        <MaxWidthLayout>
          <BackgroundImage src={hero.src} className="py-5 sm:py-6 rounded-[10px]">
            <Box className="h-[35rem]">
              <Center className="h-full w-full flex items-center">
                <Box className="mx-auto w-full max-w-[40rem] lg:max-w-[55rem] space-y-7">
                  <Box className="w-fit mx-auto">
                    <Logo />
                  </Box>

                  <Box className="max-w-[45rem] space-y-8 mx-auto">
                    <Text className="text-center text-white font-semibold text-3xl lg:text-4xl">
                      Explore a world of books and knowledge from talented authors
                    </Text>

                    <Box className="text-center">
                      <Link href="/books">
                        <UnstyledButton className="bg-[#cc903c] hover:bg-[#cc903cdf] text-white h-[55px] rounded-lg animate-bounce text-center w-40">
                          Show me
                        </UnstyledButton>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Center>
            </Box>
          </BackgroundImage>
        </MaxWidthLayout>
      </MainLayout>
    </AppLayout>
  );
}
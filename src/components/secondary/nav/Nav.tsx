import React from "react";
import Link from "next/link";
import Search from "./Search";
import Logo from "../common/Logo";
import { useRouter } from "next/router";
import { useDisclosure } from "@mantine/hooks";
import { useAppSelector } from "@/redux/hooks";
import MainLayout from "@/layouts/common/MainLayout";
import NavElement from "@/components/lib/custom/NavElement";
import MaxWidthLayout from "@/layouts/common/MaxWidthLayout";
import { Box, Burger, Flex, UnstyledButton } from "@mantine/core";

export default function Nav() {
  const { asPath } = useRouter()
  const [opened, { toggle }] = useDisclosure(false);
  const user = useAppSelector((state) => state.user.value)

  return (
    <NavElement className="border-b-2 sticky z-10 top-0 bg-white border-neutral-200">
      <MainLayout>
        <MaxWidthLayout>
          <Flex className="h-[90px] space-x-10 items-center justify-between">
            <Box>
              <Link href='/'>
                <Logo />
              </Link>
            </Box>

            <Box className="lg:block hidden w-full max-w-2xl">
              <Search />
            </Box>

            <Burger
              size='md'
              color='black'
              opened={opened}
              onClick={toggle}
              className="lg:hidden"
            />

            <Box className="lg:block hidden">
              <Flex className="items-center space-x-8">
                <Box>
                  <Link className={asPath === '/books' ? 'border-b-2 border-[#090A04]' : ''} href="/books">
                    <UnstyledButton className="text-[#090A04] font-semibold">
                      Books
                    </UnstyledButton>
                  </Link>
                </Box>

                {user ? (
                  <Box>
                    <Link href="/account">
                      <UnstyledButton className="bg-[#090A04] text-white h-[55px] rounded-full text-center w-28">
                        Account
                      </UnstyledButton>
                    </Link>
                  </Box>
                ) : (
                  <Flex className="items-center space-x-8">
                    <Box>
                      <Link href="/login">
                        <UnstyledButton className="text-[#090A04] font-semibold">
                          Login
                        </UnstyledButton>
                      </Link>
                    </Box>

                    <Box>
                      <Link href="/register">
                        <UnstyledButton className="bg-[#090A04] text-white h-[55px] rounded-full text-center w-28">
                          Register
                        </UnstyledButton>
                      </Link>
                    </Box>
                  </Flex>
                )}
              </Flex>
            </Box>
          </Flex>
        </MaxWidthLayout>
      </MainLayout>
    </NavElement>
  )
}
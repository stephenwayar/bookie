import React from "react";
import Link from "next/link";
import Search from "./Search";
import Logo from "../common/Logo";
import { useRouter } from "next/router";
import { useDisclosure } from "@mantine/hooks";
import type { User } from "@/redux/types/user.types";
import MainLayout from "@/layouts/common/MainLayout";
import { setDarkMode } from "@/redux/slices/preference";
import NavElement from "@/components/lib/custom/NavElement";
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import MaxWidthLayout from "@/layouts/common/MaxWidthLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Burger, Flex, Modal, UnstyledButton, Switch, useMantineTheme, rem } from "@mantine/core";

export default function Nav() {
  const theme = useMantineTheme();
  const { asPath } = useRouter()
  const dispatch = useAppDispatch()
  const [opened, { toggle }] = useDisclosure(false);
  const user = useAppSelector((state) => state.user.value)
  const darkMode = useAppSelector((state) => state.preference.value.darkMode)

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <NavElement className="border-b-2 sticky z-10 top-0 bg-white dark:bg-[#121212] border-neutral-200 dark:border-[#2a2a2a]">
      <MainLayout>
        <MaxWidthLayout>
          <Flex className="h-[90px] space-x-10 items-center justify-between">
            <Flex className="items-center space-x-4">
              <Link href='/'>
                <Logo />
              </Link>

              <Switch
                size="md"
                color="dark.4"
                onLabel={sunIcon}
                checked={darkMode}
                offLabel={moonIcon}
                onChange={(event) => dispatch(setDarkMode(event.currentTarget.checked))}
              />
            </Flex>

            <Box className="lg:block hidden w-full max-w-2xl">
              <Search />
            </Box>

            <Burger
              size='md'
              color={darkMode ? '#e0e0e0' : "black"}
              opened={opened}
              onClick={toggle}
              className="lg:hidden"
            />

            <MobileModal
              user={user}
              opened={opened}
              toggle={toggle}
            />

            <Box className="lg:block hidden">
              <Flex className="items-center space-x-8">
                <Box>
                  <Link className={asPath === '/books' ? 'border-b-2 text-[#090A04] dark:text-[#e0e0e0] font-semibold dark:border-[#e0e0e0] border-[#090A04]' : 'dark:text-[#e0e0e0] font-semibold'} href="/books">
                    Books
                  </Link>
                </Box>

                {user ? (
                  <Box>
                    <Link href="/account">
                      <UnstyledButton className="bg-[#090A04] text-white dark:bg-[#333333]  h-[55px] rounded-full text-center w-28">
                        Account
                      </UnstyledButton>
                    </Link>
                  </Box>
                ) : (
                  <Flex className="items-center space-x-8">
                    <Box>
                      <Link href="/login">
                        <UnstyledButton className="text-[#090A04] dark:border-[#e0e0e0] dark:text-[#e0e0e0] font-semibold">
                          Login
                        </UnstyledButton>
                      </Link>
                    </Box>

                    <Box>
                      <Link href="/register">
                        <UnstyledButton className="bg-[#090A04] text-white dark:bg-[#333333] h-[55px] rounded-full text-center w-28">
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

interface MobileModal {
  opened: boolean;
  user: User | null
  toggle: () => void;
}

const MobileModal: React.FC<MobileModal> = ({ opened, toggle, user }) => {
  const theme = useMantineTheme();
  const { asPath } = useRouter()
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector((state) => state.preference.value.darkMode)

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Modal
      fullScreen
      padding={0}
      opened={opened}
      onClose={toggle}
      withCloseButton={false}
      transitionProps={{ transition: 'fade', duration: 200 }}
    >
      <NavElement className="border-b-2 sticky z-10 top-0 bg-white border-neutral-200 dark:bg-[#121212] dark:border-[#e0e0e0]">
        <MainLayout>
          <MaxWidthLayout>
            <Flex className="h-[90px] space-x-10 items-center justify-between">
              <Flex className="items-center space-x-4">
                <Link href='/'>
                  <Logo />
                </Link>

                <Switch
                  size="md"
                  color="dark.4"
                  onLabel={sunIcon}
                  checked={darkMode}
                  offLabel={moonIcon}
                  onChange={(event) => dispatch(setDarkMode(event.currentTarget.checked))}
                />
              </Flex>

              <Burger
                size='md'
                color={darkMode ? '#e0e0e0' : "black"}
                opened={opened}
                onClick={toggle}
              />
            </Flex>
          </MaxWidthLayout>
        </MainLayout>
      </NavElement>

      <MainLayout pt="pt-5 dark:bg-[#171717] dark:h-screen">
        <MaxWidthLayout>
          <Box>
            <Flex className="flex flex-col items-center space-y-8">
              <Box className="w-full max-w-2xl">
                <Search />
              </Box>

              <Box>
                <Link className={asPath === '/books' ? 'border-b-2 text-[#090A04] dark:!text-[#e0e0e0] font-semibold dark:border-[#e0e0e0] border-[#090A04]' : 'dark:text-[#e0e0e0] font-semibold'} href="/books">
                  Books
                </Link>
              </Box>

              {user ? (
                <Box>
                  <Link href="/account">
                    <UnstyledButton className="bg-[#090A04] text-white h-[55px] dark:bg-[#333333] rounded-full text-center w-28">
                      Account
                    </UnstyledButton>
                  </Link>
                </Box>
              ) : (
                <Flex className="flex flex-col items-center space-y-8">
                  <Box>
                    <Link href="/login">
                      <UnstyledButton className="text-[#090A04] dark:border-[#e0e0e0] dark:text-[#e0e0e0] font-semibold">
                        Login
                      </UnstyledButton>
                    </Link>
                  </Box>

                  <Box>
                    <Link href="/register">
                      <UnstyledButton className="bg-[#090A04] text-white h-[55px] dark:bg-[#333333] rounded-full text-center w-28">
                        Register
                      </UnstyledButton>
                    </Link>
                  </Box>
                </Flex>
              )}
            </Flex>
          </Box>
        </MaxWidthLayout>
      </MainLayout>
    </Modal>
  )
}
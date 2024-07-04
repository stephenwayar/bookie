import React from "react";
import Link from "next/link";
import { Icon } from '@iconify/react';
import { useRouter } from "next/router";
import { useHover } from '@mantine/hooks';
import { Text, Box, Flex, UnstyledButton } from '@mantine/core'

interface Props {
  text: string,
  icon: string,
  linkTarget: string
}

const AccountNavLink: React.FC<Props> = ({
  linkTarget,
  text,
  icon
}) => {
  const { asPath } = useRouter()
  const { hovered, ref }: any = useHover();

  return (
    <Box className="w-full">
      <Link href={linkTarget}>
        <UnstyledButton ref={ref} className={`w-fit transition duration-75 delay-50 ease-linear ${asPath === linkTarget ? 'text-[#cc903c]' : 'text-[#090A04] hover:text-[#cc903c]'}`}>
          <Flex className="items-center space-x-[10px]">
            <Box className="w-[20px] h-[20px]">
              <Icon
                icon={icon}
                color={hovered || asPath === linkTarget ? '#cc903c' : '#090A04'}
                width="20"
                height="20"
              />
            </Box>

            <Box>
              <Text>
                {text}
              </Text>
            </Box>
          </Flex>
        </UnstyledButton>
      </Link>
    </Box>
  )
}

export default AccountNavLink
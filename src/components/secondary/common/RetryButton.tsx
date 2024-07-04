import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Flex, Text, UnstyledButton } from "@mantine/core";

interface Props {
  retryFn: any
  failedTo: string;
}

export default function RetryButton({ failedTo, retryFn }: Props) {
  return (
    <Box className="p-5 space-y-4 w-fit mx-auto text-center">
      <Text className="font-semibold text-[#090A04] text-xl">
        Failed to {failedTo}
      </Text>

      <UnstyledButton
        type='button'
        onClick={retryFn}
        className='h-[3rem] w-28 text-white text-center rounded-full py-2 px-5 bg-brand-expresso transition duration-75 delay-75 ease-linear bg-[#090a04e0]'
      >
        <Flex className="items-center space-x-[8px]">
          <Box className="w-[18px] h-[18px]">
            <Icon
              icon='ooui:reload'
              width="18"
              height="18"
            />
          </Box>

          <Text className="font-bold">
            Retry
          </Text>
        </Flex>
      </UnstyledButton>
    </Box>
  )
}
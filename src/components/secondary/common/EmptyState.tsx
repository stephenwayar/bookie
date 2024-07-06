import React from "react"
import Image from "next/image"
import noImage from '@/assets/svgs/no-data.svg'
import { Center, Box, Text } from "@mantine/core"

interface Props {
  message: string
  withImage?: boolean
}

export default function EmptyState({ message, withImage = true }: Props) {
  return (
    <Center>
      <Box className="space-y-5 max-w-[500px]">
        {withImage && (
          <Box className="w-[250px] mx-auto">
            <Image
              priority
              alt='no-data'
              src={noImage}
              className="w-[250px] mx-auto"
            />
          </Box>
        )}

        <Text className="text-[#090A04] dark:text-[#e0e0e0] text-center text-4xl font-semibold">
          Oops! 
        </Text>

        <Text className="text-[#667085] dark:text-[#e0e0e0] text-center text-lg">
          {message}
        </Text>
      </Box>
    </Center>
  )
}
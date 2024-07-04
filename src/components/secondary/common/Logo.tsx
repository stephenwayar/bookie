import React from "react";
import Image from "next/image";
import { Box } from "@mantine/core";
import logo from '@/assets/imgs/logo.png'

export default function Logo() {
  return (
    <Box className="w-[150px]">
      <Image
        priority
        src={logo}
        alt="logo icon"
        className='w-[150px]'
      />
    </Box>
  )
}
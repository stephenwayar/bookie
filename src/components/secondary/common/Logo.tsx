import React from "react";
import logo from '@/assets/imgs/logo.png'
import { Box } from "@mantine/core";
import Image from "next/image";

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
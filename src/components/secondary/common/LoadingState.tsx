import React from "react";
import { Box } from "@mantine/core";
import { useAppSelector } from "@/redux/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function LoadingState() {
  const darkMode = useAppSelector((state) => state.preference.value.darkMode)

  return (
    <Box className="p-5 w-fit mx-auto">
      <Icon
        width="30"
        height="30"
        color={darkMode ? '#e0e0e0' : "#100D03"}
        className='animate-spin'
        icon="fluent:spinner-ios-16-filled"
      />
    </Box>
  )
}
import { Icon } from "@iconify/react/dist/iconify.js";
import { Box } from "@mantine/core";
import React from "react";

export default function LoadingState() {
  return (
    <Box className="p-5 w-fit mx-auto">
      <Icon
        className='animate-spin'
        icon="fluent:spinner-ios-16-filled"
        color="#100D03"
        width="40"
        height="40"
      />
    </Box>
  )
}
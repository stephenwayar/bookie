import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks";
import Input from "@/components/lib/custom/Input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Divider, Flex, Text, UnstyledButton } from "@mantine/core";

export default function Search() {
  const { push } = useRouter()
  const [query, setQuery] = useState('')
  const { darkMode } = useAppSelector((state) => state.preference.value)

  const handleSearch = () => {
    const parsedQuery = query.split(' ').join('+').toLowerCase();
    const path = `/search?query=${parsedQuery}`;

    push(path);
  };

  return (
    <Flex className="border-2 border-[#090A04] dark:border-[#2a2a2a] items-center h-[50px] my-1 w-full rounded-full p-[6px] justify-between space-x-2">
      <Box className="hidden sm:block">
        <Flex className="items-center space-x-2 ml-3">
          <Box>
            <Text className="text-[#090A04] dark:text-[#e0e0e0]">
              Books
            </Text>
          </Box>

          <Box>
            <Icon 
              width="24" 
              height="24" 
              icon="ph:books" 
              style={{ color: darkMode ? '#e0e0e0' : '#090A04' }} 
            />
          </Box>
        </Flex>
      </Box>

      <Divider 
        size='sm' 
        orientation="vertical" 
        className="hidden sm:block"
        color={darkMode ? '#2a2a2a' : "#757575"} 
      />

      <Flex className="h-full items-center w-full">
        <Box className="w-full">
          <Input 
            type="text"
            value={query}
            onChange={({ target }) => setQuery(target.value)}
            placeholder="Search book by title, author's first name or last name"
            className="border-none bg-transparent focus:outline-none w-full py-1 px-2 placeholder:text-sm placeholder:text-[#090A04] text-[#090A04] dark:text-[#e0e0e0] dark:placeholder:text-[#e0e0e0]"
          />
        </Box>

        <Box className="h-full">
          <UnstyledButton
            type='button'
            disabled={!query}
            onClick={handleSearch}
            className='w-fit h-full dark:bg-[#333333] text-white text-center rounded-full py-1 px-4 bg-[#090A04] disabled:cursor-not-allowed disabled:opacity-75'
          >
            <Flex className="items-center justify-between space-x-[4px]">
              <Box className="w-[18px] h-[18px]">
                <Icon
                  width="16"
                  height="16"
                  color='white'
                  icon='iconamoon:search'
                />
              </Box>

              <Text>
                Search
              </Text>
            </Flex>
          </UnstyledButton>
        </Box>
      </Flex>
    </Flex>
  )
}
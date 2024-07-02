import { Box, Text } from "@mantine/core";
import React from "react";
import image from '@/assets/imgs/book.jpg'
import Image from "next/image";
import Link from "next/link";

export type Book = {
  id: string;
  title: string
}

interface Props {
  data: Book
}

export default function BookCard({ data }: Props) {
  return (
    <Box className="shadow-md rounded-b-md">
      <Box className="overflow-hidden">
        <Image
          priority
          alt='book'
          src={image}
          className="object-cover object-center transition duration-[200ms] delay-75 hover:brightness-50 hover:scale-125"
        />
      </Box>

      <Box className="p-3">
        <Text className="text-lg font-semibold text-[#1D1D1B] truncate">
          56 Days
        </Text>

        <Text className="text-[#667085] text-sm truncate">
          Book Description
        </Text>

        <Link className="hover:underline text-[#1D1D1B]" href={`/books/${data.id}`}>
          See details
        </Link>
      </Box>
    </Box>  
  )
}
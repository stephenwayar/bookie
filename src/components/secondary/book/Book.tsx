import { Box, Text } from "@mantine/core";
import React from "react";
import image from '@/assets/imgs/book.jpg'
import Image from "next/image";
import Link from "next/link";
import { User } from "@/redux/types/user.type";

export type Book = {
  _id: string;
  title: string
  description: string;
  author: User
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
          {data.title}
        </Text>

        <Text className="text-[#cc903c] text-sm truncate">
          Add by <Link className="hover:underline" href={`/authors/${(data.author as any)._id}`}>{data.author.firstName} {data.author.lastName}</Link>
        </Text>

        <Link className="hover:underline font-semibold text-[#1D1D1B]" href={`/books/${data._id}`}>
          See details
        </Link>
      </Box>
    </Box>  
  )
}
import React from "react";
import Image from "next/image";
import { BASE_URL } from "@/config/env";
import preview from '@/assets/imgs/mac.jpg'
import { Box, Flex, Text } from "@mantine/core";
import Nav from "@/components/secondary/nav/Nav";
import AppLayout from "@/layouts/common/AppLayout";
import MainLayout from "@/layouts/common/MainLayout";
import type { User } from "@/redux/types/user.types";
import type { Book } from "@/redux/types/book.types";
import BookCard from "@/components/secondary/book/Book";
import MaxWidthLayout from "@/layouts/common/MaxWidthLayout";
import EmptyState from "@/components/secondary/common/EmptyState";
import SEOMetaTags from "@/components/secondary/common/SEOMetaTags";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Author({ 
  data 
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const title = data.author?.email ? `${data.author.firstName} ${data.author.lastName}` : 'Author Not found'

  return (
    <AppLayout>
      <SEOMetaTags title={title} />

      <Nav />

      <MainLayout>
        <MaxWidthLayout>
          {data.author?.email ? (
            <Box>
              <Box className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <Box className="w-full overflow-hidden">
                  <Image
                    priority
                    src={preview}
                    alt='preview-photo'
                    className="object-cover object-center transition duration-[200ms] delay-75 hover:brightness-50 hover:scale-125"
                  />
                </Box>

                <Box className="lg:grid lg:content-center dark:bg-[#e0e0e0] p-4">
                  <Box className="w-full space-y-4">
                    <Text className='font-semibold text-3xl text-[#cc903c]'>
                      Author Details
                    </Text>

                    <Flex className="items-start space-x-2">
                      <Text className='text-2xl whitespace-nowrap text-[#090A04]'>
                        Full name -
                      </Text>

                      <Text className='font-semibold truncate text-2xl text-[#090A04]'>
                        {data.author.firstName} {data.author.lastName}
                      </Text>
                    </Flex>

                    <Flex className="items-start space-x-2">
                      <Text className='text-2xl whitespace-nowrap text-[#090A04]'>
                        Email -
                      </Text>

                      <Text className='font-semibold truncate text-2xl text-[#090A04]'>
                        {data.author.email}
                      </Text>
                    </Flex>

                    <Flex className="items-start space-x-2">
                      <Text className='text-2xl whitespace-nowrap text-[#090A04]'>
                        Phone number -
                      </Text>

                      <Text className='font-semibold truncate text-2xl text-[#090A04]'>
                        {data.author.phoneNumber}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              </Box>

              <Box className='space-y-6 mt-10 mb-20'>
                <Text className='font-semibold text-3xl text-[#cc903c]'>
                  Books by this author
                </Text>

                {data.author && (
                  data.author.books.length > 0 ? (
                    <Box className="sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 space-y-5 sm:space-y-0 sm:gap-5">
                      {data.author.books.map((book: Book, index: number) => (
                        <BookCard
                          key={index}
                          data={book}
                        />
                      ))}
                    </Box>
                  ) : (
                    <EmptyState message="Author has not added any books" />
                  )
                )}
              </Box>
            </Box>
          ) : (
            <Box className="py-20">
              <EmptyState message="Author not found" />
            </Box>
          )}
        </MaxWidthLayout>
      </MainLayout>
    </AppLayout>
  );
}

interface ServerSideProps { data: { author: User | null } }

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  const { id } = context.query;

  if (id) {
    try {
      const res = await fetch(`${BASE_URL}/api/users/${id as string}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const author = await res.json()

      return {
        props: {
          data: {
            author
          }
        }
      };
    } catch (error) {
      return {
        props: {
          data: {
            author: null,
          }
        }
      };
    }
  } else {
    return {
      props: {
        data: {
          author: null,
        }
      }
    };
  }
};
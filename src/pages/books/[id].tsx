import React from "react";
import Image from "next/image";
import { getBook } from "@/services/api/books";
import { Box, Flex, Text } from "@mantine/core";
import preview from '@/assets/imgs/book-art.jpg'
import Nav from "@/components/secondary/nav/Nav";
import AppLayout from "@/layouts/common/AppLayout";
import MainLayout from "@/layouts/common/MainLayout";
import { Book } from "@/components/secondary/book/Book";
import MaxWidthLayout from "@/layouts/common/MaxWidthLayout";
import SEOMetaTags from "@/components/secondary/common/SEOMetaTags";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Book({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const title = data.book?.title ?? 'Bookie | Not found'

  return (
    <AppLayout>
      <SEOMetaTags title={title} />

      <Nav />

      <MainLayout>
        <MaxWidthLayout>
          <Flex className="py-20 space-x-10 lg:items-center flex flex-col lg:flex-row">
            <Box className="w-full overflow-hidden">
              <Image
                priority
                src={preview}
                alt='preview-photo'
                className="object-cover object-center transition duration-[200ms] delay-75 hover:brightness-50 hover:scale-125"
              />
            </Box>

            <Box className="w-full">
              <Text>
                Book Title
              </Text>

              <Text>
                Book Title
              </Text>
            </Box>
          </Flex>
        </MaxWidthLayout>
      </MainLayout>
    </AppLayout>
  );
}

interface ServerSideProps { data: { book: Book | null } }

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  const { id } = context.query;

  if (id) {
    try {
      const book = await getBook(id as string)

      return {
        props: {
          data: {
            book
          }
        }
      };
    } catch (error) {
      return {
        props: {
          data: {
            book: null,
          }
        }
      };
    }
  } else {
    return {
      props: {
        data: {
          book: null,
        }
      }
    };
  }
};
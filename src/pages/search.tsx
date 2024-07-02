import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Nav from "@/components/secondary/nav/Nav";
import AppLayout from "@/layouts/common/AppLayout";
import SEOMetaTags from "@/components/secondary/common/SEOMetaTags";
import MainLayout from "@/layouts/common/MainLayout";
import MaxWidthLayout from "@/layouts/common/MaxWidthLayout";
import { Box, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { truncateText } from "@/helpers/functions/truncateText";
import EmptyState from "@/components/secondary/common/EmptyState";
import { Book } from "@/components/secondary/book/Book";
import BookCard from "@/components/secondary/book/Book";
import { BASE_URL } from "@/config/env";

export default function SearchPage({ result }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { query } = useRouter()

  return (
    <AppLayout>
      <SEOMetaTags title="Bookie | Search Result" />

      <Nav />

      <MainLayout pt="pt-5">
        <MaxWidthLayout>
          <Text className="font-semibold text-3xl">
            {query.query ? (
              `You searched for: "${truncateText(query.query as string, 15)}"`
            ) : (
              'No query? Common 😩'
            )}
          </Text>

          <Box className="space-y-8 mt-8">
            {result.books.length > 0 ? (
              <Box>
                <Box className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 space-y-5 sm:space-y-0 sm:gap-5 lg:gap-8">
                  {result.books.map((book, index) => (
                    <BookCard
                      key={index}
                      data={book}
                    />
                  ))}
                </Box>
              </Box>
            ) : (
              <Box className="py-20">
                <EmptyState message="Looks like we're exploring uncharted territory! Keep searching, there's treasure ahead!" />
              </Box>
            )}
          </Box>
        </MaxWidthLayout>
      </MainLayout>
    </AppLayout>
  );
}

interface ServerSideProps { result: { books: Book[] } }

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  const { query } = context.query;

  if (query) {
    try {
      const res = await fetch(`${BASE_URL}/api/books?query=${query as string}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()

      return {
        props: {
          result: {
            books: data.books
          }
        }
      };
    } catch (error) {
      return {
        props: {
          result: {
            books: [],
          }
        }
      };
    }
  } else {
    return { 
      props: { 
        result: { 
          books: [], 
        } 
      } 
    };
  }
};
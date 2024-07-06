import React from "react";
import { Box, Text } from "@mantine/core";
import { useAppSelector } from "@/redux/hooks";
import { getAuthor } from "@/services/api/user";
import { Book } from "@/redux/types/book.types";
import { useQuery } from "@tanstack/react-query";
import BookCard from "@/components/secondary/book/Book";
import AccountLayout from "@/layouts/account/AccountLayout";
import EmptyState from "@/components/secondary/common/EmptyState";
import RetryButton from "@/components/secondary/common/RetryButton";
import SEOMetaTags from "@/components/secondary/common/SEOMetaTags";
import LoadingState from "@/components/secondary/common/LoadingState";

export default function ReadingList() {
  const user = useAppSelector((state) => state.user.value)

  const books = useQuery({
    queryKey: ['authors', user?.id],
    queryFn: () => getAuthor(user?.id as string),
  })

  return (
    <AccountLayout>
      <SEOMetaTags title="Account | Reading List" />

      <Box className='space-y-6'>
        <Text className='font-semibold dark:text-[#e0e0e0] text-lg text-[#090A04]'>
          My Reading Lists
        </Text>

        {books.isLoading && (
          <LoadingState />
        )}

        {books.isError && (
          <RetryButton
            failedTo="fetch books"
            retryFn={() => books.refetch()}
          />
        )}

        {books.data && (
          books.data.readingList.length > 0 ? (
            <Box className="sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 space-y-5 sm:space-y-0 sm:gap-5">
              {books.data.readingList.map((book: Book, index: number) => (
                <BookCard
                  key={index}
                  data={book}
                />
              ))}
            </Box>
          ) : (
            <EmptyState message="You do not have any reading list" />
          )
        )}
      </Box>
    </AccountLayout>
  )
}
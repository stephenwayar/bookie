import React, { useEffect, useState } from "react";
import Nav from "@/components/secondary/nav/Nav";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "@/services/api/books";
import { User } from "@/redux/types/user.types";
import { getAuthors } from "@/services/api/user";
import { setBooks } from "@/redux/slices/books";
import Input from "@/components/lib/custom/Input";
import AppLayout from "@/layouts/common/AppLayout";
import MainLayout from "@/layouts/common/MainLayout";
import { filterBooks } from "@/redux/selectors/books";
import { Icon } from "@iconify/react/dist/iconify.js";
import BookCard from "@/components/secondary/book/Book";
import MaxWidthLayout from "@/layouts/common/MaxWidthLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { Book, QueryType } from "@/redux/types/book.types";
import EmptyState from "@/components/secondary/common/EmptyState";
import SEOMetaTags from "@/components/secondary/common/SEOMetaTags";
import RetryButton from "@/components/secondary/common/RetryButton";
import LoadingState from "@/components/secondary/common/LoadingState";
import { Box, Flex, Pagination, Popover, Radio, Text, UnstyledButton } from "@mantine/core";

export default function Books() {
  const dispatch = useAppDispatch()
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [queryType, setQueryType] = useState<QueryType>('byName')
  const filteredBooks = useAppSelector((state) => filterBooks(state, { type: queryType, value: query }))

  const books = useQuery({
    queryKey: ['books', currentPage],
    queryFn: () => getBooks(currentPage.toString()),
  })

  const authors = useQuery({
    queryKey: ['authors'],
    queryFn: () => getAuthors(),
  })

  useEffect(() => {
    if (books.data) {
      dispatch(setBooks(books.data.books))
    }
  }, [books.data, books.isSuccess])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Create a set of unique author names from books.data if it exists
  const authorNamesFromBooks = books.data ? new Set(
    books.data.books.map((book: Book) => `${book.author.firstName} ${book.author.lastName}`)
  ) : new Set();

  // Filter authors.data based on authorNamesFromBooks if both exist
  const authorsOnPage = books.data && authors.data ? authors.data.filter((author: User) =>
    authorNamesFromBooks.has(`${author.firstName} ${author.lastName}`)
  ) : [];

  return (
    <AppLayout>
      <SEOMetaTags title="Bookie | Library" />

      <Nav />

      <MainLayout pt="pt-5">
        <MaxWidthLayout>
          <Flex className="items-center justify-between">
            <Text className="font-semibold dark:text-[#e0e0e0] text-3xl">
              Library
            </Text>

            {books.data && (
              <Flex className="items-center space-x-3">
                <Box className="w-full hidden sm:block">
                  <Input
                    type="text"
                    value={query}
                    placeholder="Filter books by name"
                    className='w-full border-[#D0D5DD] dark:bg-[#e0e0e0] focus:outline-none border-2 px-3 py-2 rounded-[10px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]'
                    onChange={({ target }) => {
                      setQueryType('byName')
                      setQuery(target.value)
                    }}
                  />
                </Box>

                <Popover
                  withArrow
                  width={200}
                  shadow="lg"
                  position="bottom"
                >
                  <Popover.Target>
                    <UnstyledButton>
                      <Flex className="rounded-[8px] h-[3rem] items-center dark:bg-[#e0e0e0] bg-gray-100 px-3 space-x-2">
                        <Box>
                          <Icon
                            width="20"
                            height="20"
                            color="#8c8c8c"
                            icon="mingcute:filter-line"
                          />
                        </Box>

                        <Box>
                          <Text className="text-[#8c8c8c] whitespace-nowrap font-semibold">
                            Sort by authors
                          </Text>
                        </Box>
                      </Flex>
                    </UnstyledButton>
                  </Popover.Target>

                  <Popover.Dropdown>
                    <Radio.Group
                      name="filter"
                      value={query}
                      onChange={(value: string) => {
                        setQueryType('byAuthor')
                        setQuery(value)
                      }}
                    >
                      <Box className="space-y-5 py-3">
                        {authors.isLoading && (
                          <Text className="text-sm font-semibold text-[#090A04]">
                            Fetching authors...
                          </Text>
                        )}

                        {authors.isError && (
                          <UnstyledButton onClick={() => authors.refetch()}>
                            <Text className="text-sm font-semibold text-red-600 hover:underline">
                              Failed. Click to retry
                            </Text>
                          </UnstyledButton>
                        )}

                        {authors.data && (
                          <Box className="space-y-6">
                            <Text className="text-sm font-semibold text-[#090A04]">
                              Authors on this page
                            </Text>

                            {authorsOnPage.map((author: User, index: number) => (
                              <Radio
                                key={index}
                                color="#090A04"
                                value={`${author.firstName} ${author.lastName}`}
                                label={`${author.firstName} ${author.lastName}`}
                              />
                            ))}

                            <UnstyledButton onClick={() => setQuery('')} className='w-full py-2 text-gray-500 rounded-[8px] text-center text-sm font-semibold px-3 bg-gray-100'>
                              Clear
                            </UnstyledButton>
                          </Box>
                        )}
                      </Box>
                    </Radio.Group>
                  </Popover.Dropdown>
                </Popover>
              </Flex>
            )}
          </Flex>

          <Box className="space-y-8 mt-8">
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
              filteredBooks.length > 0 ? (
                <Box className="flex flex-col" style={{ height: 'calc(100vh - 142px)' }}>
                  <Box className="flex-grow">
                    <Box className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 space-y-5 sm:space-y-0 sm:gap-5 lg:gap-8">
                      {filteredBooks.map((book: Book, index: number) => (
                        <BookCard
                          key={index}
                          data={book}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Flex className="justify-end px-3 py-20">
                    <Pagination
                      radius="md"
                      color="#090A04"
                      value={currentPage}
                      onChange={handlePageChange}
                      total={Math.ceil(books.data.total / 10)}
                    />
                  </Flex>
                </Box>
              ) : (
                <EmptyState message="There are no books here" />
              )
            )}
          </Box>
        </MaxWidthLayout>
      </MainLayout>
    </AppLayout>
  );
}
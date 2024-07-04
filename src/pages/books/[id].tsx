import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { BASE_URL } from "@/config/env";
import { useRouter } from "next/router";
import { setUser } from "@/redux/slices/user";
import { rateBook } from "@/services/api/books";
import preview from '@/assets/imgs/book-art.jpg'
import Nav from "@/components/secondary/nav/Nav";
import AppLayout from "@/layouts/common/AppLayout";
import MainLayout from "@/layouts/common/MainLayout";
import type { Book } from "@/redux/types/book.types";
import { mutateReadingList } from "@/services/api/user";
import MaxWidthLayout from "@/layouts/common/MaxWidthLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import BookReviews from "@/components/secondary/book/BookReviews";
import { Box, Checkbox, Flex, Rating, Text } from "@mantine/core";
import EmptyState from "@/components/secondary/common/EmptyState";
import SEOMetaTags from "@/components/secondary/common/SEOMetaTags";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { calculateAverageRating } from "@/helpers/functions/calculateAverageRating";

export default function Book({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [book, setBook] = useState(data.book)
  const title = data.book?.title ?? 'Book not found'
  const user = useAppSelector((state) => state.user.value)
  const averageRating = calculateAverageRating(book?.ratings || [])
  const [checked, setChecked] = useState<boolean>(() => {
    if (user?.readingList && router.query.id) {
      return user.readingList.some((bookId: string) => bookId.toString() === router.query.id);
    }

    return false;
  });
  const [rating, setRating] = useState(() => {
    if (user) {
      const userRating = book?.ratings?.find(r => r.user._id === user.id);

      return userRating ? userRating.rating : 0;
    }

    return 0;
  });  

  const handleRating = async (val: number) => {
    if (!user) {
      router.push(`/login?redirect=${router.asPath}`)

      return
    }

    // Store the current value of 'rating'
    const currentRatingState = rating;

    setRating(val)

    try {
      // Make the async request in the background
      const res = await rateBook({ rating: val }, data.book?._id as string);

      setBook(res) // update book
    } catch (error) {
      // If request fails, revert the 'rating' state back to its original value
      toast.error('There was an error submitting request')
      setRating(currentRatingState)
    }
  }

  const handleChecked = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      router.push(`/login?redirect=${router.asPath}`)

      return
    }

    // Store the current value of 'rating'
    const currentCheckState = checked;

    setChecked(event.currentTarget.checked)

    try {
      // Make the async request in the background
      const res = await mutateReadingList({ bookId: book!._id })

      const updateduser = { ...user, readingList: res.readingList }
      dispatch(setUser(updateduser))
    } catch (error) {
      // If request fails, revert the 'rating' state back to its original value
      toast.error('There was an error submitting request')
      setChecked(currentCheckState)
    }
  }

  return (
    <AppLayout>
      <SEOMetaTags title={title} />

      <Nav />

      <MainLayout>
        <MaxWidthLayout>
          {book?.title ? (
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

                <Box className="lg:grid lg:content-center">
                  <Box className="w-full space-y-4">
                    <Text className='font-semibold text-3xl text-[#cc903c]'>
                      Book Details
                    </Text>

                    <Flex className="items-start space-x-2">
                      <Text className='text-2xl font-semibold whitespace-nowrap text-[#090A04]'>
                        Title -
                      </Text>

                      <Text className='truncate text-2xl text-[#090A04]'>
                        {book.title}
                      </Text>
                    </Flex>

                    <Flex className="items-start space-x-2">
                      <Text className='whitespace-normal truncate text-2xl text-[#090A04]'>
                        {book.description}
                      </Text>
                    </Flex>

                    <Flex className="items-start space-x-2">
                      <Text className='text-2xl font-semibold whitespace-nowrap text-[#090A04]'>
                        Author -
                      </Text>

                      <Text className='truncate text-2xl text-[#090A04]'>
                        {book.author.firstName} {book.author.lastName}
                      </Text>
                    </Flex>

                    <Flex className="items-start space-x-2">
                      <Text className='text-2xl font-semibold whitespace-nowrap text-[#090A04]'>
                        Ratings -
                      </Text>

                      <Text className='truncate text-2xl text-[#090A04]'>
                        {averageRating} 
                      </Text>
                    </Flex>

                    <Box>
                      <Text className='text-2xl font-semibold whitespace-nowrap text-[#cc903c]'>
                        <Link className='underline' href={`/authors/${(book.author as any)._id}`}>
                          Preview author
                        </Link>
                      </Text>
                    </Box>

                    <Flex className="items-center !mt-12 space-x-2">
                      <Text className='text-2xl font-semibold whitespace-nowrap text-[#090A04]'>
                        Rate this book 
                      </Text>

                      <Box>
                        <Rating
                          size="xl"
                          value={rating}
                          color="#cc903c"
                          onChange={handleRating}
                        />
                      </Box>
                    </Flex>

                    <Flex className="items-center space-x-4">
                      <Text className='text-2xl font-semibold whitespace-nowrap text-[#090A04]'>
                        Add to reading list
                      </Text>

                      <Box>
                        <Checkbox
                          size='lg'
                          radius="md"
                          color="#cc903c"
                          checked={checked}
                          onChange={handleChecked}
                        />
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Box>

              <Box className="mt-10 mb-20 space-y-5">
                <Text className='font-semibold text-3xl text-[#cc903c]'>
                  Reviews
                </Text>

                <BookReviews />
              </Box>
            </Box>
          ) : (
            <Box className="py-20">
              <EmptyState message="Book not found" />
            </Box>
          )}
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
      const res = await fetch(`${BASE_URL}/api/books/${id as string}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const book = await res.json()

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
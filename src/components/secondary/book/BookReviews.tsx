import { Box, Flex, Text, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar from '@/assets/imgs/avatar.png'
import Link from "next/link";
import { addReview, getReviews } from "@/services/api/books";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import LoadingState from "../common/LoadingState";
import RetryButton from "../common/RetryButton";
import { useRouter } from "next/router";
import type { Review } from "@/redux/types/book.types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addNewReview, setBookReviews } from "@/redux/slices/bookReviews";
import TextArea from "@/components/lib/custom/TextArea";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function BookReviews() {
  const { query } = useRouter()
  const dispatch = useAppDispatch()
  const bookReviews = useAppSelector((state) => state.bookReviews.value)

  const reviews = useQuery({
    queryKey: ['reviews', query.id],
    queryFn: () => getReviews(query.id as string),
    enabled: !!query.id
  })

  useEffect(() => {
    if (reviews.data) {
      dispatch(setBookReviews(reviews.data))
    }
  }, [reviews.data, reviews.isSuccess])

  return (
    <Box>
      {reviews.isLoading && (
        <LoadingState />
      )}

      {reviews.isError && (
        <RetryButton
          failedTo="fetch reviews"
          retryFn={() => reviews.refetch()}
        />
      )}

      {reviews.data && (
        bookReviews.length > 0 ? (
          <Box className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Box>
              {bookReviews.map((review: Review, index: number) => (
                <Review
                  key={index}
                  data={review}
                />
              ))}
            </Box>

            <Box className="space-y-4">
              <Text className="text-[#090A04] text-xl">
                Add review
              </Text>

              <ReviewForm />
            </Box>
          </Box>
        ) : (
          <Box className="w-full lg:max-w-[50%]">
            <Text className="text-[#090A04] text-xl">
              There are no reviews yet. Be the first to review!
            </Text>

            <ReviewForm />
          </Box>
        )
      )}
    </Box>
  )
}

interface ReviewProps { data: Review }

const Review: React.FC<ReviewProps> = ({ data }) => {
  return (
    <Box className="space-y-3 py-4 border-b-2">
      <Flex className="items-center space-x-3">
        <Box>
          <Box className="h-12 w-12 rounded-full">
            <Image
              priority
              alt="image-preview"
              src={avatar}
              className="h-12 w-12 rounded-full"
            />
          </Box>
        </Box>

        <Box>
          <Link href={`/authors/${data.user._id}`}>
            <Text className="text-[#cc903c] hover:underline font-semibold">
              {data.user.firstName} {data.user.lastName}
            </Text>
          </Link>
        </Box>
      </Flex>

      <Box>
        <Text className="text-[#090A04]">
          {data.review}
        </Text>
      </Box>
    </Box>
  )
}

export const ReviewForm = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  const queryClient = new QueryClient()
  const { query, asPath, push } = useRouter()
  const user = useAppSelector((state) => state.user.value)

  const mutation = useMutation({
    mutationFn: () => addReview({ review: value }, query.id as string),
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as { message: string };

      toast.error(errorData.message || 'Failed to review book')
    },
    onSuccess: (data: Review) => {
      dispatch(addNewReview(data)) 
      setValue('')
      toast.success('Review added')
      queryClient.invalidateQueries({ queryKey: ['reviews', query.id] }) 
    },
  })

  const handleSubmit = () => {
    if(!user){
      push(`/login?redirect=${asPath}`)

      return
    }

    mutation.mutate()
  }

  return (
    <Box>
      <TextArea 
        value={value} 
        onChange={({ target }) => setValue(target.value)}
        className="w-full border-[#D0D5DD] focus:outline-[#090A04] border-[2px] px-3 py-3 rounded-[4px] text-[#525050] min-h-24 max-h-40 transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]" 
      />

      <Box className='mt-5'>
        <UnstyledButton
          type='button'
          onClick={handleSubmit}
          disabled={mutation.isPending || !value}
          className='w-full disabled:cursor-not-allowed disabled:opacity-50 h-[3.5rem] text-white text-center rounded-md font-semibold py-2 px-3 bg-[#090A04] transition duration-75 delay-75 ease-linear hover:shadow-md hover:bg-[#090a04e0]'
        >
          {mutation.isPending ?
            <Icon
              width="20"
              height="20"
              color="white"
              icon="icomoon-free:spinner2"
              className={`animate-spin mx-auto`}
            /> :
            'Add review'
          }
        </UnstyledButton>
      </Box>
    </Box>
  )
}
import React, { useEffect } from "react";
import AccountLayout from "@/layouts/account/AccountLayout";
import SEOMetaTags from "@/components/secondary/common/SEOMetaTags";
import { useForm } from "@mantine/form";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addBook } from "@/services/api/books";
import NewBookForm from "@/components/secondary/account/NewBookForm";
import { Box, Text } from "@mantine/core";
import LoadingState from "@/components/secondary/common/LoadingState";
import EmptyState from "@/components/secondary/common/EmptyState";
import RetryButton from "@/components/secondary/common/RetryButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addNewBook, setUserBooks } from "@/redux/slices/userBooksSlice";
import { UserBook } from "@/redux/types/book.types";
import BookCard from "@/components/secondary/book/Book";
import { getMyBooks } from "@/services/api/user";

export interface InitialValuesType {
  title: string,
  description: string,
}

export default function AddBook() {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const user = useAppSelector((state) => state.user.value)

  const initialValues: InitialValuesType = {
    title: '',
    description: '',
  }

  const form = useForm({
    initialValues,

    validate: {
      title: (value) => (
        !value ? 'Book title is required' : null
      ),
      description: (value) => (
        !value ? 'Book description is required' : null
      ),
    },
  });

  const mutation = useMutation({
    mutationFn: () => addBook(form.values),
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as { message: string };

      toast.error(errorData.message || 'Failed to add new book')
    },
    onSuccess: (data: UserBook) => {
      dispatch(addNewBook(data)) // add book to userBooks slice
      queryClient.invalidateQueries({ queryKey: ['my-books', user?.id] }) // invalidate to fetch new data

      form.reset()
      toast.success('Book added')
    },
  })

  return (
    <AccountLayout>
      <SEOMetaTags title="Account | Add Book" />

      <Box className="space-y-14">
        <NewBookForm
          form={form}
          mutation={mutation}
        />

        <MyBooks />
      </Box>
    </AccountLayout>
  )
}

const MyBooks = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.value)
  const userBooks = useAppSelector((state) => state.userBooks.value)

  const books = useQuery({
    queryKey: ['my-books', user?.id],
    queryFn: () => getMyBooks(),
  })

  useEffect(() => {
    if (books.data) {
      dispatch(setUserBooks(books.data))
    }
  }, [books.data, books.isSuccess])

  return (
    <Box className='space-y-6'>
      <Text className='font-semibold text-lg text-[#090A04]'>
        My Books
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
        userBooks.length > 0 ? (
          <Box className="sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 space-y-5 sm:space-y-0 sm:gap-5">
            {userBooks.map((book: UserBook, index: number) => (
              <BookCard 
                key={index} 
                data={book} 
              />
            ))}
          </Box>
        ) : (
          <EmptyState message="You do not have any books added" />
        )
      )}
    </Box>
  )
}
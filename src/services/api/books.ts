import { httpNoAuth } from "@/config/axios";

export const getBooks = async (query?: string) => {
  const url = `/api/books?query=${query}`
  const res = await httpNoAuth.get(url);

  return res.data;
};

export const getBook = async (id: string) => {
  const url = `/api/books/${id}`
  const res = await httpNoAuth.get(url);

  return res.data;
};
import { http, httpNoAuth } from "@/config/axios";

export const getBooks = async (pageNumber: string) => {
  const url = `/api/books?pageSize=10&&pageNumber=${pageNumber}`
  const res = await httpNoAuth.get(url);

  return res.data;
};

export const getBook = async (id: string) => {
  const url = `/api/books/${id}`
  const res = await httpNoAuth.get(url);

  return res.data;
};

export const addBook = async (payload: { 
  title: string, 
  description: string 
}) => {
  const url = '/api/books'
  const res = await http.post(url, payload);

  return res.data;
};

export const rateBook = async (payload: { rating: number }, id: string) => {
  const url = `/api/books/${id}/ratings`
  const res = await http.post(url, payload);

  return res.data;
};

export const addReview = async (payload: { review: string }, id: string) => {
  const url = `/api/books/${id}/reviews`
  const res = await http.post(url, payload);

  return res.data;
};

export const getReviews = async (id: string) => {
  const url = `/api/books/${id}/reviews`
  const res = await httpNoAuth.get(url);

  return res.data;
};
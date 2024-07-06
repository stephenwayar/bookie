import { User } from "./user.types";

export interface Rating {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    books: string[];
    readingList: string[];
  };
  book: string;
  rating: number;
  __v: number;
}

export interface Review {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    books: string[];
    readingList: string[];
  };
  book: string;
  review: string;
  __v: number;
}

export interface Book {
  author: User
  _id: string;
  title: string;
  ratings: Rating[]
  reviews: Review[]
  description: string
}

export type QueryType = 'byName' | 'byAuthor';

export type BookReviewsState = { value: Review[] }

export type BookState = { value: Book[] }
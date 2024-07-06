import type { Book } from "./book.types";

export type User = {
  id: string;
  books: Book[]
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  access_token: string;
  readingList: string[]
}

export type UserState = { value: User | null }

export enum UserKey {
  BOOKIE_USER = 'bookie-user',
  BOOKIE_PREFERENCE = 'bookie-preference',
}
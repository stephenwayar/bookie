import { User } from "./user.type";

export type UserBook = {
  _id: string;
  title: string;
  description: string
  author: User
}

export type UserBookState = {
  value: UserBook[]
}
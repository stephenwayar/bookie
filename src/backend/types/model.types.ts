import mongoose from "mongoose";
import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  books: mongoose.Schema.Types.ObjectId[]
  readingList: mongoose.Schema.Types.ObjectId[]
}

export interface Book extends Document {
  title: string;
  description: string;
  author: mongoose.Schema.Types.ObjectId;
  ratings: mongoose.Schema.Types.ObjectId[];
  reviews: mongoose.Schema.Types.ObjectId[]
}

export interface Rating extends Document {
  book: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  rating: number
}

export interface Review extends Document {
  book: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  review: string
}
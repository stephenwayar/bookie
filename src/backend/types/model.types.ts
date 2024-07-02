import mongoose from "mongoose";
import { Document } from 'mongoose';

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  books: mongoose.Schema.Types.ObjectId[]
}

export interface IBook extends Document {
  title: string;
  author: mongoose.Schema.Types.ObjectId;
  description: string
}
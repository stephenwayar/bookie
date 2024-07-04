import mongoose, { Schema, Model } from 'mongoose';
import type { Book } from '../types/model.types';

const BookSchema: Schema<Book> = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
    required: true,
  },
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
});

const Book: Model<Book> = mongoose.models.Book || mongoose.model<Book>('Book', BookSchema);

export default Book;
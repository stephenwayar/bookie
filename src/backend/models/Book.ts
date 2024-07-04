import mongoose, { Schema, Model } from 'mongoose';
import type { Book as BookType } from '../types/model.types';

const BookSchema: Schema<BookType> = new Schema({
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

const Book: Model<BookType> = mongoose.models.Book || mongoose.model<BookType>('Book', BookSchema);

export default Book;

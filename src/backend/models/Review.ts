import mongoose, { Schema, Model } from 'mongoose';
import type { Review } from '../types/model.types';

const ReviewSchema: Schema<Review> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  },
  review: {
    type: String,
  },
});

const Review: Model<Review> = mongoose.models.Review || mongoose.model<Review>('Review', ReviewSchema);

export default Review;
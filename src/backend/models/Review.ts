import mongoose, { Schema, Model } from 'mongoose';
import type { Review as ReviewType } from '../types/model.types';

const ReviewSchema: Schema<ReviewType> = new Schema({
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

const Review: Model<ReviewType> = mongoose.models.Review || mongoose.model<ReviewType>('Review', ReviewSchema);

export default Review;
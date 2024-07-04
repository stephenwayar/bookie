import mongoose, { Schema, Model } from 'mongoose';
import type { Rating } from '../types/model.types';

const RatingSchema: Schema<Rating> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  },
  rating: {
    type: Number,
  },
});

const Rating: Model<Rating> = mongoose.models.Rating || mongoose.model<Rating>('Rating', RatingSchema);

export default Rating;
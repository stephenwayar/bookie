import mongoose, { Schema, Model } from 'mongoose';
import type { Rating as RatingType } from '../types/model.types';

const RatingSchema: Schema<RatingType> = new Schema({
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

const Rating: Model<RatingType> = mongoose.models.Rating || mongoose.model<RatingType>('Rating', RatingSchema);

export default Rating;
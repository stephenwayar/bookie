import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { BookReviewsState, Review } from '../types/book.types';

const initialState: BookReviewsState = { value: [] };

export const bookReviews = createSlice({
  name: 'bookReviews',
  initialState,
  reducers: {
    setBookReviews: (state: BookReviewsState, action: PayloadAction<Review[]>) => {
      state.value = action.payload
    },
    addNewReview: (state: BookReviewsState, action: PayloadAction<Review>) => {
      state.value.push(action.payload)
    },
  },
})

export const { setBookReviews, addNewReview } = bookReviews.actions

export default bookReviews.reducer
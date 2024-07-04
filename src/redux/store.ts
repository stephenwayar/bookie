import userReducer from './slices/user';
import booksReducer from './slices/books';
import userBooksReducer from './slices/userBooks';
import bookReviewsReducer from './slices/bookReviews';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  user: userReducer,
  books: booksReducer,
  userBooks: userBooksReducer,
  bookReviews: bookReviewsReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store
import userReducer from './slices/user';
import booksReducer from './slices/books';
import userBooksReducer from './slices/userBooks';
import preferenceReducer from './slices/preference';
import { preferenceMiddleware } from './middlewares';
import bookReviewsReducer from './slices/bookReviews';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  user: userReducer,
  books: booksReducer,
  userBooks: userBooksReducer,
  preference: preferenceReducer,
  bookReviews: bookReviewsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(preferenceMiddleware),
});

export default store
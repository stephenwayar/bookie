import userReducer from './slices/userSlice';
import booksReducer from './slices/bookSlice';
import userBooksReducer from './slices/userBooksSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  user: userReducer,
  books: booksReducer,
  userBooks: userBooksReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store
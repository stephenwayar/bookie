import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserBook, UserBookState } from '../types/book.types';

const initialState: UserBookState = { value: [] };

export const booksSlice = createSlice({
  name: 'booksSlice',
  initialState,
  reducers: {
    setBooks: (state: UserBookState, action: PayloadAction<UserBook[]>) => {
      state.value = action.payload
    },
  },
})

export const { setBooks } = booksSlice.actions

export default booksSlice.reducer
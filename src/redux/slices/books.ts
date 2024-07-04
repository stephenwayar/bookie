import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Book, BookState } from '../types/book.types';

const initialState: BookState = { value: [] };

export const booksSlice = createSlice({
  name: 'booksSlice',
  initialState,
  reducers: {
    setBooks: (state: BookState, action: PayloadAction<Book[]>) => {
      state.value = action.payload
    },
  },
})

export const { setBooks } = booksSlice.actions

export default booksSlice.reducer
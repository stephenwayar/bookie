import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Book, BookState } from '../types/book.types';

const initialState = { value: [] };

export const userBooksSlice = createSlice({
  name: 'userBooksSlice',
  initialState,
  reducers: {
    setUserBooks: (state: BookState, action: PayloadAction<Book[]>) => {
      state.value = action.payload
    },
    addNewBook: (state: BookState, action: PayloadAction<Book>) => {
      state.value.push(action.payload)
    },
  },
})

export const { addNewBook, setUserBooks } = userBooksSlice.actions

export default userBooksSlice.reducer
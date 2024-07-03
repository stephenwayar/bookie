import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserBook, UserBookState } from '../types/book.types';

const initialState = { value: [] };

export const userBooksSlice = createSlice({
  name: 'userBooksSlice',
  initialState,
  reducers: {
    setUserBooks: (state: UserBookState, action: PayloadAction<UserBook[]>) => {
      state.value = action.payload
    },
    addNewBook: (state: UserBookState, action: PayloadAction<UserBook>) => {
      state.value.push(action.payload)
    },
  },
})

export const { addNewBook, setUserBooks } = userBooksSlice.actions

export default userBooksSlice.reducer
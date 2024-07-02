import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState, User, UserKey } from '../types/user.type'
import { setCookieItem } from '@/helpers/functions/cookie';

const initialState: UserState = { value: null };

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User | null>) => {
      state.value = action.payload

      if (typeof document !== 'undefined' && action.payload) { 
        setCookieItem(UserKey.BOOKIED_USER, action.payload);
      }
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
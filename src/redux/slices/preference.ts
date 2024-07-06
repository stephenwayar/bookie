import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { Preference, PreferenceState } from '../types/preference.types';

const initialState: PreferenceState = {
  value: {
    darkMode: false
  }
};

export const preferenceSlice = createSlice({
  name: 'preferenceSlice',
  initialState,
  reducers: {
    setDarkMode: (state: PreferenceState, action: PayloadAction<boolean>) => {
      state.value.darkMode = action.payload;
    },
    loadPreferences: (state: PreferenceState, action: PayloadAction<Preference>) => {
      state.value = action.payload;
    }
  },
});

export const { setDarkMode, loadPreferences } = preferenceSlice.actions;

export default preferenceSlice.reducer;

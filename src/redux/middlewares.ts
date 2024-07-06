import { UserKey } from './types/user.types';
import { setDarkMode } from './slices/preference';
import { Preference } from './types/preference.types';
import { Middleware, PayloadAction } from '@reduxjs/toolkit';

export const preferenceMiddleware: Middleware = (store) => (next) => (action) => {
  // Cast the action to PayloadAction<boolean> for type safety
  if (setDarkMode.match(action as PayloadAction<boolean>)) {
    const darkMode = (action as PayloadAction<boolean>).payload;

    // Toggle the 'dark' class on the document body
    document.body.classList.toggle('dark', darkMode);
    document.body.style.backgroundColor = darkMode ? '#171717' : '#ffffff';

    // Retrieve preferences from localStorage
    const preferenceString = localStorage.getItem(UserKey.BOOKIE_PREFERENCE);
    const preference: Preference = preferenceString ? JSON.parse(preferenceString) : {};

    // Update the darkMode preference
    preference.darkMode = darkMode;
    localStorage.setItem(UserKey.BOOKIE_PREFERENCE, JSON.stringify(preference));
  }

  return next(action);
};

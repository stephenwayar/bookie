import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import '@fontsource-variable/inter';
import "@/styles/css/globals.css";
import React from 'react';
import store from "@/redux/store";
import { Provider } from "react-redux";
import { useEffect, useRef } from "react";
import { theme } from '@/styles/ts/theme';
import { setUser } from "@/redux/slices/user";
import { MantineProvider } from '@mantine/core';
import { loadPreferences } from '@/redux/slices/preference';
import { Preference } from '@/redux/types/preference.types';
import { decryptData } from "@/helpers/functions/encryption";
import { UserKey, type User } from "@/redux/types/user.types";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import ErrorBoundary from '@/components/secondary/common/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getCookieItem, parseCookies } from "@/helpers/functions/cookie";
import { RouterTransition } from '@/components/secondary/nav/RouterTransition';

const queryClient = new QueryClient()

interface AppOwnProps { user: User | null }
interface MyAppProps extends AppProps, AppOwnProps { }

const App = ({ Component, pageProps, user }: MyAppProps) => {
  const initialized = useRef(false)

  if (!initialized.current) {
    // Runs once when the app is mounted on the browser
    store.dispatch(setUser(user));
    initialized.current = true;
  }

  useEffect(() => {
    // Set user preference once app mounts
    const preferenceString = localStorage.getItem(UserKey.BOOKIE_PREFERENCE);

    if (preferenceString) {
      const preference: Preference = JSON.parse(preferenceString);
      const { darkMode } = preference;

      store.dispatch(loadPreferences(preference));

      // Toggle 'dark' class on the body
      document.body.classList.toggle('dark', darkMode);

      // Set background color based on dark mode
      document.body.style.backgroundColor = darkMode ? '#171717' : '#ffffff';
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <ErrorBoundary>
            <RouterTransition />
            <Component {...pageProps} />
          </ErrorBoundary>
        </MantineProvider>
      </Provider>
    </QueryClientProvider>
  );
}

App.getInitialProps = async (appContext: AppContext): Promise<AppOwnProps & AppInitialProps> => {
  const { ctx, Component } = appContext;  // Destructure context and component from appContext

  let pageProps = {};

  // If the component has getInitialProps, call it and merge its result with pageProps
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  let user: User | null = null;

  // Check if the request is from the server side
  if (ctx.req) {
    const cookies = parseCookies(ctx.req);  // Parse cookies from the request
    const cookieUser = cookies[UserKey.BOOKIE_USER];  // Get the specific user cookie

    // If the user cookie exists, decrypt it to get the user data
    if (cookieUser) {
      user = decryptData(cookieUser);
    }
  } else {
    // Request running on client side
    user = getCookieItem(UserKey.BOOKIE_USER)
  }

  // Return the collected pageProps and user data
  return { pageProps, user };
};

export default App;
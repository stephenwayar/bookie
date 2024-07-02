import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import '@fontsource-variable/inter';
import "@/styles/css/globals.css";
import { useRef } from "react";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { theme } from '@/styles/ts/theme';
import { MantineProvider } from '@mantine/core';
import { setUser } from "@/redux/slices/userSlice";
import { User, UserKey } from "@/redux/types/user.type";
import { decryptData } from "@/helpers/functions/encryption";
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
    store.dispatch(setUser(user));
    initialized.current = true;
  }

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
    const cookieUser = cookies[UserKey.BOOKIED_USER];  // Get the specific user cookie

    // If the user cookie exists, decrypt it to get the user data
    if (cookieUser) {
      user = decryptData(cookieUser);
    }
  } else {
    // Request running on client side
    user = getCookieItem(UserKey.BOOKIED_USER)
  }

  // Return the collected pageProps and user data
  return { pageProps, user };
};

export default App;
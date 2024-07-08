import { Provider } from 'react-redux';
import store from '@/redux/store';
import { render } from '@testing-library/react';
import { theme } from '@/styles/ts/theme';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterTransition } from '@/components/secondary/nav/RouterTransition';
import ErrorBoundary from '@/components/secondary/common/ErrorBoundary';

const queryClient = new QueryClient();

const MockProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient} >
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <ErrorBoundary>
          <RouterTransition />
          {children}
        </ErrorBoundary>
      </MantineProvider>
    </Provider>
  </QueryClientProvider>
);

// Override the render method to include all providers
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: MockProviders, ...options });

// Export everything from @testing-library/react
export * from '@testing-library/react';

// Override render method
export { customRender as render };
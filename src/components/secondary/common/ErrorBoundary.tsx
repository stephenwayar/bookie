import React, { ReactNode } from 'react';
import Nav from '../nav/Nav';
import Image from 'next/image';
import SEOMetaTags from './SEOMetaTags';
import AppLayout from '@/layouts/common/AppLayout';
import serverDown from '@/assets/svgs/server-down.svg'
import { Box, Center, Text, UnstyledButton } from '@mantine/core';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      return (
        <AppLayout>
          <SEOMetaTags title="Server down" />

          <Nav />

          <Center className="mt-20">
            <Box className="space-y-5 max-w-[500px]">
              <Box className="w-[250px] mx-auto">
                <Image
                  priority
                  alt='no-data'
                  src={serverDown}
                  className="w-[350px] mx-auto"
                />
              </Box>

              <Text className="text-[#090A04] text-center text-4xl font-semibold">
                Oops!
              </Text>

              <Text className="text-[#667085] text-center text-lg">
                There was a client side error somewhere
              </Text>

              <Box className="text-center">
                <UnstyledButton onClick={() => this.setState({ hasError: false })} className="bg-[#cc903c] hover:bg-[#cc903cdf] text-white h-[45px] rounded-lg text-center w-36">
                  Try again
                </UnstyledButton>
              </Box>
            </Box>
          </Center>
        </AppLayout>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
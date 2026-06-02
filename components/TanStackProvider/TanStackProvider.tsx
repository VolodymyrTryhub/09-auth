'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
};

const TanStackProvider = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TanStackProvider;

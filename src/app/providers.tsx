'use client';

import { MantineProvider } from '@mantine/core';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark', // or 'light' if you want
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {children}
    </MantineProvider>
  );
}

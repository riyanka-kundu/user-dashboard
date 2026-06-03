"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/provider/theme-provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, gcTime: 24 * 60 * 60 * 1000 },
  },
});

const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme={false}
        >
          {children}
          <Toaster
            duration={3000}
            position="top-right"
            richColors
            visibleToasts={5}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default RootProvider;

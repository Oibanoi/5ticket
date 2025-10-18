import { QueryClient } from "@tanstack/react-query";
import logger from "../logger";

interface ErrorWithResponse {
  response?: {
    status: number;
  };
}

const queryClientConfig = {
  defaultOptions: {
    queries: {
      // Caching & Refetching
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,

      // Retry
      retry: (failureCount: number, error: unknown) => {
        // Don't retry on 4xx errors
        const err = error as ErrorWithResponse;
        if (err?.response?.status && err.response.status >= 400 && err.response.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Retry mutations only once
      retry: 1,
      onError: (error: unknown) => {
        logger.error("Mutation error:", error);
      },
    },
  },
};

export const getQueryClient = (() => {
  let client: QueryClient | null = null;
  return () => (client ??= new QueryClient(queryClientConfig));
})();

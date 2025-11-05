import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { env } from "@/lib/env/index.mjs";
import { handleApiError } from "./error-handler";
import logger from "../logger";

/**
 * Axios instance for CLIENT-SIDE requests
 * Use in Client Components, hooks, and browser contexts
 *
 * Features:
 * - Automatic session token injection
 * - Session caching for performance (1 minute)
 * - Auto sign-out on 401 errors
 */
const clientAxios = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Session cache to avoid repeated getSession() calls
interface SessionCache {
  token: string;
  timestamp: number;
}

let cachedSession: SessionCache | null = null;
const SESSION_CACHE_TIME = 60000; // 1 minute

/**
 * Clear session cache manually
 * Call this after login/logout to force refresh
 */
export const clearSessionCache = () => {
  cachedSession = null;
};

// Request interceptor - inject auth token
clientAxios.interceptors.request.use(
  async (config) => {
    // @ts-expect-error: Add metadata property for request timing
    config.metadata = { startTime: new Date() };

    const now = Date.now();
    if (!cachedSession || now - cachedSession.timestamp > SESSION_CACHE_TIME) {
      const session = await getSession();
      if (session?.access_token) {
        cachedSession = {
          token: session.access_token,
          timestamp: now,
        };
      } else {
        cachedSession = null;
      }
    }

    if (cachedSession?.token) {
      config.headers.Authorization = `Bearer ${cachedSession.token}`;
    }

    logger.debug(`[Client] API Request: ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
    });

    return config;
  },
  (error) => {
    logger.error("[Client] API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
clientAxios.interceptors.response.use(
  (response) => {
    type ConfigWithMetadata = typeof response.config & { metadata?: { startTime: Date } };
    const duration =
      new Date().getTime() -
      ((response.config as ConfigWithMetadata).metadata?.startTime?.getTime() || 0);

    logger.debug(
      `[Client] API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
      {
        status: response.status,
        duration: `${duration}ms`,
      }
    );

    return response;
  },
  async (error) => {
    const status = error.response?.status;
    const config = error.config;

    logger.error(`[Client] API Error: ${config?.method?.toUpperCase()} ${config?.url}`, {
      status,
      message: error.response?.data?.message || error.message,
    });

    // Auto sign-out on 401 Unauthorized
    if (status === 401) {
      // Clear cache
      clearSessionCache();

      // Sign out without redirect (let the app handle it)
      await signOut({ redirect: false });
    }

    handleApiError(error);
    return Promise.reject(error);
  }
);

// Default export for backward compatibility
export default clientAxios;

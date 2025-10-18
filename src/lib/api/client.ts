import axios from "axios";
import { signOut } from "next-auth/react";
// import { sonner } from "@/components/global/sonner";
import { env } from "@/lib/env/index.mjs";
import { handleApiError } from "./error-handler";
import logger from "../logger";

const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["X-Request-ID"] = crypto.randomUUID();
    // @ts-expect-error: Add metadata property for request timing
    config.metadata = { startTime: new Date() };
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    logger.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
      requestId: config.headers["X-Request-ID"],
      params: config.params,
    });
    return config;
  },
  (error) => {
    logger.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    type ConfigWithMetadata = typeof response.config & { metadata?: { startTime: Date } };
    const duration =
      new Date().getTime() -
      ((response.config as ConfigWithMetadata).metadata?.startTime?.getTime() || 0);

    logger.debug(`API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      duration: `${duration}ms`,
      requestId: response.config.headers["X-Request-ID"],
    });

    return response;
  },
  async (error) => {
    const status = error.response?.status;
    const config = error.config;

    logger.error(`API Error: ${config?.method?.toUpperCase()} ${config?.url}`, {
      status,
      requestId: config?.headers["X-Request-ID"],
      message: error.response?.data?.message || error.message,
    });

    if (status === 401) {
      if (!axiosInstance.defaults.headers.common["X-Signing-Out"]) {
        axiosInstance.defaults.headers.common["X-Signing-Out"] = true;
      }
      //   sonner("Phiên đăng nhập đã hết hạn. Đang đăng xuất...");
      await signOut();
    }
    handleApiError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;

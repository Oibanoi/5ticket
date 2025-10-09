/**
 * NEXT.JS CONFIGURATION
 *
 * Purpose: Configure Next.js framework settings and build behavior
 * This file controls how Next.js handles routing, bundling, optimization, and deployment
 *
 * Common configurations:
 * - Custom webpack config
 * - Environment variables
 * - Image optimization settings
 * - Redirects and rewrites
 * - Output configuration for deployment
 *
 * To modify:
 * - Add properties to nextConfig object
 * - See: https://nextjs.org/docs/app/api-reference/next-config-js
 */

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* Add your custom Next.js configuration options here */

  // Example configurations (uncomment as needed):

  // Enable experimental features
  // experimental: {
  //   turbo: true,
  // },

  // Configure image domains
  images: {
    domains: ["via.placeholder.com", "rjp-v2-prod.s3.ap-southeast-1.amazonaws.com"],
  },

  // Environment variables
  // env: {
  //   CUSTOM_KEY: process.env.CUSTOM_KEY,
  // },

  // Output configuration for static export
  // output: 'export',

  // Custom webpack configuration
  // webpack: (config) => {
  //   return config;
  // },
};

export default withNextIntl(nextConfig);

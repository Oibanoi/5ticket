/**
 * ESLINT CONFIGURATION
 * 
 * Purpose: Configure ESLint to check code quality and enforce coding standards
 * ESLint helps detect syntax errors, logical issues, and enforces coding conventions
 * 
 * Current configuration:
 * - Uses Next.js recommended rules (core-web-vitals + typescript)
 * - Ignores build directories and generated files
 * 
 * To modify:
 * - Add custom rules to objects in eslintConfig array
 * - Add/remove file patterns in ignores array
 * - Install additional ESLint plugins and extend them
 */

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat helps use legacy config format with ESLint v9+
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Use recommended rules from Next.js
  // - core-web-vitals: Rules for performance and UX
  // - typescript: Rules specific to TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  {
    // Ignore files/folders that don't need ESLint checking
    ignores: [
      "node_modules/**",     // Dependencies
      ".next/**",           // Next.js build output
      "out/**",            // Static export output
      "build/**",          // Build artifacts
      "next-env.d.ts",     // Next.js TypeScript declarations
    ],
  },
];

export default eslintConfig;

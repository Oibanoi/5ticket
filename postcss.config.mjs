/**
 * POSTCSS CONFIGURATION
 * 
 * Purpose: Configure PostCSS plugins for CSS processing
 * PostCSS transforms CSS with JavaScript plugins
 * 
 * Current setup:
 * - @tailwindcss/postcss: Processes Tailwind CSS directives and utilities
 * 
 * To modify:
 * - Add more PostCSS plugins to the plugins array
 * - Common plugins: autoprefixer, cssnano, postcss-preset-env
 * 
 * Example:
 * plugins: [
 *   "@tailwindcss/postcss",
 *   "autoprefixer",
 *   "cssnano"
 * ]
 */

const config = {
  plugins: [
    "@tailwindcss/postcss", // Process Tailwind CSS directives
  ],
};

export default config;

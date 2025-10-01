import localFont from "next/font/local";

const redditSans = localFont({
  src: [
    {
      path: "./reddit-sans/RedditSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./reddit-sans/RedditSans-Bold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "./reddit-sans/RedditSans-SemiBold.woff2",
      weight: "600",
      style: "semibold",
    },
  ],
  variable: "--font-reddit-sans",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["inter"],
});

export { redditSans };

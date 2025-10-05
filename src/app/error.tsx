"use client";
import "@/styles/globals.css";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-light">
      <Image src="/error-illustration.svg" alt="Error" width={200} height={200} />
      <h1 className="text-2xl font-bold text-gray-800 mt-4">Something went wrong</h1>
      <p className="text-gray-500 mt-2 mb-6 text-center max-w-md">
        We encountered a problem while loading this page. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Retry
      </button>
    </div>
  );
}

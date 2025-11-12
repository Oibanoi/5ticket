"use client";
import "@/styles/globals.css";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Error({ reset }: { reset: () => void }) {
  const t = useTranslations("ErrorPage");

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Simple cat emoji as mascot */}
      <div className="text-6xl mb-6 animate-bounce">🎫🐱</div>

      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
        <p className="text-gray-400">{t("description")}</p>

        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {t("try_again")}
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            {t("go_home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

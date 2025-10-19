"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

interface BackButtonProps {
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const t = useTranslations("Common");

  return (
    <button
      onClick={onClick}
      className="items-stretch flex w-full flex-col text-base text-white font-bold justify-center bg-[#1E2126] px-4 py-2 rounded-[20px] max-md:max-w-full hover:bg-[#2a2f35] transition-colors"
      aria-label={t("back")}
    >
      <div className="flex w-full gap-2 flex-wrap max-md:max-w-full items-center">
        <ChevronLeft className="w-6 h-6 shrink-0" />
        <div className="text-white text-ellipsis">{t("back")}</div>
      </div>
    </button>
  );
};

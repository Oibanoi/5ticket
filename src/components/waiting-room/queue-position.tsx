"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface QueuePositionProps {
  position: number;
  estimatedTime: string;
}

export const QueuePosition: React.FC<QueuePositionProps> = ({ position, estimatedTime }) => {
  const t = useTranslations("WaitingRoom");

  return (
    <section
      className="text-white leading-6 w-full max-w-[337px] mt-2 px-4"
      role="status"
      aria-live="polite"
    >
      <p className="text-center text-base">
        {t("your_position")}: <span className="font-bold text-[#F30C60]">#{position}</span>
        <br />
        {t("estimated_time")}: <span className="font-bold text-[#F30C60]">{estimatedTime}</span>
      </p>
    </section>
  );
};

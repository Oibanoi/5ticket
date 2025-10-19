"use client";

import React from "react";
import { useTranslations } from "next-intl";

export const QueueInstructions: React.FC = () => {
  const t = useTranslations("WaitingRoom");

  return (
    <section className="text-white self-stretch w-full mt-4 px-4 max-md:max-w-full">
      <p className="text-center text-sm md:text-base opacity-90">{t("instructions")}</p>
    </section>
  );
};

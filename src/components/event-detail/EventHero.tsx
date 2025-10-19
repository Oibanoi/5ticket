"use client";

import React from "react";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface EventHeroProps {
  title: string;
  image: string;
  date: string;
  location: string;
  minPrice: number;
  onBookClick: () => void;
}

export const EventHero: React.FC<EventHeroProps> = ({
  title,
  image,
  date,
  location,
  minPrice,
  onBookClick,
}) => {
  const t = useTranslations("EventDetail");
  const tCommon = useTranslations("Common");

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2.6fr_1.4fr] gap-4 sm:gap-8 mb-8 sm:mb-12">
      {/* Left - Event Image */}
      <div className="relative rounded-3xl overflow-hidden aspect-[16/9]">
        <Image src={image} alt={title} fill className="object-cover" priority />
      </div>

      {/* Right - Event Info */}
      <div className="flex flex-col justify-between p-6 bg-dark rounded-3xl">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">{title}</h1>

          <div className="text-sm sm:text-base flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0 text-zinc-400" />
              <span className="text-light-active text-sm">{date}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-zinc-400" />
              <span className="text-light-active text-sm">{location}</span>
            </div>
          </div>
        </div>
        <div className="pt-6 lg:block">
          <div className="text-red-normal text-3xl lg:text-4xl font-bold mb-4">
            {tCommon("from")} {formatPrice(minPrice)}
          </div>
          <Button
            variant="secondary"
            size="lg"
            onClick={onBookClick}
            className="w-full h-[48px] px-[84px] leading-[150%] rounded-4xl font-bold !text-base lg:text-lg transition text-light-white-hover"
          >
            {t("select_schedule")}
          </Button>
        </div>
      </div>
    </div>
  );
};

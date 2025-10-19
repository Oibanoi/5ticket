"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface EventDescriptionProps {
  description: string;
  gallery?: string[];
}

export const EventDescription: React.FC<EventDescriptionProps> = ({ description, gallery }) => {
  const t = useTranslations("EventDetail");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-3 sm:space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold">{t("introduction")}</h2>
      <div className="relative">
        <p
          className={`text-sm sm:text-base text-zinc-400 leading-relaxed transition-all duration-300 ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {description}
        </p>

        {/* Gradient overlay when collapsed */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Gallery - Only show when expanded */}
      {isExpanded && gallery && gallery.length > 0 && (
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] animate-in fade-in slide-in-from-top-4 duration-300">
          <Image src={gallery[0]} alt="Event Gallery" fill className="object-cover" />
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-3 rounded-lg text-sm sm:text-base text-zinc-400 transition-all flex items-center justify-center gap-2 group"
      >
        {isExpanded ? t("collapse") : t("view_more")}
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
        ) : (
          <ChevronDown className="w-4 h-4 group-hover:translate-y-[2px] transition-transform" />
        )}
      </button>
    </div>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { BackButton } from "@/components/common/BackButton";
import { TicketOptionsList } from "./TicketOptionsList";
import { TicketOption } from "./TicketOptionCard";

// Countdown Timer Component
interface CountdownTimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  onComplete?: () => void;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialMinutes = 10,
  initialSeconds = 0,
  onComplete,
  className = "",
}) => {
  const t = useTranslations("TicketSelection");
  const [timeLeft, setTimeLeft] = useState({
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes === 0 && prev.seconds === 0) {
          if (onComplete) onComplete();
          return prev;
        }

        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section
      className={`w-full flex flex-col text-[#090A0C] font-normal text-center bg-[#FE0] px-4 py-2 rounded-[20px] ${className}`}
    >
      <div className="text-[#090A0C] text-ellipsis text-base">{t("complete_booking")}</div>
      <div
        className="text-[#090A0C] text-ellipsis text-5xl leading-none mt-1.5 max-md:text-[40px]"
        role="timer"
        aria-live="polite"
      >
        {formatTime(timeLeft.minutes, timeLeft.seconds)}
      </div>
    </section>
  );
};

// Main Ticket Selection Page Component
interface TicketSelectionPageProps {
  tickets: TicketOption[];
  bannerImage?: string;
  onBack?: () => void;
  onTicketSelect?: (ticketId: string, quantity: number) => void;
  timerDuration?: { minutes: number; seconds: number };
  onTimerExpire?: () => void;
}

export const TicketSelectionPage: React.FC<TicketSelectionPageProps> = ({
  tickets,
  bannerImage,
  onBack,
  onTicketSelect,
  timerDuration = { minutes: 10, seconds: 0 },
  onTimerExpire,
}) => {
  const handleTimerComplete = () => {
    if (onTimerExpire) {
      onTimerExpire();
    } else {
      alert("Time expired! Please refresh to continue booking.");
    }
  };

  return (
    <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
      {/* Left: Banner Section */}
      <div className="w-[65%] max-md:w-full max-md:ml-0">
        <div className="grow text-base text-white font-bold max-md:max-w-full">
          {onBack && <BackButton onClick={onBack} />}
          {bannerImage && (
            <div className="relative w-full aspect-[1.67] mt-4 rounded-[20px] overflow-hidden">
              <Image src={bannerImage} alt="Event banner" fill className="object-cover" priority />
            </div>
          )}
        </div>
      </div>

      {/* Right: Ticket Selection Section */}
      <aside className="w-[35%] ml-5 max-md:w-full max-md:ml-0">
        <div className="flex flex-col items-stretch">
          <CountdownTimer
            initialMinutes={timerDuration.minutes}
            initialSeconds={timerDuration.seconds}
            onComplete={handleTimerComplete}
          />

          <TicketOptionsList tickets={tickets} onTicketSelect={onTicketSelect} />
        </div>
      </aside>
    </div>
  );
};

export default TicketSelectionPage;

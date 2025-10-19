"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { QueuePosition } from "./queue-position";
import { QueueInstructions } from "./queue-instructions";
import { LoadingSpinner } from "../common/LoadingAnimation";

interface QueueStatusProps {
  initialPosition?: number;
  initialTime?: string;
  onQueueComplete?: () => void;
}

export const QueueStatus: React.FC<QueueStatusProps> = ({
  initialPosition = 256,
  initialTime = "04:20s",
  onQueueComplete,
}) => {
  const t = useTranslations("WaitingRoom");
  const [position, setPosition] = useState(initialPosition);
  const [estimatedTime, setEstimatedTime] = useState(initialTime);

  // Simulate queue updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        const newPosition = Math.max(1, prev - Math.floor(Math.random() * 3));

        // If position reaches 1, call onQueueComplete
        if (newPosition === 1 && onQueueComplete) {
          setTimeout(() => {
            onQueueComplete();
          }, 1000);
        }

        return newPosition;
      });

      // Update time based on position
      const minutes = Math.floor(position / 60);
      const seconds = position % 60;
      setEstimatedTime(
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}s`
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [position, onQueueComplete]);

  return (
    <main className="flex max-w-[596px] flex-col items-center text-base text-white font-normal text-center mx-auto px-4">
      <header className="flex flex-col items-center">
        {/* CSS-based loading animation */}
        <div className="w-32 h-32 flex items-center justify-center">
          <LoadingSpinner size={128} />
        </div>
        <h1 className="text-white text-xl font-bold mt-12 max-md:mt-10">{t("title")}</h1>
      </header>

      <QueuePosition position={position} estimatedTime={estimatedTime} />
      <QueueInstructions />
    </main>
  );
};

export default QueueStatus;

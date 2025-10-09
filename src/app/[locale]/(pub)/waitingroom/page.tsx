"use client";

import { useState, useEffect } from "react";

export default function WaitingRoom() {
  const [queue, setQueue] = useState(256);
  const [estimatedTime, setEstimatedTime] = useState("04:20s");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setEstimatedTime((prev) => {
        const [minutes, seconds] = prev.split(":");
        const [sec] = seconds.split("s");
        let totalSeconds = parseInt(minutes) * 60 + parseInt(sec);

        if (totalSeconds > 0) {
          totalSeconds--;
          const newMin = Math.floor(totalSeconds / 60);
          const newSec = totalSeconds % 60;
          return `${String(newMin).padStart(2, "0")}:${String(newSec).padStart(2, "0")}s`;
        }
        return prev;
      });

      setQueue((prev) => Math.max(1, prev - 1));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="min-h-[calc(100dvh-60px)] bg-gradient-to-b from-gray-900 via-black to-black text-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Loading Spinner */}
        <div className="relative w-32 h-32 mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${progress * 2.51} 251.2`}
              strokeLinecap="round"
              className="transition-all duration-100"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Bạn đang trong hàng chờ</h1>

        {/* Queue Info */}
        <div className="space-y-3 mb-8 text-center">
          <p className="text-gray-300 text-base sm:text-lg">
            Vị trí của bạn: <span className="text-red-500 font-bold text-xl">#{queue}</span>
          </p>
          <p className="text-gray-300 text-base sm:text-lg">
            Thời gian ước tính:{" "}
            <span className="text-blue-400 font-bold text-xl">{estimatedTime}</span>
          </p>
        </div>

        {/* Instructions */}
        <p className="text-gray-400 text-sm sm:text-base text-center max-w-md leading-relaxed px-4">
          Đừng thoát màn hình, bạn sẽ được tự động chuyển sang bước thanh toán khi tới lượt
        </p>
      </main>

      {/* Footer Button */}
      <footer className="p-6">
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-blue-900/50">
          Tiếp tục (04:02s)
        </button>
      </footer>
    </div>
  );
}

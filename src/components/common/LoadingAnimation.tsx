"use client";

import React from "react";

interface LoadingAnimationProps {
  size?: number;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ size = 128 }) => {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer rotating ring */}
      <div
        className="absolute rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin"
        style={{
          width: size,
          height: size,
          animationDuration: "1.5s",
        }}
      />

      {/* Middle rotating ring */}
      <div
        className="absolute rounded-full border-4 border-transparent border-t-cyan-400 border-l-cyan-300 animate-spin"
        style={{
          width: size * 0.75,
          height: size * 0.75,
          animationDuration: "2s",
          animationDirection: "reverse",
        }}
      />

      {/* Inner pulsing circle */}
      <div
        className="absolute rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 animate-pulse"
        style={{
          width: size * 0.4,
          height: size * 0.4,
          animationDuration: "2s",
        }}
      />

      {/* Center dot */}
      <div
        className="absolute rounded-full bg-white"
        style={{
          width: size * 0.15,
          height: size * 0.15,
        }}
      />
    </div>
  );
};

export const LoadingSpinner: React.FC<LoadingAnimationProps> = ({ size = 128 }) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Ticket-themed loader */}
      <svg
        className="animate-spin"
        style={{ animationDuration: "2s" }}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#gradient1)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="70 200"
          className="animate-dash"
        />

        {/* Inner circle */}
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="url(#gradient2)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="50 150"
          className="animate-dash-reverse"
        />

        {/* Ticket icon in center */}
        <g transform="translate(50, 50)">
          <rect
            x="-12"
            y="-18"
            width="24"
            height="36"
            rx="2"
            fill="currentColor"
            className="text-blue-500 animate-pulse"
          />
          <circle cx="-12" cy="0" r="3" fill="#1a1a1a" />
          <circle cx="12" cy="0" r="3" fill="#1a1a1a" />
          <line x1="-8" y1="-10" x2="8" y2="-10" stroke="#1a1a1a" strokeWidth="1.5" />
          <line x1="-8" y1="-5" x2="8" y2="-5" stroke="#1a1a1a" strokeWidth="1.5" />
        </g>

        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -280;
          }
        }
        @keyframes dash-reverse {
          to {
            stroke-dashoffset: 200;
          }
        }
        .animate-dash {
          animation: dash 2s linear infinite;
        }
        .animate-dash-reverse {
          animation: dash-reverse 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export const LoadingDots: React.FC = () => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div
        className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "1s" }}
      />
      <div
        className="w-4 h-4 bg-cyan-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s", animationDuration: "1s" }}
      />
      <div
        className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.4s", animationDuration: "1s" }}
      />
    </div>
  );
};

export default LoadingAnimation;

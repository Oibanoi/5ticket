"use client";

import React from "react";
import { InfoRow } from "@/types";

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9.25" stroke="#2563EB" strokeWidth="1.5" />
    <path
      d="M13 6C12.74 6 12.5 6.11 12.3 6.29C12.11 6.5 12 6.74 12 7C12 7.27 12.11 7.5 12.3 7.71C12.5 7.9 12.74 8 13 8C13.27 8 13.5 7.9 13.71 7.71C13.9 7.5 14 7.27 14 7C14 6.74 13.9 6.5 13.71 6.29C13.5 6.11 13.27 6 13 6Z"
      fill="#2563EB"
    />
    <path
      d="M12.76 9.18C11.97 9.25 9.79995 10.97 9.79995 10.97C9.69995 11.06 9.69995 11.07 9.76995 11.17L9.81995 11.25L9.84995 11.31C9.91995 11.44 9.92995 11.44 10.04 11.36C10.17 11.27 10.39 11.13 10.76 10.91C11.68 10.32 11.5 11 11.09 12.5C10.87 13.33 10.59 14.39 10.38 15.62C10.14 17.37 11.71 16.47 12.12 16.2C12.5 15.96 13.44 15.3 13.66 15.15L13.7 15.13C13.82 15.05 13.77 15 13.68 14.86C13.66 14.84 13.64 14.81 13.62 14.78C13.54 14.67 13.46 14.75 13.46 14.75C13.41 14.78 13.36 14.82 13.3 14.86C12.85 15.16 12.23 15.59 12.13 15.25C12.04 15 12.41 13.64 12.79 12.25C12.96 11.64 13.13 11 13.27 10.47L13.28 10.41C13.35 9.97 13.5 9.12 12.76 9.18Z"
      fill="#2563EB"
    />
  </svg>
);

interface InfoSectionProps {
  title: string;
  rows: InfoRow[];
  className?: string;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ title, rows, className = "" }) => {
  return (
    <div className={`bg-background-secondary rounded-[20px] p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <InfoIcon />
        <h3 className="text-white font-bold text-[length:var(--font-size-base)]">{title}</h3>
      </div>
      <div className="flex flex-col gap-3">
        {rows.map((row, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="text-white text-[length:var(--font-size-sm)] font-normal">
              {row.label}
            </div>
            <div className="text-white text-[length:var(--font-size-sm)] font-bold text-right">
              {row.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

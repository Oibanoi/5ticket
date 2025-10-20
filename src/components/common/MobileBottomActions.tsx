"use client";

import React from "react";

interface MobileBottomActionsProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Mobile bottom actions component
 * Fixed bottom container for action buttons on mobile
 * Similar to modal footer on mobile devices
 */
export const MobileBottomActions: React.FC<MobileBottomActionsProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-3 lg:hidden z-50 ${className}`}
    >
      {children}
    </div>
  );
};

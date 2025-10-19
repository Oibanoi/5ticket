import React from "react";
import { X } from "lucide-react";

interface CloseButtonProps {
  onClose: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="absolute z-10 flex min-h-4 w-4 h-4 right-4 top-4 items-center justify-center p-2 hover:bg-white/10 rounded-full transition-colors"
      aria-label="Đóng"
      type="button"
    >
      <X className="w-4 h-4 text-white" />
    </button>
  );
};

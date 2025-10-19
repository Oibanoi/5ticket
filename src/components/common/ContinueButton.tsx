import React from "react";

interface ContinueButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  onClick,
  disabled = false,
  children,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`justify-center flex w-full gap-2.5 text-base text-[#FCFCFD] font-bold tracking-[-0.03px] bg-blue-600 px-6 py-3 rounded-[100px] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      <span className="text-[#FCFCFD]">{children}</span>
    </button>
  );
};

// Helper function to format price in Vietnamese currency
export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
};

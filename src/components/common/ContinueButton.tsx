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
      className={`justify-center flex w-full gap-2.5 text-[length:var(--font-size-base)] text-light font-bold tracking-[-0.03px] bg-blue-normal px-6 py-3 rounded-[100px] hover:bg-blue-normal-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      <span className="text-light">{children}</span>
    </button>
  );
};

// Helper function to format price in Vietnamese currency
export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
};

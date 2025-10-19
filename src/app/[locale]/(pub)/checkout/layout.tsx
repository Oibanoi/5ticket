import React from "react";

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({ children }) => {
  return (
    <div className="text-white">
      <div className="max-w-[var(--container-8xl)] p-4 mx-auto">{children}</div>
    </div>
  );
};

export default CheckoutLayout;

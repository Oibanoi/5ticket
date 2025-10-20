import React from "react";

interface CheckoutStatusLayoutProps {
  children: React.ReactNode;
}

const CheckoutStatusLayout: React.FC<CheckoutStatusLayoutProps> = ({ children }) => {
  return (
    <div className="text-white">
      <div className="max-w-[var(--container-8xl)] p-4 mx-auto">{children}</div>
    </div>
  );
};

export default CheckoutStatusLayout;

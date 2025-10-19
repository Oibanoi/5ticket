import React from "react";

interface TicketSelectionLayoutProps {
  children: React.ReactNode;
}

const TicketSelectionLayout: React.FC<TicketSelectionLayoutProps> = ({ children }) => {
  return <div className="text-white">{children}</div>;
};

export default TicketSelectionLayout;

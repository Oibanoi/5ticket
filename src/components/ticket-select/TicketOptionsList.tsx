"use client";

import React, { useState } from "react";
import { TicketOptionCard, TicketOption } from "./TicketOptionCard";

interface TicketOptionsListProps {
  tickets: TicketOption[];
  onTicketSelect?: (ticketId: string, quantity: number) => void;
  className?: string;
}

export const TicketOptionsList: React.FC<TicketOptionsListProps> = ({
  tickets,
  onTicketSelect,
  className = "",
}) => {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const handleTicketSelect = (ticketId: string, quantity: number) => {
    if (quantity > 0) {
      setSelectedTicketId(ticketId);
    }

    if (onTicketSelect) {
      onTicketSelect(ticketId, quantity);
    }
  };

  return (
    <section
      className={`w-full mt-4 space-y-2 ${className}`}
      role="list"
      aria-label="Available tickets"
    >
      {tickets.map((ticket) => (
        <TicketOptionCard
          key={ticket.id}
          ticket={ticket}
          isSelected={selectedTicketId === ticket.id}
          onSelect={handleTicketSelect}
        />
      ))}
    </section>
  );
};

export default TicketOptionsList;

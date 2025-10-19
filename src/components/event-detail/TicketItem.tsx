"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Ticket } from "@/types";

interface TicketItemProps {
  ticket: Ticket;
  expanded: boolean;
  onToggle: () => void;
}

export const TicketItem: React.FC<TicketItemProps> = ({ ticket, expanded, onToggle }) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
  };

  return (
    <div className="bg-dark rounded-3xl overflow-hidden">
      <button onClick={onToggle} className="w-full px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          <span className="font-bold text-base text-light">{ticket.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-pink-500 font-bold">{formatPrice(ticket.price)}</span>
          {!ticket.available && (
            <button className="!py-1 !px-4 text-dark-active rounded-3xl text-sm font-bold bg-dark-lighter hover:bg-dark-lighter">
              Hết vé
            </button>
          )}
        </div>
      </button>
      {expanded && ticket.description && (
        <div className="px-4 pb-3 pt-1 text-sm text-light-normal">{ticket.description}</div>
      )}
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { EventDay } from "@/types";
import { TicketItem } from "./TicketItem";

interface TicketDaySectionProps {
  eventDay: EventDay;
  isExpanded: boolean;
  onToggleDay: () => void;
  onBuyClick: () => void;
}

export const TicketDaySection: React.FC<TicketDaySectionProps> = ({
  eventDay,
  isExpanded,
  onToggleDay,
  onBuyClick,
}) => {
  const t = useTranslations("EventDetail");
  const [expandedTickets, setExpandedTickets] = useState<Record<string, boolean>>({});

  const toggleTicket = (ticketId: string) => {
    setExpandedTickets((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
  };

  return (
    <div className="bg-zinc-900 rounded-3xl overflow-hidden">
      <button
        onClick={onToggleDay}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-800 transition"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          <span className="font-bold text-base">{eventDay.displayDate}</span>
        </div>
        <Button
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onBuyClick();
          }}
          className="text-light-white-hover px-4 py-2 rounded-3xl text-sm font-bold"
        >
          {t("buy_now")}
        </Button>
      </button>

      {isExpanded && eventDay.tickets.length > 0 && (
        <div className="px-6 pb-4 space-y-0.5">
          {eventDay.tickets.map((ticket) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              expanded={expandedTickets[ticket.id] || false}
              onToggle={() => toggleTicket(ticket.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

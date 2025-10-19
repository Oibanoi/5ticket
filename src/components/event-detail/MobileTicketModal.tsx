"use client";

import React, { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { EventDay } from "@/types";

interface MobileTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventDays: EventDay[];
  onBuyClick: () => void;
}

export const MobileTicketModal: React.FC<MobileTicketModalProps> = ({
  isOpen,
  onClose,
  eventDays,
  onBuyClick,
}) => {
  const t = useTranslations("EventDetail");
  const [expandedDay, setExpandedDay] = useState<string | null>("day1");
  const [expandedTickets, setExpandedTickets] = useState<Record<string, boolean>>({});

  const toggleTicket = (ticketId: string) => {
    setExpandedTickets((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end lg:items-center">
      <div className="bg-zinc-900 w-full lg:max-w-2xl lg:mx-auto rounded-t-2xl lg:rounded-2xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 px-4 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">{t("select_ticket")}</h3>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {eventDays.map((eventDay) => (
            <div key={eventDay.id} className="bg-zinc-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedDay(expandedDay === eventDay.id ? null : eventDay.id)}
                className="w-full px-4 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {expandedDay === eventDay.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                  <span className="font-medium">{eventDay.displayDate}</span>
                </div>
              </button>

              {expandedDay === eventDay.id && eventDay.tickets.length > 0 && (
                <div className="px-4 pb-4 space-y-3">
                  {eventDay.tickets.map((ticket) => (
                    <div key={ticket.id} className="bg-zinc-900 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleTicket(`mobile-${ticket.id}`)}
                        className="w-full px-4 py-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          {expandedTickets[`mobile-${ticket.id}`] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          <span className="font-medium">{ticket.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-pink-500 font-bold text-sm">
                            {formatPrice(ticket.price)}
                          </span>
                          {!ticket.available && (
                            <button className="px-3 py-1 bg-zinc-700 rounded text-xs">
                              {t("sold_out")}
                            </button>
                          )}
                        </div>
                      </button>
                      {expandedTickets[`mobile-${ticket.id}`] && ticket.description && (
                        <div className="px-4 pb-3 pt-1 text-sm text-zinc-400">
                          {ticket.description}
                        </div>
                      )}
                    </div>
                  ))}

                  <Button
                    onClick={onBuyClick}
                    className="w-full h-[48px] rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base"
                  >
                    {t("buy_now")}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

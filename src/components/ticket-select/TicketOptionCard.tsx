"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { TicketQuantityModal } from "./TicketQuantityModal";

export interface TicketOption {
  id: string;
  name: string;
  price: number;
  available: boolean;
  description?: string;
  icon?: string;
}

interface TicketOptionCardProps {
  ticket: TicketOption;
  isSelected?: boolean;
  onSelect: (ticketId: string, quantity: number) => void;
  className?: string;
}

export const TicketOptionCard: React.FC<TicketOptionCardProps> = ({
  ticket,
  onSelect,
  className = "",
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations("TicketSelection");
  const handleSelectClick = () => {
    if (ticket.available) {
      setShowModal(true);
    }
  };

  const handleQuantityConfirm = (quantity: number) => {
    onSelect(ticket.id, quantity);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
  };

  return (
    <>
      <article className={`w-full bg-dark rounded-3xl overflow-hidden ${className}`}>
        {/* Main ticket button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-zinc-800/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-white" />
            ) : (
              <ChevronDown className="w-4 h-4 text-white" />
            )}
            <div className="flex items-center gap-2">
              {/* {ticket.icon && (
                <div className="relative w-6 h-6">
                  <Image
                    src={ticket.icon}
                    alt={`${ticket.name} icon`}
                    fill
                    className="object-contain"
                  />
                </div>
              )} */}
              <span className="font-bold text-base text-light">{ticket.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-pink-500 font-bold">{formatPrice(ticket.price)}</span>
            {!ticket.available && (
              <span className="!py-1 !px-4 text-dark-active rounded-3xl text-sm font-bold bg-dark-lighter">
                {t("sold_out")}
              </span>
            )}
          </div>
        </button>

        {/* Expanded content with description and select button */}
        {isExpanded && (
          <div className="px-4 pb-3 pt-1 space-y-3">
            {ticket.description && (
              <p className="text-sm text-light-normal">{ticket.description}</p>
            )}

            {ticket.available && (
              <Button
                onClick={handleSelectClick}
                variant="secondary"
                className="w-full text-light-white-hover px-4 py-2 rounded-3xl text-sm font-bold"
              >
                {t("select_ticket")}
              </Button>
            )}
          </div>
        )}
      </article>

      {/* Quantity Modal */}
      <TicketQuantityModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        ticketName={ticket.name}
        ticketPrice={ticket.price}
        onContinue={handleQuantityConfirm}
      />
    </>
  );
};

export default TicketOptionCard;

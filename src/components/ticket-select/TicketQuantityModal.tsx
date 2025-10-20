"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Minus, Plus, X } from "lucide-react";
import { ContinueButton, formatPrice } from "@/components/common/ContinueButton";

interface TicketQuantityModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketName: string;
  ticketPrice: number;
  maxQuantity?: number;
  onContinue: (quantity: number) => void;
}

export const TicketQuantityModal: React.FC<TicketQuantityModalProps> = ({
  isOpen,
  onClose,
  ticketName,
  ticketPrice,
  maxQuantity = 10,
  onContinue,
}) => {
  const t = useTranslations("TicketSelection");
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      setQuantity(value);
    }
  };

  const handleContinue = () => {
    onContinue(quantity);
    onClose();
  };

  const totalPrice = ticketPrice * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[390px] bg-[#3E4450] border-none p-0" showCloseButton={false}>
        <section className="relative flex flex-col bg-[#3E4450] p-4 rounded-[20px]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute z-10 flex w-6 h-6 right-4 top-4 items-center justify-center hover:bg-white/10 rounded-full transition-colors"
            aria-label={t("close")}
            type="button"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="w-full">
            {/* Header */}
            <header className="flex w-full flex-col items-center text-white text-center">
              <h2 className="text-white text-xl font-bold">{ticketName}</h2>
              <p className="text-white text-base font-normal tracking-[-0.03px] mt-2">
                {t("note")}
              </p>
            </header>

            {/* Quantity Selector */}
            <div className="flex w-full items-center gap-[18px] justify-center mt-4">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="flex items-center justify-center w-10 h-10 bg-[#555D6D] rounded-full hover:bg-[#6B7280] disabled:opacity-50 transition-colors"
                aria-label={t("decrease")}
              >
                <Minus className="w-4 h-4 text-white" />
              </button>

              <div className="flex items-center justify-center min-h-12 w-[226px] bg-background-secondary rounded-[20px]">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleInputChange}
                  min={1}
                  max={maxQuantity}
                  className="text-white text-base font-bold text-center bg-transparent border-none outline-none w-full"
                  aria-label={t("quantity")}
                />
              </div>

              <button
                type="button"
                onClick={handleIncrease}
                disabled={quantity >= maxQuantity}
                className="flex items-center justify-center w-10 h-10 bg-[#555D6D] rounded-full hover:bg-[#6B7280] disabled:opacity-50 transition-colors"
                aria-label={t("increase")}
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Continue Button */}
            <ContinueButton onClick={handleContinue} className="mt-8">
              {t("continue")} - {formatPrice(totalPrice)}
            </ContinueButton>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default TicketQuantityModal;

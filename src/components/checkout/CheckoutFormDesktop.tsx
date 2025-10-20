"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { BackButton } from "@/components/common/BackButton";
import { ContinueButton, formatPrice } from "@/components/common/ContinueButton";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CheckoutFormData } from "./CheckoutForm";
import { PaymentMethodSection } from "./PaymentMethodSection";
import { PaymentMethod } from "@/types";

interface CheckoutFormDesktopProps {
  formData: CheckoutFormData;
  onInputChange: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack?: () => void;
  totalPrice: number;
  children: {
    timer: React.ReactNode;
    eventInfo: React.ReactNode;
    ticketSummary: React.ReactNode;
    formFields: React.ReactNode;
    paymentMethod?: string;
    promoCode?: string;
    onPaymentMethodChange?: (method: string) => void;
    onPromoCodeChange?: (code: string) => void;
  };
}

export const CheckoutFormDesktop: React.FC<CheckoutFormDesktopProps> = ({
  onBack,
  onSubmit,
  totalPrice,
  children,
}) => {
  const t = useTranslations("Checkout");

  return (
    <div className="hidden md:block px-4">
      <div className="grid grid-cols-5 gap-5">
        {/* Column 1: BackButton + Form */}
        <div className="space-y-4 col-span-3">
          {/* BackButton */}
          {onBack && <BackButton onClick={onBack} />}

          {/* Form Section */}
          <section className="w-full">
            <SectionHeader title={t("purchase_info")} />

            <form onSubmit={onSubmit} className="w-full mt-4 px-2 space-y-4">
              {children.formFields}
            </form>
          </section>
        </div>

        {/* Column 2: Timer + EventInfo + TicketSummary + Payment */}
        <aside className="space-y-4 col-span-2">
          {children.timer}
          {children.eventInfo}
          {children.ticketSummary}

          {/* Payment Method Section */}
          <div className="bg-background-secondary rounded-[20px] p-2">
            <PaymentMethodSection
              selectedMethod={children.paymentMethod as PaymentMethod}
              onMethodChange={children.onPaymentMethodChange}
              promoCode={children.promoCode}
              onPromoCodeChange={children.onPromoCodeChange}
            />
          </div>

          <div className="col-span-2">
            <ContinueButton onClick={() => onSubmit({} as React.FormEvent)} type="button">
              {t("continue")} - {formatPrice(totalPrice)}
            </ContinueButton>
          </div>
        </aside>
      </div>
    </div>
  );
};

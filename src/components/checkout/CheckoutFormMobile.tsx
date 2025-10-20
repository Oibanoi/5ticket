"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { BackButton } from "@/components/common/BackButton";
import { ContinueButton, formatPrice } from "@/components/common/ContinueButton";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CheckoutFormData } from "./CheckoutForm";
import { PaymentMethodSection } from "./PaymentMethodSection";
import { PaymentMethod } from "@/types";
import { MobileBottomActions } from "../common/MobileBottomActions";

interface CheckoutFormMobileProps {
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

export const CheckoutFormMobile: React.FC<CheckoutFormMobileProps> = ({
  onBack,
  onSubmit,
  totalPrice,
  children,
}) => {
  const t = useTranslations("Checkout");

  return (
    <div className="md:hidden space-y-4">
      {/* BackButton */}
      {onBack && <BackButton onClick={onBack} />}

      {/* Event Info Section */}
      <div className="space-y-4">
        {children.timer}
        {children.eventInfo}
        {children.ticketSummary}
      </div>

      {/* Form Section */}
      <section className="w-full">
        <SectionHeader title={t("purchase_info")} />

        <form onSubmit={onSubmit} className="w-full mt-4 px-2 space-y-4">
          {children.formFields}
        </form>
      </section>

      {/* Payment Method Section */}
      <div className="bg-background-secondary rounded-[20px] p-2">
        <PaymentMethodSection
          selectedMethod={children.paymentMethod as PaymentMethod}
          onMethodChange={children.onPaymentMethodChange}
          promoCode={children.promoCode}
          onPromoCodeChange={children.onPromoCodeChange}
        />
      </div>

      <MobileBottomActions>
        {/* Continue Button */}
        <ContinueButton className="" onClick={() => onSubmit({} as React.FormEvent)} type="button">
          {t("continue")} - {formatPrice(totalPrice)}
        </ContinueButton>
      </MobileBottomActions>
    </div>
  );
};

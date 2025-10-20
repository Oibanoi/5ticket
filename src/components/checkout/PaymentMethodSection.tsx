"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PaymentMethod } from "@/types";

interface PaymentMethodSectionProps {
  selectedMethod?: PaymentMethod;
  onMethodChange?: (method: PaymentMethod) => void;
  promoCode?: string;
  onPromoCodeChange?: (code: string) => void;
}

const DiscountIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 12L19.5 10.5L21 9L19.5 7.5L21 6L18 3L16.5 4.5L15 3L13.5 4.5L12 3L10.5 4.5L9 3L7.5 4.5L6 3L3 6L4.5 7.5L3 9L4.5 10.5L3 12L4.5 13.5L3 15L4.5 16.5L3 18L6 21L7.5 19.5L9 21L10.5 19.5L12 21L13.5 19.5L15 21L16.5 19.5L18 21L21 18L19.5 16.5L21 15L19.5 13.5L21 12Z"
      fill="currentColor"
    />
    <path d="M9 9L15 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="9" r="1.5" fill="white" />
    <circle cx="15" cy="15" r="1.5" fill="white" />
  </svg>
);

const PaymentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 5H4C2.9 5 2 5.9 2 7V17C2 18.1 2.9 19 4 19H20C21.1 19 22 18.1 22 17V7C22 5.9 21.1 5 20 5ZM20 17H4V12H20V17ZM20 9H4V7H20V9Z"
      fill="currentColor"
    />
  </svg>
);

const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 3V13M3 8H13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RadioButton = ({ checked }: { checked: boolean }) => (
  <div className="w-6 h-6 flex items-center justify-center">
    {checked ? (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" fill="#2563EB" />
        <circle cx="12" cy="12" r="4" fill="white" />
      </svg>
    ) : (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" stroke="#9196A0" strokeWidth="2" fill="transparent" />
      </svg>
    )}
  </div>
);

const CreditCardIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#FFAC33" />
    <rect x="5" y="15" width="38" height="6" fill="#292F33" />
    <rect x="9" y="25" width="30" height="7" rx="1" fill="#F4F7F9" />
    <rect x="10" y="26" width="27" height="4" fill="#8899A6" />
  </svg>
);

interface PaymentMethodOptionProps {
  id: PaymentMethod;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  cardLogos?: boolean;
  selected: boolean;
  onClick: () => void;
}

const PaymentMethodOption: React.FC<PaymentMethodOptionProps> = ({
  title,
  description,
  icon,
  image,
  cardLogos,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between gap-4 p-2 w-full hover:bg-hover-dark transition-colors rounded-lg"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <RadioButton checked={selected} />
        <div className="flex flex-col gap-0.5 text-left flex-1 min-w-0">
          <div className="text-white font-bold text-[length:var(--font-size-sm)] md:text-[length:var(--font-size-base)]">
            {title}
          </div>
          <div className="text-light-dark text-[length:var(--font-size-xs)]">{description}</div>
          {cardLogos && (
            <div className="relative w-20 h-5 mt-1">
              <Image
                src="/assets/images/payment/card-logos.png"
                alt="Card logos"
                fill
                className="object-contain object-left"
              />
            </div>
          )}
        </div>
      </div>
      {image ? (
        <div className="w-12 h-12 flex-shrink-0 relative">
          <Image src={image} alt={title} fill className="object-contain rounded-lg" />
        </div>
      ) : (
        icon && (
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">{icon}</div>
        )
      )}
    </button>
  );
};

export const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  selectedMethod,
  onMethodChange,
  promoCode = "",
  onPromoCodeChange,
}) => {
  const t = useTranslations("Payment");
  const [localSelectedMethod, setLocalSelectedMethod] = useState<PaymentMethod>("qr_bank");
  const [localPromoCode, setLocalPromoCode] = useState(promoCode);

  const currentMethod = selectedMethod ?? localSelectedMethod;

  const handleMethodChange = (method: PaymentMethod) => {
    setLocalSelectedMethod(method);
    onMethodChange?.(method);
  };

  const handlePromoCodeChange = (code: string) => {
    setLocalPromoCode(code);
    onPromoCodeChange?.(code);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Promo Code Section */}
      <div className="flex flex-col gap-4 p-2">
        <div className="flex items-center gap-2">
          <DiscountIcon />
          <span className="text-white font-bold text-base">{t("promo_code")}</span>
        </div>
        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-dark-lighter hover:bg-dark-light-active transition-colors text-dark-active font-bold text-[length:var(--font-size-base)] px-4 py-2.5 rounded-full"
        >
          <AddIcon />
          <span>{t("select_or_enter_code")}</span>
        </button>
      </div>

      {/* Payment Method Section */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 p-2">
          <PaymentIcon />
          <span className="text-white font-bold text-base">{t("select_payment_method")}</span>
        </div>

        <div className="flex flex-col p-2">
          <PaymentMethodOption
            id="qr_bank"
            title={t("qr_bank_transfer")}
            description={t("qr_bank_transfer_desc")}
            image="/assets/images/payment/qr-bank.png"
            selected={currentMethod === "qr_bank"}
            onClick={() => handleMethodChange("qr_bank")}
          />

          <PaymentMethodOption
            id="atm_domestic"
            title={t("atm_domestic")}
            description={t("atm_domestic_desc")}
            icon={<CreditCardIcon />}
            selected={currentMethod === "atm_domestic"}
            onClick={() => handleMethodChange("atm_domestic")}
          />

          <PaymentMethodOption
            id="credit_debit_domestic"
            title={t("credit_debit_domestic")}
            description={t("credit_debit_domestic_desc")}
            icon={<CreditCardIcon />}
            cardLogos={true}
            selected={currentMethod === "credit_debit_domestic"}
            onClick={() => handleMethodChange("credit_debit_domestic")}
          />

          <PaymentMethodOption
            id="credit_debit_international"
            title={t("credit_debit_international")}
            description={t("credit_debit_international_desc")}
            image="/assets/images/payment/international-card-63fa93.png"
            cardLogos={true}
            selected={currentMethod === "credit_debit_international"}
            onClick={() => handleMethodChange("credit_debit_international")}
          />

          <PaymentMethodOption
            id="payx_qr"
            title={t("payx_qr")}
            description={t("payx_qr_desc")}
            image="/assets/images/payment/payx-qr.png"
            selected={currentMethod === "payx_qr"}
            onClick={() => handleMethodChange("payx_qr")}
          />

          <PaymentMethodOption
            id="payx_atm"
            title={t("payx_atm")}
            description={t("payx_atm_desc")}
            image="/assets/images/payment/payx-atm.png"
            selected={currentMethod === "payx_atm"}
            onClick={() => handleMethodChange("payx_atm")}
          />

          <PaymentMethodOption
            id="payx_international"
            title={t("payx_international")}
            description={t("payx_international_desc")}
            image="/assets/images/payment/payx-international.png"
            selected={currentMethod === "payx_international"}
            onClick={() => handleMethodChange("payx_international")}
          />
        </div>
      </div>
    </div>
  );
};

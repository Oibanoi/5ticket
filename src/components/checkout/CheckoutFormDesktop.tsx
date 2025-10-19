"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { BackButton } from "@/components/common/BackButton";
import { ContinueButton, formatPrice } from "@/components/common/ContinueButton";
import { CheckoutFormData } from "./CheckoutForm";

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
            <div className="flex min-h-6 w-full gap-2 text-base text-white font-bold flex-wrap px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="9.25" stroke="#2563EB" strokeWidth="1.5" />
                <path
                  d="M13 6C12.74 6 12.5 6.11 12.3 6.29C12.11 6.5 12 6.74 12 7C12 7.27 12.11 7.5 12.3 7.71C12.5 7.9 12.74 8 13 8C13.27 8 13.5 7.9 13.71 7.71C13.9 7.5 14 7.27 14 7C14 6.74 13.9 6.5 13.71 6.29C13.5 6.11 13.27 6 13 6Z"
                  fill="#2563EB"
                />
                <path
                  d="M12.76 9.18C11.97 9.25 9.79995 10.97 9.79995 10.97C9.69995 11.06 9.69995 11.07 9.76995 11.17L9.81995 11.25L9.84995 11.31C9.91995 11.44 9.92995 11.44 10.04 11.36C10.17 11.27 10.39 11.13 10.76 10.91C11.68 10.32 11.5 11 11.09 12.5C10.87 13.33 10.59 14.39 10.38 15.62C10.14 17.37 11.71 16.47 12.12 16.2C12.5 15.96 13.44 15.3 13.66 15.15L13.7 15.13C13.82 15.05 13.77 15 13.68 14.86C13.66 14.84 13.64 14.81 13.62 14.78C13.54 14.67 13.46 14.75 13.46 14.75C13.41 14.78 13.36 14.82 13.3 14.86C12.85 15.16 12.23 15.59 12.13 15.25C12.04 15 12.41 13.64 12.79 12.25C12.96 11.64 13.13 11 13.27 10.47L13.28 10.41C13.35 9.97 13.5 9.12 12.76 9.18Z"
                  fill="#2563EB"
                />
              </svg>
              <h2 className="text-white text-ellipsis">{t("purchase_info")}</h2>
            </div>

            <form onSubmit={onSubmit} className="w-full mt-4 px-2 space-y-4">
              {children.formFields}
            </form>
          </section>
        </div>

        {/* Column 2: Timer + EventInfo + TicketSummary */}
        <aside className="space-y-4 col-span-2">
          {children.timer}
          {children.eventInfo}
          {children.ticketSummary}
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

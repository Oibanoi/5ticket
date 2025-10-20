"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { InfoSection } from "@/components/common/InfoSection";
import { MobileBottomActions } from "@/components/common/MobileBottomActions";
import {
  TicketInfo,
  EventInfo,
  PurchaseInfo,
  TransactionInfo,
  TransactionStatus,
  InfoRow,
} from "@/types";

const SuccessIcon = () => (
  <div className="relative">
    {/* Outer glow ring - animated */}
    <div className="absolute inset-0 rounded-full bg-success/20 animate-ping" />

    {/* Middle ring */}
    <div className="absolute inset-0 rounded-full bg-success/10 blur-xl" />

    {/* Main icon */}
    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-success to-success-hover flex items-center justify-center shadow-lg shadow-success/50">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        className="animate-[bounce_1s_ease-in-out]"
      >
        <path
          d="M20 6L9 17L4 12"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

const DateIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2V1C12 0.4 11.6 0 11 0S10 0.4 10 1V2H6V1C6 0.4 5.6 0 5 0S4 0.4 4 1V2H2C0.9 2 0 2.9 0 4V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2H12ZM14 14H2V7H14V14ZM2 5V4H14V5H2Z"
      fill="#F0F3F6"
    />
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 0C5.2 0 3 2.2 3 5C3 8.5 8 16 8 16C8 16 13 8.5 13 5C13 2.2 10.8 0 8 0ZM8 7C6.9 7 6 6.1 6 5C6 3.9 6.9 3 8 3C9.1 3 10 3.9 10 5C10 6.1 9.1 7 8 7Z"
      fill="#F0F3F6"
    />
  </svg>
);

interface CheckoutStatusSuccessProps {
  userEmail: string;
  ticketInfo: TicketInfo;
  eventInfo: EventInfo;
  purchaseInfo: PurchaseInfo;
  transactionInfo: TransactionInfo;
}

const StatusTag = ({ status }: { status: TransactionStatus }) => {
  const t = useTranslations("CheckoutStatus");

  const statusColors = {
    success: "bg-success border-success",
    pending: "bg-warning border-warning",
    failed: "bg-error border-error",
  };

  const statusLabels = {
    success: t("status_success"),
    pending: t("status_pending"),
    failed: t("status_failed"),
  };

  return (
    <div
      className={`inline-flex items-center justify-center px-4 py-1 rounded-xl border-[1.5px] ${statusColors[status]}`}
    >
      <span className="text-white text-[10px] font-bold leading-[14px]">
        {statusLabels[status]}
      </span>
    </div>
  );
};

export const CheckoutStatusSuccess: React.FC<CheckoutStatusSuccessProps> = ({
  userEmail,
  ticketInfo,
  eventInfo,
  purchaseInfo,
  transactionInfo,
}) => {
  const t = useTranslations("CheckoutStatus");
  const router = useRouter();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
  };

  const purchaseRows: InfoRow[] = [
    { label: t("full_name"), value: purchaseInfo.fullName },
    { label: t("birth_date"), value: purchaseInfo.birthDate },
    { label: t("id_number"), value: purchaseInfo.idNumber },
  ];

  const transactionRows: InfoRow[] = [
    { label: t("subtotal"), value: formatPrice(transactionInfo.subtotal) },
    { label: t("discount"), value: formatPrice(transactionInfo.discount) },
    {
      label: t("total"),
      value: <span className="text-red-normal">{formatPrice(transactionInfo.total)}</span>,
    },
    { label: t("status"), value: <StatusTag status={transactionInfo.status} /> },
    { label: t("transaction_time"), value: transactionInfo.transactionTime },
    { label: t("transaction_id"), value: transactionInfo.transactionId },
    { label: t("payment_method"), value: transactionInfo.paymentMethod },
  ];

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoToTickets = () => {
    router.push("/my-tickets");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start pb-20 lg:pb-0">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center gap-1 lg:items-stretch sm:w-full">
        {/* Success Message */}
        <div className="relative overflow-hidden bg-gradient-to-br from-success/5 via-background-secondary to-background-secondary rounded-[20px] p-6 mb-0.5 w-full border border-success/20 shadow-lg shadow-success/5">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-success/5 rounded-full blur-2xl" />

          {/* Content */}
          <div className="relative flex items-center gap-4 md:gap-6">
            <SuccessIcon />
            <div className="flex flex-col gap-2 flex-1">
              <h1 className="text-white text-[length:var(--font-size-xl)] md:text-[length:var(--font-size-2xl)] font-bold flex items-center gap-2">
                {t("purchase_success")}
                <span className="inline-block animate-[wiggle_1s_ease-in-out_infinite]">🎉</span>
              </h1>
              <p className="text-light-normal-active text-[length:var(--font-size-sm)] md:text-[length:var(--font-size-base)] font-normal leading-relaxed">
                {t("ticket_notification", { email: userEmail })}
              </p>
            </div>
          </div>
        </div>
        {/* Event Details */}
        <div className="bg-background-secondary rounded-[20px] p-4 mb-0.5 w-full">
          <h2 className="text-white text-[length:var(--font-size-2xl)] md:text-[length:var(--font-size-4xl)] font-bold mb-4">
            {eventInfo.title}
          </h2>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <DateIcon />
              <span className="text-light-normal text-[length:var(--font-size-sm)] md:text-[length:var(--font-size-base)]">
                {eventInfo.date}
              </span>
            </div>
            <div className="flex items-start gap-1">
              <LocationIcon />
              <span className="text-light-normal text-[length:var(--font-size-sm)] md:text-[length:var(--font-size-base)] flex-1">
                {eventInfo.location}
              </span>
            </div>
          </div>
        </div>

        {/* Ticket Summary */}
        <div className="bg-background-secondary rounded-[20px] p-4 mb-0.5 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-white text-[length:var(--font-size-base)] font-bold">
                X{ticketInfo.quantity}
              </span>
              <span className="text-white text-[length:var(--font-size-base)] font-bold">
                {ticketInfo.ticketType}
              </span>
            </div>
            <span className="text-red-normal text-[length:var(--font-size-base)] font-bold text-right">
              {formatPrice(ticketInfo.price * ticketInfo.quantity)}
            </span>
          </div>
        </div>

        {/* Purchase Info */}
        <InfoSection title={t("purchase_info")} rows={purchaseRows} className="mb-0.5 w-full" />

        {/* Transaction Info */}
        <InfoSection title={t("transaction_info")} rows={transactionRows} className="w-full" />
      </div>

      {/* Action Buttons - Mobile (Fixed Bottom) */}
      <MobileBottomActions>
        <div className="flex flex-row gap-2 w-full">
          <button
            onClick={handleGoHome}
            className="w-full py-3 px-4 bg-dark-lighter hover:bg-dark-light-active transition-colors text-dark-active font-bold text-[length:var(--font-size-base)] rounded-full"
          >
            {t("go_home")}
          </button>
          <button
            onClick={handleGoToTickets}
            className="w-full py-3 px-4 bg-blue-normal hover:bg-blue-normal-active transition-colors text-white font-bold text-[length:var(--font-size-base)] rounded-full"
          >
            {t("go_to_tickets")}
          </button>
        </div>
      </MobileBottomActions>

      {/* Action Buttons - Desktop */}
      <div className="hidden lg:flex flex-col gap-2 w-auto">
        <button
          onClick={handleGoHome}
          className="w-full py-3 px-20 bg-dark-lighter hover:bg-dark-light-active transition-colors text-dark-active font-bold text-[length:var(--font-size-base)] rounded-full"
        >
          {t("go_home")}
        </button>
        <button
          onClick={handleGoToTickets}
          className="w-full py-3 px-20 bg-blue-normal hover:bg-blue-normal-active transition-colors text-white font-bold text-[length:var(--font-size-base)] rounded-full"
        >
          {t("go_to_tickets")}
        </button>
      </div>
    </div>
  );
};

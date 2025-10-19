"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckoutFormMobile } from "./CheckoutFormMobile";
import { CheckoutFormDesktop } from "./CheckoutFormDesktop";

// Merged TimerCard component
interface TimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  onExpire?: () => void;
}

const CheckoutTimer: React.FC<TimerProps> = ({
  initialMinutes = 10,
  initialSeconds = 0,
  onExpire,
}) => {
  const t = useTranslations("Checkout");
  const [timeLeft, setTimeLeft] = useState({
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes === 0 && prev.seconds === 0) {
          onExpire?.();
          return prev;
        }

        if (prev.seconds === 0) {
          return {
            minutes: prev.minutes - 1,
            seconds: 59,
          };
        }

        return {
          ...prev,
          seconds: prev.seconds - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onExpire]);

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col text-[#090A0C] font-normal text-center bg-[#FE0] px-4 py-2 rounded-[20px]">
      <div className="text-[#090A0C] text-ellipsis text-base">{t("complete_booking")}</div>
      <div className="text-[#090A0C] text-ellipsis text-5xl leading-none mt-1.5 max-md:text-[40px]">
        {formatTime(timeLeft.minutes, timeLeft.seconds)}
      </div>
    </div>
  );
};

// Merged EventCard component
interface EventInfoProps {
  title: string;
  date: string;
  location: string;
  imageUrl?: string;
}

const EventInfo: React.FC<EventInfoProps> = ({ title, date, location, imageUrl }) => {
  return (
    <article className="bg-[#1E2126] p-4 rounded-[20px]">
      {imageUrl && (
        <div className="relative w-full h-32 mb-4 rounded-[20px] overflow-hidden">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      )}
      <h3 className="text-white text-ellipsis text-xl font-bold leading-[30px]">{title}</h3>
      <div className="flex w-full flex-col items-stretch text-xs text-[#F0F3F6] font-normal mt-4">
        <div className="flex items-center gap-1 leading-none">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path
              d="M12 2V1C12 0.4 11.6 0 11 0S10 0.4 10 1V2H6V1C6 0.4 5.6 0 5 0S4 0.4 4 1V2H2C0.9 2 0 2.9 0 4V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2H12ZM14 14H2V7H14V14ZM2 5V4H14V5H2Z"
              fill="#F0F3F6"
            />
          </svg>
          <div className="text-[#F0F3F6] text-ellipsis">{date}</div>
        </div>
        <div className="flex w-full items-start gap-1 leading-[15px] mt-1.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
            <path
              d="M8 0C5.2 0 3 2.2 3 5C3 8.5 8 16 8 16C8 16 13 8.5 13 5C13 2.2 10.8 0 8 0ZM8 7C6.9 7 6 6.1 6 5C6 3.9 6.9 3 8 3C9.1 3 10 3.9 10 5C10 6.1 9.1 7 8 7Z"
              fill="#F0F3F6"
            />
          </svg>
          <div className="text-[#F0F3F6] text-ellipsis flex-1">{location}</div>
        </div>
      </div>
    </article>
  );
};

// Merged TicketInfo component
interface TicketSummaryProps {
  quantity: number;
  ticketType: string;
  price: number;
}

const TicketSummary: React.FC<TicketSummaryProps> = ({ quantity, ticketType, price }) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
  };

  return (
    <div className="items-center flex w-full text-base font-bold whitespace-nowrap bg-[#1E2126] p-4 rounded-[20px]">
      <div className="self-stretch flex min-w-60 w-full gap-[25px] justify-between flex-1 shrink basis-[0%] my-auto">
        <div className="flex items-center gap-4 text-white">
          <div className="text-white self-stretch my-auto">X{quantity}</div>
          <div className="text-white text-ellipsis self-stretch w-[200px] my-auto">
            {ticketType}
          </div>
        </div>
        <div className="text-[#F30C60] text-right">{formatPrice(price * quantity)}</div>
      </div>
    </div>
  );
};

// Unified Input Field (handles both text and date inputs)
interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "date" | "email" | "tel";
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  className = "",
}) => {
  return (
    <div className={`w-full max-md:max-w-full ${className}`}>
      <div className="flex w-full flex-col items-stretch justify-center max-md:max-w-full">
        <label className="flex gap-0.5 text-xs text-white font-bold leading-none">
          <span className="text-white">{label}</span>
          {required && <span className="text-red-400">*</span>}
        </label>
        <div className="items-center shadow-[0_2px_4px_0_rgba(0,0,0,0.20)] flex w-full gap-2 text-base text-[#EBEEF2] font-normal bg-[#3E4450] mt-1 py-2 rounded-[20px] max-md:max-w-full">
          <div className="self-stretch flex min-w-60 min-h-6 w-full items-center gap-2 my-auto px-4">
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="text-[#EBEEF2] bg-transparent border-none outline-none text-ellipsis flex-1 w-full my-auto placeholder:text-[#EBEEF2]/60"
              aria-label={label}
            />
            {type === "date" && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path
                  d="M12 2V1C12 0.4 11.6 0 11 0S10 0.4 10 1V2H6V1C6 0.4 5.6 0 5 0S4 0.4 4 1V2H2C0.9 2 0 2.9 0 4V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2H12ZM14 14H2V7H14V14ZM2 5V4H14V5H2Z"
                  fill="#EBEEF2"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main CheckoutForm component
export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  idNumber: string;
}

interface CheckoutFormProps {
  eventInfo: EventInfoProps;
  ticketInfo: TicketSummaryProps;
  initialData?: Partial<CheckoutFormData>;
  onBack?: () => void;
  onSubmit: (data: CheckoutFormData) => void;
  timerDuration?: { minutes: number; seconds: number };
  onTimerExpire?: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  eventInfo,
  ticketInfo,
  initialData,
  onBack,
  onSubmit,
  timerDuration = { minutes: 10, seconds: 0 },
  onTimerExpire,
}) => {
  const t = useTranslations("Checkout");
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    birthDate: initialData?.birthDate || "",
    idNumber: initialData?.idNumber || "",
  });

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const totalPrice = ticketInfo.price * ticketInfo.quantity;

  // Shared form fields component
  const formFields = (
    <>
      <FormField
        label={t("first_name")}
        value={formData.firstName}
        onChange={(value) => handleInputChange("firstName", value)}
        placeholder={t("first_name_placeholder")}
        required
      />

      <FormField
        label={t("last_name")}
        value={formData.lastName}
        onChange={(value) => handleInputChange("lastName", value)}
        placeholder={t("last_name_placeholder")}
        required
      />

      <FormField
        label={t("birth_date")}
        type="date"
        value={formData.birthDate}
        onChange={(value) => handleInputChange("birthDate", value)}
        required
      />

      <FormField
        label={t("id_number")}
        value={formData.idNumber}
        onChange={(value) => handleInputChange("idNumber", value)}
        required
      />
    </>
  );

  // Shared components
  const sharedComponents = {
    timer: (
      <CheckoutTimer
        initialMinutes={timerDuration.minutes}
        initialSeconds={timerDuration.seconds}
        onExpire={onTimerExpire}
      />
    ),
    eventInfo: <EventInfo {...eventInfo} />,
    ticketSummary: <TicketSummary {...ticketInfo} />,
    formFields,
  };

  return (
    <>
      {/* Mobile Layout */}
      <CheckoutFormMobile
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onBack={onBack}
        totalPrice={totalPrice}
      >
        {sharedComponents}
      </CheckoutFormMobile>

      {/* Desktop Layout */}
      <CheckoutFormDesktop
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onBack={onBack}
        totalPrice={totalPrice}
      >
        {sharedComponents}
      </CheckoutFormDesktop>
    </>
  );
};

export default CheckoutForm;

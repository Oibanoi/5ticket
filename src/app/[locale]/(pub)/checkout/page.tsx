"use client";

import { CheckoutForm, CheckoutFormData } from "@/components/checkout";
import { LoadingSpinner } from "@/components/common/LoadingAnimation";
import { getTicketById, mockEventInfo } from "@/mocks/ticket-data";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ticketInfo, setTicketInfo] = useState<{
    quantity: number;
    ticketType: string;
    price: number;
  } | null>(null);

  useEffect(() => {
    // Lấy thông tin vé từ localStorage
    if (typeof window !== "undefined") {
      const savedTicket = localStorage.getItem("selectedTicket");
      if (savedTicket) {
        const data = JSON.parse(savedTicket);
        const ticket = getTicketById(data.ticketId);

        if (ticket) {
          setTicketInfo({
            quantity: data.quantity,
            ticketType: ticket.name,
            price: ticket.price,
          });
        } else {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    }
  }, [router]);

  const handleSubmit = (data: CheckoutFormData) => {
    if (!data.firstName || !data.lastName || !data.birthDate || !data.idNumber) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (typeof window !== "undefined") {
      const checkoutData = {
        ...data,
        ticketInfo,
        timestamp: Date.now(),
      };
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    }

    // Chuyển đến trang thanh toán
    router.push("/payment");
  };

  const handleBack = () => {
    router.back();
  };

  const handleTimerExpire = () => {
    alert("Hết thời gian đặt vé! Vé của bạn đã bị hủy.");
    // Xóa thông tin vé đã lưu
    if (typeof window !== "undefined") {
      localStorage.removeItem("selectedTicket");
    }
    router.push("/");
  };

  // Show loading while fetching ticket info
  if (!ticketInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size={128} />
      </div>
    );
  }

  return (
    <CheckoutForm
      eventInfo={mockEventInfo}
      ticketInfo={ticketInfo}
      onBack={handleBack}
      onSubmit={handleSubmit}
      timerDuration={{ minutes: 10, seconds: 0 }}
      onTimerExpire={handleTimerExpire}
    />
  );
}

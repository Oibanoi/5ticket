"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { TicketSelectionPage } from "@/components/ticket-select";
import { mockTickets, mockEventInfo } from "@/mocks/ticket-data";

export default function TicketSelectionPageRoute() {
  const router = useRouter();
  const params = useParams();

  const handleTicketSelect = (ticketId: string, quantity: number) => {
    if (quantity > 0) {
      // Lưu thông tin vé vào localStorage hoặc state management
      const ticketData = {
        ticketId,
        quantity,
        eventSlug: params.slug,
        timestamp: Date.now(),
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("selectedTicket", JSON.stringify(ticketData));
      }

      // Chuyển đến checkout
      router.push(`/checkout`);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleTimerExpire = () => {
    alert("Hết thời gian chọn vé! Vui lòng thử lại.");
    router.push(`/events/${params.slug}`);
  };

  return (
    <TicketSelectionPage
      tickets={mockTickets}
      bannerImage={mockEventInfo.imageUrl}
      onBack={handleBack}
      onTicketSelect={handleTicketSelect}
      timerDuration={{ minutes: 10, seconds: 0 }}
      onTimerExpire={handleTimerExpire}
    />
  );
}

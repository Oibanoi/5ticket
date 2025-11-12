"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  EventHero,
  EventDescription,
  TicketDaySection,
  MobileTicketModal,
} from "@/components/event-detail";
import { mockEventDetail } from "@/mocks/event-detail";
import { useTranslations } from "next-intl";
import { MobileBottomActions } from "@/components/common/MobileBottomActions";

export default function EventBooking() {
  const t = useTranslations("EventDetail");
  const [expandedDay, setExpandedDay] = useState<string | null>("day1");
  const [showMobileTickets, setShowMobileTickets] = useState(false);

  const event = mockEventDetail;

  const handleBookClick = () => {
    setShowMobileTickets(true);
  };

  const handleBuyClick = () => {};

  const toggleDay = (dayId: string) => {
    setExpandedDay(expandedDay === dayId ? null : dayId);
  };

  return (
    <>
      {/* Hero Section */}
      <EventHero
        title={event.name}
        image={event.wall_paper_url || event.logo_url || "/event/banner.png"}
        date={event.start_date}
        location={event.location}
        minPrice={event.base_price || 0}
        onBookClick={handleBookClick}
      />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[2.6fr_1.4fr] sm:gap-8">
        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8 p-4 pb-24 lg:pb-9">
          <EventDescription description={event.description} gallery={event.gallery} />
        </div>

        {/* Sidebar - Ticket Selection (Desktop Only) */}
        <div className="hidden lg:block space-y-3">
          {event.event_days.map((eventDay) => (
            <TicketDaySection
              key={eventDay.id}
              eventDay={eventDay}
              isExpanded={expandedDay === eventDay.id}
              onToggleDay={() => toggleDay(eventDay.id)}
              onBuyClick={handleBuyClick}
            />
          ))}
        </div>
      </div>

      {/* Mobile Ticket Modal */}
      <MobileTicketModal
        isOpen={showMobileTickets}
        onClose={() => setShowMobileTickets(false)}
        eventDays={event.event_days}
        onBuyClick={handleBuyClick}
      />

      {/* Mobile Bottom Button */}
      <MobileBottomActions>
        <Button
          onClick={handleBookClick}
          className="w-full h-[48px] rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base"
        >
          {t("select_ticket")}
        </Button>
      </MobileBottomActions>
    </>
  );
}

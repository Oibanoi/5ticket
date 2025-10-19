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

export default function EventBooking() {
  const t = useTranslations("EventDetail");
  const [expandedDay, setExpandedDay] = useState<string | null>("day1");
  const [showMobileTickets, setShowMobileTickets] = useState(false);

  const event = mockEventDetail;

  const handleBookClick = () => {
    setShowMobileTickets(true);
  };

  const handleBuyClick = () => {
    // TODO: Implement navigation to checkout
    console.log("Navigate to checkout");
  };

  const toggleDay = (dayId: string) => {
    setExpandedDay(expandedDay === dayId ? null : dayId);
  };

  return (
    <>
      {/* Hero Section */}
      <EventHero
        title={event.title}
        image={event.image}
        date={event.date}
        location={event.location}
        minPrice={event.price || 0}
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
          {event.eventDays.map((eventDay) => (
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
        eventDays={event.eventDays}
        onBuyClick={handleBuyClick}
      />

      {/* Mobile Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-3 lg:hidden z-50">
        <Button
          onClick={handleBookClick}
          className="w-full h-[48px] rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base"
        >
          {t("select_ticket")}
        </Button>
      </div>
    </>
  );
}

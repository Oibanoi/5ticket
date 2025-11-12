"use client";

import { useTranslations } from "next-intl";
import EventListContainer from "./event-list-container";
import { MainEvent } from "@/types";

interface AllEventsProps {
  events: MainEvent[];
}

const AllEvents = ({ events }: AllEventsProps) => {
  const t = useTranslations("HomePage");
  const categories = ["Tất cả", "Giải trí", "Giáo dục", "Sức khỏe", "Công nghệ"];

  return (
    <EventListContainer
      title={t("all_events")}
      categories={categories}
      events={events}
      useCarousel={false}
      autoplay={false}
      autoplayDelay={3000}
      loop={false}
    />
  );
};

export default AllEvents;

import React from "react";
import Image from "next/image";
import EventCard from "./event-card";
import EventCarousel from "./event-carousel";
import { MainEvent } from "@/types";
import EventImageCard from "./event-image-card";
import EventFillter from "./event-fillter";

interface EventListContainerProps {
  icon?: React.ReactNode;
  title: string;
  categories?: string[];
  events: MainEvent[];
  useCarousel?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
}

const EventListContainer = ({
  icon,
  title,
  categories,
  events,
  useCarousel = false,
  autoplay = false,
  autoplayDelay = 3000,
  loop = false,
}: EventListContainerProps) => {
  return (
    <section className="my-3 lg:my-6 ">
      <div className="flex justify-between flex-col mb-2 gap-2">
        <div className="flex items-center gap-2 text-white text-lg font-semibold">
          {icon ? <span>{icon}</span> : <div className="w-1 h-6 bg-secondary"></div>}
          <h2>{title}</h2>
        </div>
        {categories ? <EventFillter categories={categories} /> : null}
      </div>

      {useCarousel ? (
        <EventCarousel loop={loop} autoplay={autoplay} autoplayDelay={autoplayDelay}>
          {events.map((event) => (
            <div key={event.id} className="flex-none">
              {event.onlyImage ? <EventImageCard event={event} /> : <EventCard {...event} />}
            </div>
          ))}
        </EventCarousel>
      ) : (
        <div className="grid grid-cols-2 gap-2 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {events.map((event) => (
            <div key={event.id} className="flex-none justify-self-center">
              {event.onlyImage ? (
                <Image
                  src={event.wall_paper_url}
                  alt={event.name}
                  width={264}
                  height={300}
                  className="w-full h-full object-cover rounded-[20px]"
                />
              ) : (
                <EventCard {...event} />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EventListContainer;

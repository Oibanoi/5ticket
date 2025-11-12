import { MainEvent } from "@/types";
import EventCarousel from "./event-carousel";
import EventImageCard from "./event-image-card";

interface BannerProps {
  events: MainEvent[];
}

const Banner = ({ events }: BannerProps) => {
  // Ensure we have events to display
  if (events.length === 0) {
    return null;
  }

  return (
    <section className="my-3">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="w-full h-full col-span-1 lg:col-span-2">
          <EventCarousel
            loop={true}
            autoplay={true}
            autoplayDelay={3000}
            numberOfSlides={1}
            activeDot={true}
            borderRadius="rounded-[20px]"
            isNavigation={false}
          >
            {events.map((event) => (
              <div key={event.id} className="flex-none w-full">
                <EventImageCard event={event} className="w-full rounded-none lg:rounded-none" />
              </div>
            ))}
          </EventCarousel>
        </div>

        <div className="hidden lg:grid lg:grid-rows-2 gap-2 col-span-1">
          {events[0] && (
            <div className="w-full h-full">
              <EventImageCard event={events[0]} className="w-full" />
            </div>
          )}
          {events[1] && (
            <div className="w-full h-full">
              <EventImageCard event={events[1]} className="w-full" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;

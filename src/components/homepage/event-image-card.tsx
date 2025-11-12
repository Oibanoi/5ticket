import Image from "next/image";
import { MainEvent } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface EventImageCardProps {
  event: MainEvent;
  className?: string;
}
const EventImageCard = ({ event, className }: EventImageCardProps) => {
  const eventUrl = `/events/${event.slug || event.id}`;
  const eventImage = event.wall_paper_url || event.logo_url || "/event/banner.png";

  return (
    <div className="w-full h-auto">
      <Link href={eventUrl}>
        <Image
          src={eventImage}
          alt={event.name}
          width={264}
          height={300}
          className={cn(
            "h-auto object-cover rounded-[8px] lg:rounded-[20px] aspect-[1.67]",
            className
          )}
        />
      </Link>
    </div>
  );
};

export default EventImageCard;

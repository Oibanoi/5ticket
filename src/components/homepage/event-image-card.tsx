import Image from "next/image";
import { Event } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface EventImageCardProps {
  event: Event;
  className?: string;
}
const EventImageCard = ({ event, className }: EventImageCardProps) => {
  return (
    <div className="w-full h-auto">
      <Link href={event.url || ""}>
        <Image
          src={event.image}
          alt={event.title}
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

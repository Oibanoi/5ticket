import Image from "next/image";
import { Calendar } from "lucide-react";
import { formatPrice } from "@/lib/price";
import { formatDateEN, formatDateVI } from "@/lib/date";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Event } from "@/types";

const EventCard = (event: Event) => {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const date = locale === "vi" ? formatDateVI(event.date) : formatDateEN(event.date);
  const price = formatPrice(event.price);
  return (
    <article
      className={`max-w-[264px] text-lg font-bold cursor-pointer transition-transform lg:hover:scale-105 `}
      role="button"
      tabIndex={0}
      aria-label={`Event: ${event.title}, Price: ${event.price}, Date: ${event.date}`}
    >
      <Link href={event.url || ""}>
        <Image
          src={event.image}
          alt={event.title}
          width={264}
          height={300}
          className={`aspect-[1.67] object-cover w-full rounded-[8px] lg:rounded-[20px]`}
        />
        <section
          className={`items-stretch flex w-full flex-col bg-[#1E2126] p-2 lg:p-4 rounded-[8px] lg:rounded-[20px]`}
        >
          <h3
            className="text-white text-ellipsis leading-[27px] line-clamp-2 text-base"
            title={event.title}
          >
            {event.title}
          </h3>
          <div className={`text-[#F30C60] text-ellipsis mt-1 text-base`}>
            {t("from")} {price}
          </div>
          <time
            className={`flex items-center gap-1 text-xs text-[#FCFDFD] font-normal leading-none mt-1 `}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-[#FCFDFD] text-ellipsis self-stretch my-auto">{date}</span>
          </time>
        </section>
      </Link>
    </article>
  );
};

export default EventCard;

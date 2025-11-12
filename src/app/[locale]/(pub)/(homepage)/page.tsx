import AllEvents from "@/components/homepage/all-events";
import Banner from "@/components/homepage/banner";
import EventListContainer from "@/components/homepage/event-list-container";
import { getMainEventList } from "@/services/event";
import { Flame } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

// ISR Configuration: Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  // Fetch events from API
  const [featuredEvents, forYouEvents] = await Promise.all([
    getMainEventList({
      page: 1,
      size: 10,
      highlight: 1,
    }),
    getMainEventList(),
  ]);

  return (
    <div>
      <Banner events={featuredEvents.content} />

      <EventListContainer
        title={t("featured_events")}
        icon={<Flame className="text-orange-500" />}
        events={featuredEvents.content}
        useCarousel={true}
      />

      <EventListContainer title={t("for_you")} events={forYouEvents.content} useCarousel={true} />

      <AllEvents events={forYouEvents.content} />
    </div>
  );
}

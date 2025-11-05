import AllEvents from "@/components/homepage/all-events";
import Banner from "@/components/homepage/banner";
import EventListContainer from "@/components/homepage/event-list-container";
import { getQueryClient } from "@/lib/api/query-client";
import { getMeSummary } from "@/services/user";
import { Event } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Flame } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

const revalidate = 60;

export const events: Event[] = [
  {
    id: 1,
    title: "[BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh",
    image: "/event/banner.png",
    date: "2025-01-01",
    price: 100000,
    onlyImage: false,
  },
  {
    id: 2,
    title: "[BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh",
    image: "/event/banner.png",
    date: "2025-01-02",
    price: 200000,
    onlyImage: false,
  },
  {
    id: 3,
    title: "[BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh",
    image: "/event/banner.png",
    date: "2025-01-03",
    price: 300000,
    onlyImage: false,
  },
  {
    id: 4,
    title: "[BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh",
    image: "/event/banner.png",
    date: "2025-01-04",
    price: 400000,
    onlyImage: false,
  },
  {
    id: 5,
    title: "[BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh",
    image: "/event/banner.png",
    date: "2025-01-05",
    price: 500000,
    onlyImage: false,
  },
  {
    id: 6,
    title: "[BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh",
    image: "/event/banner.png",
    date: "2025-01-06",
    price: 600000,
    onlyImage: false,
  },
  {
    id: 7,
    title: "[BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh",
    image: "/event/banner.png",
    date: "2025-01-07",
    price: 700000,
    onlyImage: false,
  },
  {
    id: 8,
    title: "[BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh",
    image: "/event/banner.png",
    date: "2025-01-08",
    price: 800000,
    onlyImage: false,
  },
  {
    id: 9,
    title: "[BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh",
    image: "/event/banner.png",
    date: "2025-01-09",
    price: 900000,
    onlyImage: false,
  },
  {
    id: 10,
    title: "[BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh",
    image: "/event/banner.png",
    date: "2025-01-10",
    price: 10000000,
    onlyImage: false,
  },
];

const categories = ["Tất cả", "Giải trí", "Giáo dục", "Sức khỏe", "Công nghệ"];

export default async function Home(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  const featuredEvents = events.map((event) => ({
    ...event,
    onlyImage: true,
    url: "/events/event-booking",
  }));

  return (
    <div>
      <Banner />

      <EventListContainer
        title={t("featured_events")}
        icon={<Flame className="text-orange-500" />}
        events={featuredEvents}
        useCarousel={true}
      />

      <EventListContainer title={t("for_you")} events={events} useCarousel={true} />

      <AllEvents />
    </div>
  );
}

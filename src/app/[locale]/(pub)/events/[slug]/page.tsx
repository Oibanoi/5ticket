import { Metadata, ResolvingMetadata } from "next";
import EventBooking from "./event-booking";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const revalidate = 600;

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug, locale } = await params;
  const eventTitle = "Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh";
  const eventDescription =
    "Đêm nhạc đặc biệt với sự góp mặt của hai ca sĩ nổi tiếng Minh Tuyết và Phạm Quỳnh Anh tại Khu đô thị Vạn Phúc";
  const eventDate = "05 tháng 09, 2025";
  const eventLocation = "Khu đô thị Vạn Phúc, TP.HCM";

  return {
    title: `${eventTitle} | 5Ticket`,
    description: eventDescription,
    openGraph: {
      title: eventTitle,
      description: eventDescription,
      type: "website",
      siteName: "5Ticket",
      locale: locale,
      images: [
        {
          url: `/events/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: eventTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: eventTitle,
      description: eventDescription,
      images: [`/events/${slug}/opengraph-image`],
    },
  };
}

export default function Page() {
  return <EventBooking />;
}

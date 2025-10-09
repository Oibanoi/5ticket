import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tag } from "antd";
import { albumMapping } from "@/utils/mapping";

interface EventCardProps {
  title?: string;
  date?: string;
  imageCount?: number;
  imageUrl?: string;
  status: string;
}

const EventCardAdmin: React.FC<EventCardProps> = ({
  title,
  date,
  imageCount,
  imageUrl,
  status,
}) => {
  return (
    <div>
      <Card className="h-full flex p-0">
        <CardHeader className="p-0">
          <Image
            src={imageUrl || "/event.png"}
            alt={title || "event"}
            width={600}
            height={400}
            className="rounded-l-lg h-24 max-w-[200px] object-cover"
          />
        </CardHeader>
        <CardContent className="flex flex-col justify-center">
          <CardTitle className="text-xl text-ellipsis truncate whitespace-nowrap overflow-hidden max-w-[500px]">
            {title || "Tên sự kiện"}
          </CardTitle>
          <CardDescription>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Image
                  className="w-4 h-4"
                  src="/icons/date.svg"
                  alt="date"
                  height={30}
                  width={30}
                />
                <span className="pl-1">
                  {new Date(date || "").toLocaleDateString("en-GB") || ""}
                </span>
              </div>
              <Tag
                color={albumMapping[status ?? "unknown"]?.color}
                className="w-fit col-span-3 !rounded-full"
              >
                {albumMapping[status ?? "unknown"]?.text || "Không xác định"}
              </Tag>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCardAdmin;

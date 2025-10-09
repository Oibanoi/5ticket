"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Input, Spin, Dropdown, Menu, message } from "antd";
import { EditOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
// import { Album5pixStatus, AlbumItemResponse, GetAlbumsGetParams } from "@/schemas";
import Link from "next/link";
// import { approveAlbumAlbumsApproveAlbumPost, getAlbumsGet } from "@/services/album/album";
import { useRouter } from "next/navigation";
import EventCardAdmin from "./EvenCardAdmin";
import { Button } from "@/components/ui/button";
interface Album5pixStatus {
  id?: number;
}
interface AlbumItemResponse {
  id: number;
  created_at: string;
}
interface GetAlbumsGetParams {
  id?: number;
  page: number;
  page_size: number;
  album_5pix_status: Album5pixStatus;
}
interface AllEventsAdminProps {
  setEvent: (event: AlbumItemResponse) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  reloadTrigger: number;
  status?: string;
  type: string;
}

const AllEventsAdmin: React.FC<AllEventsAdminProps> = ({
  currentPage,
  setCurrentPage,
  reloadTrigger,
  status,
  type,
}) => {
  const [events, setEvents] = useState<AlbumItemResponse[]>([]);
  const [loading, setLoading] = useState({ fetch: true, approve: false, more: false });
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const router = useRouter();

  const params: GetAlbumsGetParams = useMemo(
    () => ({
      page: currentPage,
      page_size: 10,
      album_5pix_status: status as Album5pixStatus | undefined,
    }),
    [currentPage, status]
  );

  const fetchEvents = useCallback(async () => {
    if (currentPage === 1) setLoading((l) => ({ ...l, fetch: true }));
    setError(null);

    try {
      // const res = await getAlbumsGet(params);
      const res = {
        data: [
          {
            id: 1,
            name: "Sự kiện 1",
            description: "Mô tả sự kiện 1",
            status: "approved",
            created_at: "2021-08-01",
            updated_at: "2021-08-01",
            cover_image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            album_5pix_status: "approved",
          },
          {
            id: 2,
            name: "Sự kiện 2",
            description: "Mô tả sự kiện 2",
            status: "draft",
            created_at: "2021-08-02",
            updated_at: "2021-08-02",
            cover_image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            album_5pix_status: "draft",
          },
          {
            id: 3,
            name: "Sự kiện 3",
            description: "Mô tả sự kiện 3",
            status: "rejected",
            created_at: "2021-08-03",
            updated_at: "2021-08-03",
            cover_image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            album_5pix_status: "rejected",
          },
        ],
        metadata: {
          total_items: 3,
        },
      };
      setEvents((prev) => (currentPage === 1 ? res.data : [...prev, ...res.data]));
      setTotal(res.metadata.total_items);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err ?? "Something went wrong"));
    } finally {
      setLoading((l) => ({ ...l, fetch: false, more: false }));
    }
  }, [params, currentPage]);

  const handleApprove = useCallback(
    async (id: number, action: "approved" | "rejected") => {
      try {
        setLoading((l) => ({ ...l, approve: true }));
        // await approveAlbumAlbumsApproveAlbumPost({ album_id: id, album_5pix_status: action });
        message.success(action === "approved" ? "Đã duyệt album" : "Đã từ chối album");
        fetchEvents();
      } catch (err: unknown) {
        message.error(
          `Xử lý album không thành công: ${err instanceof Error ? err.message : String(err)}`
        );
      } finally {
        setLoading((l) => ({ ...l, approve: false }));
      }
    },
    [fetchEvents]
  );

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, reloadTrigger]);

  if (loading.fetch && currentPage === 1) return <Spin />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Search Input */}
      <Input
        size="large"
        placeholder="Tên album"
        prefix={<SearchOutlined />}
        className="w-full sm:w-1/2 mb-4"
      />

      {/* Events List */}
      <div className="flex flex-col gap-4 py-4">
        {events.length === 0 && <span>Không tìm thấy album</span>}
        {events.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            type={type}
            router={router}
            onApprove={handleApprove}
            loadingApprove={loading.approve}
          />
        ))}
      </div>

      {/* Load More Button */}
      {total && events.length < total && (
        <div className="flex justify-center mt-4">
          <Button
            className="bg-[#0A347D] text-emerald-50 font-bold px-6 py-2"
            onClick={() => {
              setLoading((l) => ({ ...l, more: true }));
              setCurrentPage((p: number) => p + 1);
            }}
          >
            Tải thêm
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllEventsAdmin;
interface EventItemProps {
  event: {
    id: number;
    name?: string;
    description?: string;
    status?: string;
    created_at: string;
    updated_at?: string;
    cover_image?: string;
    album_5pix_status?: string;
    album_name?: string;
    total_image?: number;
    album_image_url?: string;
  };
  type: string;
  router: ReturnType<typeof useRouter>;
  onApprove: (id: number, action: "approved" | "rejected") => void;
  loadingApprove: boolean;
}
/** Item tách riêng để tránh re-render toàn bộ list */
const EventItem = React.memo(function EventItem({
  event,
  type,
  router,
  onApprove,
  loadingApprove,
}: EventItemProps) {
  const items = [
    {
      key: "edit",
      label: "Chỉnh sửa",
      onClick: () => router.push(`/events/${event.id}/update`),
    },
  ];
  return (
    <div className="relative bg-white shadow-md rounded-lg">
      <Link href={`/events/${event.id}`}>
        <EventCardAdmin
          title={event.album_name}
          date={event.created_at}
          imageCount={event.total_image ?? 0}
          imageUrl={event.album_image_url}
          status={event.album_5pix_status ?? ""}
        />
      </Link>
      <div className="absolute right-0 top-0 flex items-center gap-2 h-full p-4">
        <div className="hidden sm:block lg:hidden">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button className="bg-transparent hover:bg-gray-200">
              <MoreOutlined />
            </Button>
          </Dropdown>
        </div>
        {event.album_5pix_status === "waiting_for_approve" && type === "admin" && (
          <>
            <Button
              className="h-8 text-[#2563EB] border-[#2563EB] rounded-3xl font-bold hidden sm:inline-flex text-sm"
              onClick={() => onApprove(event.id, "rejected")}
            >
              Từ chối
            </Button>
            <Button
              className="h-8 text-[#2563EB] border-[#2563EB] rounded-3xl font-bold hidden sm:inline-flex text-sm"
              onClick={() => onApprove(event.id, "approved")}
            >
              Duyệt
            </Button>
          </>
        )}
        <Button
          variant="outline"
          className="h-8 text-blue-normal border-blue-normal rounded-3xl font-bold hidden sm:inline-flex text-sm"
          onClick={() => router.push(`/events/${event.id}/update`)}
        >
          <EditOutlined />
          Chỉnh sửa
        </Button>
      </div>
    </div>
  );
});

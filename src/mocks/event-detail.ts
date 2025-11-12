import { EventDetail } from "@/types";

export const mockEventDetail: EventDetail = {
  id: 1,
  name: "[BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh",
  wall_paper_url: "/mock-event.png",
  start_date: "2025-09-05",
  base_price: 279000,
  location: "Khu đô thị Vạn Phúc, Phường Hiệp Bình Phước, Quận Thủ Đức, Thành Phố Hồ Chí Minh",
  description: `Lorem ipsum dolor sit amet consectetur. Tincidunt cursus mattis at commodo tempor turpis vitae duis porttitor. Consequat potenti lobortis vitae urna rhoncus elit massa eget sit. Cursus tristique blandit id enim facilisi tincidunt. Erat dolor massa viverra gravida habitasse eget dictum at pellentesque. Eget erat odio aliquam tristique est suspendisse. Ut ultrices mi semper nascetur sed pretium. Auctor in vestibulum mauris porta risus. Mi sed nibh sed rhoncus duis nulla vitae et nulla. Consequat malesuada sit faucibus urna dictumst quis euismod.`,
  gallery: ["/mock-event.png"],
  event_days: [
    {
      id: "day1",
      date: "2025-08-27",
      displayDate: "Ngày 1 (27/08/2025)",
      tickets: [
        {
          id: "ticket1",
          name: "SVIP1",
          price: 10000000,
          available: false,
          description:
            "Lorem ipsum dolor sit amet consectetur. Morbi fringilla nunc vestibulum leo orci.",
        },
        {
          id: "ticket2",
          name: "SVIP2",
          price: 10000000,
          available: true,
          description:
            "Lorem ipsum dolor sit amet consectetur. Pellentesque sed tellus bibendum nulla eget.",
        },
      ],
    },
    {
      id: "day2",
      date: "2025-08-28",
      displayDate: "Ngày 2 (28/08/2025)",
      tickets: [],
    },
  ],
};

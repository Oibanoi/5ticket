import { TicketOption } from "@/components/ticket-select";

export const mockTickets: TicketOption[] = [
  {
    id: "svip1",
    name: "SVIP1",
    price: 10000000,
    available: true,
    description: "Khu vực SVIP - Gần sân khấu nhất, tầm nhìn tốt nhất, có ghế ngồi riêng",
    icon: "https://api.builder.io/api/v1/image/assets/529d3b81387b41eeaf6fa3a235eae961/3da8e77856b1c12fdddb00bba20d13932ba0ffe7?placeholderIfAbsent=true",
  },
  {
    id: "svip2",
    name: "SVIP2",
    price: 8000000,
    available: true,
    description: "Khu vực SVIP - Vị trí đẹp, gần sân khấu, có ghế ngồi",
    icon: "https://api.builder.io/api/v1/image/assets/529d3b81387b41eeaf6fa3a235eae961/3da8e77856b1c12fdddb00bba20d13932ba0ffe7?placeholderIfAbsent=true",
  },
  {
    id: "vip",
    name: "VIP",
    price: 5000000,
    available: false,
    description: "Khu vực VIP - Tầm nhìn tốt, không gian thoải mái",
    icon: "https://api.builder.io/api/v1/image/assets/529d3b81387b41eeaf6fa3a235eae961/3da8e77856b1c12fdddb00bba20d13932ba0ffe7?placeholderIfAbsent=true",
  },
  {
    id: "standard",
    name: "Standard",
    price: 2000000,
    available: true,
    description: "Khu vực thường - Giá cả phải chăng, phù hợp với mọi đối tượng",
    icon: "https://api.builder.io/api/v1/image/assets/529d3b81387b41eeaf6fa3a235eae961/3da8e77856b1c12fdddb00bba20d13932ba0ffe7?placeholderIfAbsent=true",
  },
];

export const mockEventInfo = {
  title: "[BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh",
  date: "05 tháng 09, 2025",
  location: "Khu đô thị Vạn Phúc, Phường Hiệp Bình Phước, Quận Thủ Đức, Thành Phố Hồ Chí Minh",
  imageUrl:
    "https://api.builder.io/api/v1/image/assets/529d3b81387b41eeaf6fa3a235eae961/55ad48edaf382914680acd9d887f4f3af845793f?placeholderIfAbsent=true",
};

// Helper to get ticket by id
export const getTicketById = (id: string): TicketOption | undefined => {
  return mockTickets.find((ticket) => ticket.id === id);
};

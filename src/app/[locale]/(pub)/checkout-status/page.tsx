"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckoutStatusSuccess } from "@/components/checkout-status";
import { LoadingSpinner } from "@/components/common/LoadingAnimation";

// Mock data - this would come from API/localStorage in production
const mockData = {
  userEmail: "username@email.com",
  ticketInfo: {
    quantity: 2,
    ticketType: "SVIP1",
    price: 5000000,
  },
  eventInfo: {
    title: "[BẾN THÀNH] Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh",
    date: "05 tháng 09, 2025",
    location: "Khu đô thị Vạn Phúc, Phường Hiệp Bình Phước, Quận Thủ Đức, Thành Phố Hồ Chí Minh",
  },
  purchaseInfo: {
    fullName: "Nguyễn Văn Anh",
    birthDate: "11/01/1991",
    idNumber: "037099000909",
  },
  transactionInfo: {
    subtotal: 10000000,
    discount: 0,
    total: 10000000,
    status: "success" as const,
    transactionTime: "15:10 - 14/08/2025",
    transactionId: "#5TICKET12487",
    paymentMethod: "Quét QR chuyển khoản ngân hàng",
  },
};

export default function CheckoutStatusPage() {
  const router = useRouter();
  const [data, setData] = useState<typeof mockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and fetching data
    const timer = setTimeout(() => {
      // In production, you would fetch data from API or localStorage here
      // Check if we have checkout data from localStorage
      if (typeof window !== "undefined") {
        const checkoutData = localStorage.getItem("checkoutData");
        if (checkoutData) {
          // Process and use real data
          setData(mockData); // For now, use mock data
        } else {
          // No checkout data found, redirect to home
          // router.push("/");
          // return;

          // For demo purposes, still show mock data
          setData(mockData);
        }
      } else {
        setData(mockData);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size={128} />
      </div>
    );
  }

  return (
    <CheckoutStatusSuccess
      userEmail={data.userEmail}
      ticketInfo={data.ticketInfo}
      eventInfo={data.eventInfo}
      purchaseInfo={data.purchaseInfo}
      transactionInfo={data.transactionInfo}
    />
  );
}

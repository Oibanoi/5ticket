"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { QueueStatus } from "@/components/waiting-room";

export default function WaitingRoomPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const ticketId = searchParams.get("ticketId");

  const handleQueueComplete = () => {
    // Sau khi qua waiting room, chuyển đến checkout
    if (ticketId) {
      router.push(`/${params.locale}/checkout`);
    } else {
      router.push(`/${params.locale}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center p-4">
      <QueueStatus
        initialPosition={256}
        initialTime="04:20s"
        onQueueComplete={handleQueueComplete}
      />
    </div>
  );
}

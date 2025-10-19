import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface UseWaitingRoomOptions {
  eventId?: string;
  initialPosition?: number;
}

/**
 * Hook to handle waiting room navigation and queue management
 *
 * @example
 * const { enterWaitingRoom } = useWaitingRoom({ eventId: "123" });
 *
 * const handleBuyTicket = () => {
 *   enterWaitingRoom();
 * };
 */
export const useWaitingRoom = (options?: UseWaitingRoomOptions) => {
  const router = useRouter();

  const enterWaitingRoom = useCallback(() => {
    const params = new URLSearchParams();

    if (options?.eventId) {
      params.set("eventId", options.eventId);
    }

    if (options?.initialPosition) {
      params.set("position", options.initialPosition.toString());
    }

    router.push(`/waiting-room?${params.toString()}`);
  }, [router, options?.eventId, options?.initialPosition]);

  const exitWaitingRoom = useCallback(() => {
    router.back();
  }, [router]);

  return {
    enterWaitingRoom,
    exitWaitingRoom,
  };
};

export default useWaitingRoom;

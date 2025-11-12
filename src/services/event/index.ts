import api from "@/lib/api";
import logger from "@/lib/logger";
import { MainEvent, MainEventListResponse } from "@/types";

/**
 * Fetch main events list from API
 * @param pageNo - Page number (1-indexed)
 * @param pageSize - Number of items per page
 * @param sortField - Field to sort by
 * @param sortDirection - Sort direction (ASC or DESC)
 */
export async function getMainEventList(params?: {
  page?: number;
  size?: number;
  sort?: string;
  direction?: "ASC" | "DESC";
  highlight?: number;
}): Promise<MainEventListResponse> {
  try {
    // Set default values
    const { page = 1, size = 10, sort = "id", direction = "ASC", highlight = 0 } = params || {};
    const response = await api.get("/pub/main-event/list", {
      params: {
        page,
        size,
        sort,
        direction,
        highlight,
      },
    });

    const apiData = response.data?.data;

    if (!apiData || !apiData.content) {
      throw new Error("Invalid API response structure");
    }

    logger.info(`[Event Service] Fetched ${apiData.content.length} events`);
    return apiData;
  } catch (error) {
    logger.error("[Event Service] Failed to fetch events:", error);
    throw error;
  }
}

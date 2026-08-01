"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

export async function deleteComment(commentId: number) {
  try {
    const url = API_ENDPOINTS.product.deleteComment(commentId.toString());

    const response = await fetchWithAuth(url, "DELETE");

    if (!response.success) {
      console.error(
        `deleteComment Error: ${response.message}`,
        response.status,
      );

      return {
        success: false,
        message: response.message || "Was not able to delete comment",
      };
    }

    return { success: true, data: response.data };
  } catch (e: unknown) {
    console.error("deleteComment Error:", e);
    return {
      success: false,
      message: e instanceof Error ? e.message : "Unexpected error occurred",
    };
  }
}

"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

export async function replyOnComment(
  productId: number,
  parentId: number,
  description: string,
) {
  try {
    const url = API_ENDPOINTS.product.replyOnComment(productId.toString());

    const body = {
      parentId,
      description,
    };

    const response = await fetchWithAuth(url, "POST", JSON.stringify(body), {
      "Content-Type": "application/json",
    });

    if (!response.success) {
      console.error(
        `Error in createComment: ${response.message}, status: ${response.status}`,
      );

      return { success: false, message: response.message };
    }

    return { success: true, data: response.data };
  } catch (e: unknown) {
    console.error("createComment Error:", e);
    return {
      success: false,
      message: e instanceof Error ? e.message : "Unexpected error occurred",
    };
  }
}

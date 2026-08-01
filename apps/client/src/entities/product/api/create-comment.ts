"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

interface CreateCommentDto {
  rate: number;
  description?: string;
}

export async function createComment(productId: number, data: CreateCommentDto) {
  try {
    const url = API_ENDPOINTS.product.createComment(productId.toString());

    const response = await fetchWithAuth(url, "POST", JSON.stringify(data), {
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

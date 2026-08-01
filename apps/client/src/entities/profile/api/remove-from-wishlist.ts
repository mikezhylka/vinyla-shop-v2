"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

export async function removeFromWishlist(id: number) {
  try {
    const response = await fetchWithAuth(
      API_ENDPOINTS.profile.removeFromWishlist(id.toString()),
      "DELETE",
    );

    if (!response.success) {
      console.error(`removeFromWishlist error: ${response.message}`);

      return {
        success: false,
        message: response.message || "Failed to remove from wishlist.",
      };
    }

    return { success: true };
  } catch (e: unknown) {
    console.error(e);

    return {
      success: false,
      message: e instanceof Error ? e.message : "An unexpected error occurred",
    };
  }
}

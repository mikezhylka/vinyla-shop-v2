"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

export async function getWishlistIds() {
  const response = await fetchWithAuth(
    API_ENDPOINTS.profile.getWishlistIds,
    "GET",
  );

  if (!response.success) {
    console.error(`getWishlistIds Error: ${response.message}`);

    return {
      success: false,
      message: response.message || "Failed to get wishlist ids",
      status: response.status,
    };
  }

  return {
    success: true,
    data: response.data,
  };
}

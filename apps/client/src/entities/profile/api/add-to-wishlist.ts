"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

export async function addToWishlist(id: number) {
  const response = await fetchWithAuth(
    API_ENDPOINTS.profile.addToWishlist(id.toString()),
    "POST",
  );

  if (!response.success) {
    console.error(`addToWishlist Error: ${response.message}`, response.status);

    return {
      success: false,
      message: response.message || "Was not able to add product to wishlist",
    };
  }

  return {
    success: true,
  };
}

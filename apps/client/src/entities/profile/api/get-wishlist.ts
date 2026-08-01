"use server";

import { Product } from "@/entities/product";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

export async function getWishlist(): Promise<{
  success: boolean;
  data?: Product[];
  message?: string;
}> {
  const response = await fetchWithAuth(
    API_ENDPOINTS.profile.getWishlist,
    "GET",
  );

  if (!response.success) {
    console.error(`getWishlist Error: ${response.message}`);
    return {
      success: false,
      message: response.message || "Failed to load wishlist.",
    };
  }

  return {
    success: true,
    data: response.data,
  };
}

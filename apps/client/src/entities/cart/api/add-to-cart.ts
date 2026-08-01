"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";
import { revalidatePath } from "next/cache";

export async function addToCart(id: number) {
  const response = await fetchWithAuth(
    API_ENDPOINTS.cart.add(id.toString()),
    "POST",
  );

  if (!response.success) {
    console.error(`Add to Cart Error: ${response.message}`, response.status);

    return {
      success: false,
      message: response.message || "Was not able to add product to cart",
    };
  }

  revalidatePath("/cart");

  return {
    success: true,
    data: response.data,
  };
}

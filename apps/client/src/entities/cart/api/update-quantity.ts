"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";
import { revalidatePath } from "next/cache";

export async function updateCartQuantity(id: number, quantity: number) {
  const response = await fetchWithAuth(
    API_ENDPOINTS.cart.updateQuantity(id.toString()),
    "PATCH",
    { quantity }
  );

  if (!response.success) {
    console.error(`Update Cart Quantity Error: ${response.message}`, response.status);

    return {
      success: false,
      message: response.message || "Was not able to update quantity",
    };
  }

  revalidatePath("/cart");

  return {
    success: true,
    data: response.data,
  };
}

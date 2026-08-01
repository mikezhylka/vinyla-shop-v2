"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";
import { revalidatePath } from "next/cache";

export async function deleteFromCart(id: number) {
  try {
    const response = await fetchWithAuth(
      API_ENDPOINTS.cart.delete(id.toString()),
      "DELETE",
    );

    if (!response.success) {
      console.error(`removeFromCart error: ${response.message}`);

      return {
        success: false,
        message: response.message || "Failed to remove from cart.",
      };
    }

    revalidatePath("/cart");

    return { success: true, data: response.data };
  } catch (e: unknown) {
    console.error(e);

    return {
      success: false,
      message: e instanceof Error ? e.message : "An unexpected error occurred",
    };
  }
}

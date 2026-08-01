import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";
import { CartItemResponse } from "@monorepo/shared-types";

export async function getCart(): Promise<{
  success: boolean;
  data?: CartItemResponse[];
  message?: string;
  status?: number;
}> {
  const response = await fetchWithAuth(API_ENDPOINTS.cart.get, "GET");

  if (!response.success) {
    console.error(`GET Cart Error: ${response.message}`);
    return {
      success: false,
      message: response.message || "Failed to load cart.",
      status: response.status,
    };
  }

  return {
    success: true,
    data: response.data,
  };
}

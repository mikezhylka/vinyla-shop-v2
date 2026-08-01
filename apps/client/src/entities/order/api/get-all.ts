import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

export async function getOrders() {
  const response = await fetchWithAuth(API_ENDPOINTS.order.getAll, "GET");

  if (!response.success) {
    return { success: false, message: response.message };
  }

  return { success: true, data: response.data };
}

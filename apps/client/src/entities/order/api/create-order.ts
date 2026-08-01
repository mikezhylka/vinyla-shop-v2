"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

export async function createOrder(createOrderDto: any) {
  const response = await fetchWithAuth(
    API_ENDPOINTS.order.create,
    "POST",
    createOrderDto,
  );

  if (!response.success) {
    return { success: false, message: response.message };
  }

  return { success: true, data: response.data };
}

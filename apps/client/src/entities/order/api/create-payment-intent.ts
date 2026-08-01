"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

export async function createPaymentIntent() {
  const clientSecret = await fetchWithAuth(
    API_ENDPOINTS.order.createPaymentIntent,
    "POST",
  );

  if (clientSecret.data) {
    return { success: true, data: clientSecret.data.clientSecret };
  }

  return { success: false, message: "Failed to load client secret" };
}

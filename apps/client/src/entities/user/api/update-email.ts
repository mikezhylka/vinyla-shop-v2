"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

export async function updateEmailAction(email: string) {
  const response = await fetchWithAuth(
    API_ENDPOINTS.user.updateEmail,
    "PATCH",
    JSON.stringify({ email: email }),
    {
      "Content-Type": "application/json",
    },
  );

  if (!response.success) {
    console.error(`Update Email Error: ${response.message}`);

    return {
      success: false,
      message: response.message || "Failed to update email.",
    };
  }

  return { success: true, data: response.data };
}

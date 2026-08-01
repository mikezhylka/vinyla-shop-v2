"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

export async function updateNameAction(name: string) {
  try {
    const response = await fetchWithAuth(
      API_ENDPOINTS.profile.updateName,
      "PATCH",
      JSON.stringify({ name: name }),
      {
        "Content-Type": "application/json",
      },
    );

    if (!response.success) {
      console.error(`Update name Error: ${response.message}`, response.status);

      return {
        success: false,
        message: response.message || "Was not able to update name",
      };
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

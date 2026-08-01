"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

export async function updatePasswordAction(passwords: {
  currentPassword: string;
  newPassword: string;
}) {
  const response = await fetchWithAuth(
    API_ENDPOINTS.user.updatePassword,
    "PATCH",
    JSON.stringify(passwords),
    {
      "Content-Type": "application/json",
    },
  );

  if (!response.success) {
    console.error(`updatePassword Error: ${response.message}`);

    return {
      success: false,
      message: response.message || "Failed to update password.",
    };
  }

  return { success: true };
}

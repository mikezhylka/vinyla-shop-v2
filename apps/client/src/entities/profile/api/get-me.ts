"use server";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";
import { Profile } from "../model/types";

export async function getMe(): Promise<{
  success: boolean;
  data?: Profile;
  message?: string;
}> {
  const response = await fetchWithAuth(API_ENDPOINTS.profile.me, "GET");

  if (!response.success) {
    console.error(`Get profile Error: ${response.message}`);

    return {
      success: false,
      message: response.message || "Failed to load profile.",
    };
  }

  return {
    success: true,
    data: response.data,
  };
}

import { API_ENDPOINTS } from "@/shared/api/endpoints";

export async function getRecommendations(productId: string) {
  const response = await fetch(
    API_ENDPOINTS.catalog.recommendations(productId),
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Unable to load recommendations.");
  }

  return await response.json();
}

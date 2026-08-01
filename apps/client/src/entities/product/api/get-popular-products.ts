import { API_ENDPOINTS } from "@/shared/api/endpoints";

export default async function getPopularProducts() {
  const response = await fetch(API_ENDPOINTS.catalog.getPopularProducts, {
    method: "GET",
  });

  if (!response.ok) {
    return { success: false, message: "Could not get popular products." };
  }

  return { success: true, data: await response.json() };
}

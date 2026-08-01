import { Product } from "../model/types";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export async function searchProducts(query?: string): Promise<{
  success: boolean;
  message?: string;
  data?: Product[];
  meta?: { total: number; page: number; pageCount: number; pageSize: number };
}> {
  const url = query
    ? `${API_ENDPOINTS.catalog.search}?${query}`
    : API_ENDPOINTS.catalog.search;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return { success: false, message: "Failed to fetch products." };
  }

  const result = await response.json();

  const { data, meta } = result;

  return { success: true, data, meta };
}

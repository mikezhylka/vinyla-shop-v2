import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { Genre } from "../model/types";

export async function getGenres(): Promise<Genre[]> {
  const response = await fetch(API_ENDPOINTS.catalog.getGenres, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch genres.");
  }

  return await response.json();
}

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { Product } from "../model/types";

export async function getProduct(id: string) {
  try {
    const response = await fetch(API_ENDPOINTS.product.get(id));

    if (!response.ok) {
      throw new Error(`Failed to fetch product. Status: ${response.status}`);
    }

    const data: Product = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching product:", error);

    return null;
  }
}

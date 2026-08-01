import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";

export async function clearCart() {
    const response = await fetchWithAuth(API_ENDPOINTS.cart.clear, "DELETE");

    if (!response.success) {
        return { success: false, message: response.message };
    }

    return { success: true, data: response.data };
}
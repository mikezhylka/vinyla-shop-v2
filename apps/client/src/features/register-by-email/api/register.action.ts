import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { CreateUserDto } from "@monorepo/shared-types/schemas/user.schema";

export async function registerAction(registerForm: CreateUserDto) {
  try {
    const response = await fetch(API_ENDPOINTS.auth.register, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerForm),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message);
    }

    return { success: true, message: data.message };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Registration failed",
    };
  }
}

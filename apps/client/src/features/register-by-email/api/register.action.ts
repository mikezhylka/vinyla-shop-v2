import { setAuthCookies } from "@/entities/session";
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

    const { profile, access, refresh } = data;

    await setAuthCookies({ access, refresh });

    return { success: true, profile };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Registration failed",
    };
  }
}

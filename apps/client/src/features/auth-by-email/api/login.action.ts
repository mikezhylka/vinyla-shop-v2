import { setAuthCookies } from "@/entities/session";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { LoginDto } from "@monorepo/shared-types/schemas/user.schema";

export async function loginAction(loginForm: LoginDto) {
  try {
    const response = await fetch(API_ENDPOINTS.auth.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message);
    }

    const { profile, access, refresh } = data;

    await setAuthCookies({ access, refresh });

    return { success: true, profile: profile };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Wrong email or password",
    };
  }
}

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Function to check if JWT is expired
function isTokenExpired(token: string) {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedJson = atob(payloadBase64);
    const payload = JSON.parse(decodedJson);

    // Add 10 seconds leeway for network latency
    const isExpired = payload.exp * 1000 < Date.now() - 10000;
    return isExpired;
  } catch (e) {
    return true;
  }
}

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAccessValid = accessToken && !isTokenExpired(accessToken);

  // 1. If token exists and is valid — let it pass
  if (isAccessValid) {
    return NextResponse.next();
  }

  // 2. If token doesn't exist or is EXPIRED, but refresh token exists — try to refresh
  if (!isAccessValid && refreshToken) {
    try {
      // Use API_URL from environment variables for production fallback
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (res.ok) {
        const data = await res.json();

        // Update request for server components
        request.cookies.set("accessToken", data.access.token);
        request.cookies.set("refreshToken", data.refresh.token);

        // Build response with updated headers
        const response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });

        const accessMaxAge = Math.floor(
          (new Date(data.access.expiresAt).getTime() - Date.now()) / 1000,
        );

        const refreshMaxAge = Math.floor(
          (new Date(data.refresh.expiresAt).getTime() - Date.now()) / 1000,
        );

        // Set cookie for browser
        response.cookies.set({
          name: "accessToken",
          value: data.access.token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: accessMaxAge,
          path: "/",
        });

        response.cookies.set({
          name: "refreshToken",
          value: data.refresh.token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: refreshMaxAge,
          path: "/",
        });

        return response;
      }
    } catch (error) {
      console.error("Middleware error:", error);
    }
  }

  // 3. Check protected routes
  const protectedRoutes = ["/profile", "/dashboard", "/settings"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

"use server";

import { cookies } from "next/headers";
import { AuthCookies } from "../model/types";

export async function setAuthCookies(authCookies: AuthCookies) {
  const { access, refresh } = authCookies;
  const cookieStore = await cookies();

  cookieStore.set("refreshToken", refresh.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(refresh.expiresAt),
  });

  cookieStore.set("accessToken", access.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(access.expiresAt),
  });
}

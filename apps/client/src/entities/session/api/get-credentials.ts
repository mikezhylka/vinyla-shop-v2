"use server";

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { refreshAction } from "./refresh";

export async function getCredentials(cookieStore: ReadonlyRequestCookies) {
  let accessCookie = cookieStore.get("accessToken");

  if (!accessCookie) {
    const res = await refreshAction();

    if (res.error) {
      return { status: false, message: res.error };
    }

    const freshCookieStore = await cookies();

    accessCookie = freshCookieStore.get("accessToken");

    if (!accessCookie) {
      return { status: false, message: "Unathorized" };
    }
  }

  return { status: true, message: accessCookie.value };
}

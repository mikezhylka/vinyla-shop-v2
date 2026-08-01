import { getCredentials } from "@/entities/session/api/get-credentials";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies();
  const { message: accessToken } = await getCredentials(cookieStore);

  const formData = await req.formData();

  const url = API_ENDPOINTS.profile.updateAvatar;

  const response = await fetch(`${API_ENDPOINTS.profile.updateAvatar}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json(data);
}

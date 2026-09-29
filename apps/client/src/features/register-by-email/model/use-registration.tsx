// import { useAppDispatch } from "@/shared/lib/store/hooks";
import { CreateUserDto } from "@monorepo/shared-types/schemas/user.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerAction } from "../api/register.action";

export function useRegistration() {
  const [serverError, setServerError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  // const dispatch = useAppDispatch();

  async function onSubmit(data: CreateUserDto) {
    setIsLoggingIn(true);
    setServerError("");

    try {
      const result = await registerAction(data);

      if (result.success) {
        sessionStorage.setItem("verification_email", data.email);
        router.push("/verify");
      }

      return { success: result.success, message: result.message };
    } catch (error: unknown) {
      return { success: false };
    } finally {
    }
  }

  return { serverError, isLoggingIn, onSubmit };
}

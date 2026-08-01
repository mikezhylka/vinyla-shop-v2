import { useAppDispatch } from "@/shared/lib/store/hooks";
import { CreateUserDto } from "@monorepo/shared-types/schemas/user.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerAction } from "../api/register.action";
import { updateProfile } from "@/entities/profile/model/slice";

export function useRegistration() {
  const [serverError, setServerError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function onSubmit(data: CreateUserDto) {
    setIsLoggingIn(true);
    setServerError("");

    try {
      const result = await registerAction(data);

      if (result.success && result.profile) {
        localStorage.setItem("profile", JSON.stringify(result.profile));
        dispatch(updateProfile(result.profile));
        router.push("/");
      } else {
        setServerError(result.error || "Registration failed.");
      }
    } catch (err) {
      setServerError("Something went wrong.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  return { onSubmit, serverError, isLoggingIn };
}

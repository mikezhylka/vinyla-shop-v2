"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAction } from "../api/login.action";
import { LoginFormValues } from "./schema";
import { setLocalUserData } from "@/shared/lib/handlers/setLocalUserData";
import { useDispatch } from "react-redux";
import { sendVerificationEmail } from "@/entities/user/api/send-verification-email";

export function useLogin() {
  const [serverError, setServerError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  async function onSubmit(data: LoginFormValues) {
    setIsLoggingIn(true);
    setServerError("");

    try {
      const result = await loginAction(data);

      if (result.success) {
        setLocalUserData(dispatch, { profile: result.profile });

        router.push("/");
      } else {
        if (result.error === "EMAIL_NOT_VERIFIED") {
          sessionStorage.setItem("verification_email", data.email);
          await sendVerificationEmail(data.email);
          router.push("/verify");
        } else {
          setServerError("Wrong email or password.");
        }
      }
    } catch (err) {
      setServerError("Something went wrong.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  return { onSubmit, serverError, isLoggingIn };
}

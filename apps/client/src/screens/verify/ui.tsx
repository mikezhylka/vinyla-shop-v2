"use client";

import { useState } from "react";
import { verifyCode as verifyCodeAction } from "@/entities/user/api/verify-code";
import { useRouter } from "next/navigation";
import { setLocalUserData } from "@/shared/lib/handlers/setLocalUserData";
import { useDispatch } from "react-redux";
import { sendVerificationEmail } from "@/entities/user/api/send-verification-email";
import { AuthBanner } from "../login/components/auth-banner";
import LoginLoader from "@/shared/ui/login-loader/ui";

export default function VerifyPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isResendActivated, setIsResendActivated] = useState(false);
  const [isResended, setIsResended] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyCode = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsVerifying(true);
    setError("");

    const email = sessionStorage.getItem("verification_email") || "";
    const verifyCodeDto = { code: code, email: email };
    const result = await verifyCodeAction(verifyCodeDto);

    setIsVerifying(false);

    if (result.success) {
      setLocalUserData(dispatch, { profile: result.profile });
      router.push("/");
    } else if (result.code === "VERIFICATION_CODE_EXPIRED") {
      setCode("");
      setIsResendActivated(true);
    } else if (result.code === "INVALID_VERIFICATION_CODE") {
      setError(result.message);
    } else {
      setError(result.message || "An unexpected error occurred.");
    }
  };

  const resendCode = async function (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    setIsResendActivated(false);
    setError("");

    const email = sessionStorage.getItem("verification_email") || "";
    const result = await sendVerificationEmail(email);

    if (result.success) {
      setIsResended(true);
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="grow flex flex-col md:flex-row min-h-screen bg-body-background text-white">
      <AuthBanner />

      <section className="flex-1 flex items-center justify-center p-8 md:p-16 relative">
        <div className="w-full max-w-sm z-10 animate-on-scroll">
          <div className="mb-10">
            <h3 className="h3 font-bold mb-3">Verify your email</h3>
            <p className="small-text text-neutral-gray">
              We have sent a 6-digit code to your email address. Please enter it
              below to continue.
            </p>
          </div>

          <form onSubmit={verifyCode} className="space-y-5">
            <div className="flex flex-col gap-1">
              <label className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-outline">
                Verification Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setError("");
                    setCode(e.target.value);
                  }}
                  placeholder="Enter 6-digit code"
                  className={`input peer w-full pr-10 ${
                    error ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isVerifying || code.trim().length === 0}
                className="btn-primary w-full h-14 flex items-center justify-center gap-2 group hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <LoginLoader />
                ) : (
                  <>
                    VERIFY EMAIL
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm">
                      →
                    </span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <h3 className="text-red-500 small-text mt-4 text-center font-medium">
                {error}
              </h3>
            )}
          </form>

          {isResendActivated && (
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="small-text text-neutral-gray mb-4">
                The code you provided has expired.
              </p>
              <button
                onClick={(e) => resendCode(e)}
                className="small-text font-semibold text-white hover:underline decoration-neutral-gray underline-offset-4 cursor-pointer"
              >
                Resend verification code
              </button>
            </div>
          )}

          {isResended && (
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="small-text text-green-500">
                Code sent successfully! Please check your inbox.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

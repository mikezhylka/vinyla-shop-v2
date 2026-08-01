"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import Input from "@/shared/ui/input/ui";
import LoginLoader from "@/shared/ui/login-loader/ui";
import { LoginFormValues, loginSchema } from "../model/schema";
import { useLogin } from "../model/use-login";

export function LoginForm() {
  const { onSubmit, serverError, isLoggingIn } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <Input
        name="email"
        label="Email"
        register={register}
        error={errors.email}
        placeholder="name@example.com"
      />

      {/* Password & Forgot Link */}
      <div className="space-y-1">
        <Input
          name="password"
          label="Password"
          type="password"
          register={register}
          error={errors.password}
          placeholder="••••••"
        />
        {/* <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="small-text text-neutral-gray hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Forgot Password?
          </Link>
        </div> */}
      </div>

      {/* Remember Me Checkbox */}
      {/* <div className="flex items-center gap-3 py-2">
        <input
          type="checkbox"
          id="remember"
          className="w-4 h-4 rounded bg-surface-container-lowest border-white/20 text-white focus:ring-white/20 cursor-pointer accent-white"
        />
        <label
          htmlFor="remember"
          className="small-text text-neutral-gray cursor-pointer select-none"
        >
          Keep me signed in for easier checkout
        </label>
      </div> */}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoggingIn}
          className="btn-primary w-full h-14 flex items-center justify-center gap-2 group hover:cursor-pointer"
        >
          {isLoggingIn ? (
            <LoginLoader />
          ) : (
            <>
              SIGN IN TO SHOP
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm">
                →
              </span>
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {serverError && (
        <h3 className="text-red small-text mt-4 text-center font-medium">
          {serverError}
        </h3>
      )}
    </form>
  );
}

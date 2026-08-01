"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Input from "@/shared/ui/input/ui";
import {
  CreateUserDto,
  CreateUserSchema,
} from "@monorepo/shared-types/schemas/user.schema";
import { useRegistration } from "../model/use-registration";

export function RegistrationForm() {
  const { onSubmit, serverError, isLoggingIn } = useRegistration();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        name="name"
        label="Name"
        placeholder="Benjamin"
        required
        register={register}
        error={errors.name}
      />

      <Input
        name="email"
        label="Email"
        placeholder="benjamin@gmail.com"
        type="email"
        required
        register={register}
        error={errors.email}
      />

      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        required
        register={register}
        error={errors.password}
      />

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoggingIn}
          className="btn-primary w-full h-14 flex items-center justify-center gap-2 group hover:cursor-pointer"
        >
          {isLoggingIn ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          {!isLoggingIn && (
            <span className="group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          )}
        </button>
      </div>
      {serverError && (
        <h3 className="text-red small-text mt-4 text-center font-medium">
          {serverError}
        </h3>
      )}

      {/* Social Media */}
      {/* <div className="flex items-center gap-4 py-4">
        <div className="h-px grow bg-white/20"></div>
        <span className="text-[10px] text-neutral-gray uppercase tracking-widest">
          or register with
        </span>
        <div className="h-px grow bg-white/20"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="h-12 border border-white/20 rounded-full flex items-center justify-center gap-2 small-text text-white hover:bg-cart-background transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.02 1.024-2.424 1.816-4.84 1.816-3.872 0-7.072-3.12-7.072-6.992s3.2-6.992 7.072-6.992c2.128 0 3.756.816 4.912 1.908l2.312-2.312C18.412 1.54 15.824.5 12.48.5 6.444.5 1.556 5.312 1.556 11.388s4.888 10.888 10.924 10.888c3.26 0 5.736-1.056 7.648-3.032 1.972-1.972 2.592-4.74 2.592-7.024 0-.468-.036-.924-.112-1.3H12.48z"></path>
          </svg>
          Google
        </button>
        <button
          type="button"
          className="h-12 border border-white/20 rounded-full flex items-center justify-center gap-2 small-text text-white hover:bg-cart-background transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
          </svg>
          Github
        </button>
      </div> */}
    </form>
  );
}

"use client";

import { updatePasswordAction } from "@/entities/user/api/update-password";
import { useTemporarySuccess } from "@/shared/lib/hooks/use-temporary-success";
import Input from "@/shared/ui/input/ui";
import { SuccessMessage } from "@/shared/ui/success-message/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  updatePasswordDefaultValues,
  UpdatePasswordFormValues,
  updatePasswordSchema,
} from "./_schemas/security.schema";

export default function Security() {
  const { isSuccess, setIsSuccess } = useTemporarySuccess();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: updatePasswordDefaultValues,
  });

  async function onSubmit(data: UpdatePasswordFormValues) {
    const { repeatedNewPassword, ...passwords } = data;

    try {
      const result = await updatePasswordAction(passwords);

      if (!result.success) {
        throw new Error("Provided password is wrong.");
      }

      setIsSuccess(true);

      reset();
    } catch (error: any) {
      setIsSuccess(false);
    }
  }

  return (
    <section className="grid grid-cols-1 gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <h2 className="font-headline mb-2 text-2xl font-bold uppercase tracking-tight text-white">
          Security
        </h2>
        <p className="text-sm font-light text-on-surface-variant">
          Keep your profile secure with a robust password
        </p>
      </div>

      <div className="lg:col-span-8">
        <form
          className="flex flex-col gap-6 rounded-xl bg-surface-container-low p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <Input
              type="password"
              name="currentPassword"
              label="Current Password"
              register={register}
              required
              error={errors.currentPassword}
              placeholder="••••••••"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Input
                type="password"
                name="newPassword"
                label="New Password"
                register={register}
                required
                error={errors.newPassword}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="repeatedNewPassword"
                label="Repeat new password"
                register={register}
                required
                error={errors.repeatedNewPassword}
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="flex flex-col items-end pt-2 gap-2">
            <button
              type="submit"
              className="rounded-full border border-primary/20 bg-primary/10 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-on-primary active:scale-95"
            >
              Update Password
            </button>
            {isSuccess && (
              <SuccessMessage message="Password updated successfully" />
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

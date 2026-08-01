"use client";

import { updateProfile } from "@/entities/profile/model/slice";
import { updateEmailAction } from "@/entities/user/api/update-email";
import { useTemporarySuccess } from "@/shared/lib/hooks/use-temporary-success";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { SuccessMessage } from "@/shared/ui/success-message/ui";
import { ChangeEvent, useEffect, useState } from "react";
import ContactSkeleton from "./ContactSkeleton";

export default function Contact() {
  const { profile, isLoading } = useAppSelector((state) => state.profile);
  const [email, setEmail] = useState(profile?.user.email || "");
  const { isSuccess, setIsSuccess } = useTemporarySuccess();
  const [emailError, setEmailError] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profile?.user.email) {
      setEmail(profile.user.email);
    }
  }, [profile?.user.email]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError("Email address is required.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setEmailError(
        `Please enter a valid email address, f.e. "user@gmail.com"`,
      );
      return;
    }

    setEmailError("");

    try {
      const response = await updateEmailAction(email);

      const { success, data, message } = response;

      if (success) {
        dispatch(updateProfile(data));
        localStorage.setItem("profile", JSON.stringify(data));
        setIsSuccess(true);
      } else {
        setEmailError(message);
      }
    } catch (error) {
      setEmailError("Something went wrong. Please try again.");
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  if (isLoading) {
    return <ContactSkeleton />;
  }

  return (
    <section className="grid grid-cols-1 gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <h2 className="font-headline mb-2 text-2xl font-bold uppercase tracking-tight text-white">
          Contact
        </h2>
        <p className="text-sm font-light text-on-surface-variant">
          Where you receive your orders, shipping info and newsletter
        </p>
      </div>

      <div className="lg:col-span-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl bg-surface-container-low p-8"
          noValidate
        >
          <div className="space-y-2">
            <label className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-outline">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              className="input"
              required
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              type="submit"
              className="rounded-full border border-primary/20 bg-primary/10 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-on-primary active:scale-95"
            >
              Update Email
            </button>
            {isSuccess && (
              <SuccessMessage message="Email updated successfully" />
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

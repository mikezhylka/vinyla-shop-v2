"use client";

import { updateNameAction } from "@/entities/profile/api/update-name";
import { updateProfile } from "@/entities/profile/model/slice";
import { useTemporarySuccess } from "@/shared/lib/hooks/use-temporary-success";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { SuccessMessage } from "@/shared/ui/success-message/ui";
import { ChangeEvent, SubmitEvent, useEffect, useRef, useState } from "react";
import IdentitySkeleton from "./IdentitySkeleton";

export default function Identity() {
  const { profile, isLoading } = useAppSelector((state) => state.profile);

  const [name, setName] = useState(profile?.name || "");
  const { isSuccess, setIsSuccess } = useTemporarySuccess();
  const [nameError, setNameError] = useState("");

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const { isSuccess: isAvatarSuccess, setIsSuccess: setIsAvatarSuccess } =
    useTemporarySuccess();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profile?.name) {
      setName(profile.name);
    }
  }, [profile?.name]);

  async function updateName(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setNameError("");

    if (!name.trim()) {
      return setNameError("Please, enter your name.");
    }

    if (name.trim().length < 2) {
      return setNameError("Please, type at least 2 characters.");
    }

    try {
      const result = await updateNameAction(name);
      const { success, data, error } = result;

      if (success) {
        setIsSuccess(true);
        dispatch(updateProfile(data));
        localStorage.setItem("profile", JSON.stringify(data));
      } else {
        setNameError(error || "Failed to update name");
      }
    } catch {
      setNameError("Something went wrong. Please try again.");
    }
  }

  function handleAvatarSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarError("");
  }

  async function handleAvatarSubmit() {
    if (!avatarFile) return;

    setAvatarLoading(true);
    setAvatarError("");

    const formData = new FormData();
    formData.append("file", avatarFile);

    try {
      const response = await fetch("/api/profile/avatar", {
        method: "PATCH",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setIsAvatarSuccess(true);
        dispatch(updateProfile(result));
        localStorage.setItem("profile", JSON.stringify(result));
        setAvatarFile(null);
      } else {
        setAvatarError(result.message || "Failed to update avatar");
      }
    } catch {
      setAvatarError("Something went wrong. Please try again.");
    } finally {
      setAvatarLoading(false);
    }
  }

  if (isLoading) {
    return <IdentitySkeleton />;
  }

  const avatarSrc = avatarPreview ?? profile?.avatar;

  return (
    <section className="grid grid-cols-1 gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <h2 className="font-headline mb-2 text-2xl font-bold uppercase tracking-tight text-white">
          Identity
        </h2>
        <p className="text-sm font-light text-on-surface-variant">
          Your public profile within the Vinyla
        </p>
      </div>

      <div className="rounded-xl bg-surface-container-low p-6 md:p-8 lg:col-span-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-12">
          {/* Avatar */}
          <div className="flex shrink-0 flex-col items-center gap-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-surface-container-high"
            >
              {avatarSrc ? (
                <img
                  alt="Profile"
                  className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-50"
                  src={avatarSrc}
                />
              ) : (
                <span className="text-center material-symbols-outlined text-4xl text-outline"></span>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span className="material-symbols-outlined text-1xl text-white text-center">
                  Click to choose file
                </span>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpg,image/jpeg,image/png,image/webp"
              onChange={handleAvatarSelect}
              className="hidden"
            />

            {avatarFile ? (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={handleAvatarSubmit}
                  disabled={avatarLoading}
                  className="whitespace-nowrap rounded-full bg-primary px-6 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-on-primary transition-colors duration-200 hover:bg-primary/80 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {avatarLoading ? "Saving..." : "Save Portrait"}
                </button>
                <button
                  onClick={() => {
                    setAvatarFile(null);
                    setAvatarPreview(null);
                  }}
                  className="text-[10px] uppercase tracking-widest text-outline hover:text-white transition-colors"
                >
                  Cancel
                </button>
                {isAvatarSuccess && (
                  <SuccessMessage message="Avatar updated successfully" />
                )}
                {avatarError && (
                  <p className="text-red-500 text-xs text-center">
                    {avatarError}
                  </p>
                )}
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="whitespace-nowrap rounded-full bg-surface-container-high px-6 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-surface-bright active:scale-95"
              >
                Change Photo
              </button>
            )}
          </div>

          {/* Name */}
          <div className="flex w-full flex-1 flex-col">
            <form className="flex flex-col gap-6" onSubmit={updateName}>
              <div className="space-y-2">
                <label className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-outline">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  className="ghost-border w-full rounded-lg border-none bg-surface-container-lowest py-4 px-5 text-sm text-white outline-none transition-all focus:ring-1 focus:ring-primary"
                />
                {nameError && (
                  <p className="text-red-500 text-xs mt-1">{nameError}</p>
                )}
              </div>

              <div className="flex flex-col items-stretch md:items-end gap-2">
                <button
                  type="submit"
                  className="w-full md:w-auto rounded-full border border-primary/20 bg-primary/10 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-on-primary active:scale-95"
                >
                  Update Name
                </button>
                {isSuccess && (
                  <SuccessMessage message="Name updated successfully" />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

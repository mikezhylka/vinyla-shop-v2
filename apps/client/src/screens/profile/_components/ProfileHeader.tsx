"use client";

import { useAppSelector } from "@/shared/lib/store/hooks";
import { useRouter } from "next/navigation";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";

export default function ProfileHeader() {
  const { profile } = useAppSelector((state) => state.profile);

  const router = useRouter();

  if (!profile) return <ProfileHeaderSkeleton />;

  return (
    <section className="px-8 mb-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center w-full md:items-end justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-10 text-center md:text-left min-w-0 w-full md:w-auto">
          <div className="relative group shrink-0 self-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-cart-background ring-2 ring-white/10">
              {profile.avatar ? (
                <img
                  className="w-full h-full object-cover"
                  alt="User portrait"
                  src={profile.avatar ? profile.avatar : ""}
                />
              ) : (
                <div className="w-full h-full object-cover"></div>
              )}
            </div>
          </div>
          <div className="space-y-2 min-w-0 w-full self-center md:w-auto">
            <h1 className="h1 wrap-break-word">{profile.name}</h1>
            <p className="text-neutral-gray break-all">{profile.user.email}</p>
          </div>
        </div>
        <div className="flex self-center gap-3 shrink-0">
          <button
            className="btn-primary px-6 py-2.5 hover:cursor-pointer"
            onClick={() => router.push("/profile/settings")}
          >
            Account Settings
          </button>
        </div>
      </div>
    </section>
  );
}

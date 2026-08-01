"use client";

import { useAppSelector } from "@/shared/lib/store/hooks";
import Link from "next/link";
import Contact from "./_components/Contact";
import Identity from "./_components/Identity";
import Security from "./_components/Security";
import { BackSvg } from "@/shared/ui/back-svg/ui";

export default function AccountSettingsPage() {
  const { profile } = useAppSelector((state) => state.profile);

  if (!profile) return null; // Or return <AccountSettingsSkeleton />

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-12 md:pt-18 lg:pt-32 md:px-12">
      <div className="mb-12">
        <Link
          href="/profile"
          className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary"
        >
          <BackSvg />
          <span>Back to Profile</span>
        </Link>
      </div>

      {/* Page Header */}
      <div className="mb-16">
        <h1 className="font-headline mb-4 text-5xl font-extrabold tracking-tighter text-white md:text-7xl">
          Settings
        </h1>
        {/* <p className="max-w-xl text-lg font-light text-on-surface-variant">
          Curate your digital presence. Manage your personal details, security
          preferences, and sonic notifications.
        </p> */}
      </div>

      <div className="flex flex-col gap-24">
        <Identity />
        <Contact />
        <Security />
      </div>
    </main>
  );
}

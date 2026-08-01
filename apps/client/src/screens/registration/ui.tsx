"use client";

import { RegistrationForm } from "@/features/register-by-email/ui/registration-form";
import Image from "next/image";
import Link from "next/link";

export default function RegistrationPage() {
  return (
    <main className="grow flex flex-col md:flex-row items-stretch overflow-hidden min-h-screen">
      {/* Left side */}
      <section className="hidden md:flex md:w-1/2 lg:w-3/5 relative bg-body-background items-end p-16 overflow-hidden border-r border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Minimalist high-end vinyl player"
            className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlZo1I4zWKswMwSqGHt7mD9jqfasPMWh-y6CeaKExoQ-ZyDAXmjqG8Jj8IosPbWiVW51WNXD4aflmPNd-7QTVH0BsL5uaw9Y8MtHRZ-M1zEC5-wTG3Wm3tEhQtWrqaNG8je-Yuvn9nh82zp9uYtpvDytc1oGO4KY6fht8Lwlur8Bshek8-jX2xT4nrBRCMrIGc_aKS85sn1DkF33Ot7gqiKsLZu5X7eB0sZ1pf6b8McELNY2_byfSxFuoRlfudPuZjA3aoelTrxhjB"
            fill
            priority
            sizes="(max-width: 640px) 0vw, (max-width: 1440px) 50vw, 60vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-body-background via-body-background/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-xl animate-on-scroll">
          <span className="tracking-[0.2em] text-xs text-neutral-gray mb-4 block uppercase font-bold">
            EST. 2026
          </span>
          <h2 className="h1 lg:text-[80px] font-extrabold tracking-tighter text-white leading-tight mb-6">
            Vinyla
            <br />
            Shop
          </h2>
          <p className="main-text text-neutral-gray leading-relaxed max-w-sm">
            A curated ecosystem for the modern listener. Discover limited
            editions and enjoy the sound.
          </p>
        </div>

        {/* Decorational Marquee */}
        <div className="absolute -right-20 top-1/2 -rotate-90 pointer-events-none opacity-5">
          <span className="text-[12rem] font-black uppercase whitespace-nowrap">
            VINYL CURATION
          </span>
        </div>
      </section>

      {/* Right side: Registration form */}
      <section className="grow flex items-center justify-center p-8 pb-16 md:p-16 lg:p-24 bg-body-background">
        <div className="w-full max-w-md animate-on-scroll">
          <div className="mb-12">
            <h1 className="h2 tracking-tight text-white mb-3">Join Vinyla</h1>
            <p className="secondary-text text-neutral-gray">
              Your sound journey begins here.
            </p>
          </div>
          <div className="mt-12 text-center">
            <p className="small-text text-neutral-gray mb-6">
              Already have an account?
              <Link
                href="/login"
                className="text-white font-semibold hover:underline decoration-neutral-gray underline-offset-4 ml-1"
              >
                Log in here
              </Link>
            </p>
          </div>

          <RegistrationForm />
        </div>
      </section>
    </main>
  );
}

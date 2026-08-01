"use client";

import { FC } from "react";
import Link from "next/link";
import { BackSvg } from "@/shared/ui/back-svg/ui";
import { ContactForm } from "./components/contact-form";
import { ContactInfo } from "./components/contact-info";

export const ContactPage: FC = () => {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-8 md:pt-18 lg:pt-20 md:px-12">
      <div className="mb-12">
        <Link
          href="/"
          className="group flex w-max items-center gap-2 text-sm font-semibold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary"
        >
          <BackSvg />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
        {/* Info Column */}
        <section className="lg:col-span-5 lg:pt-8">
          <h1 className="font-headline mb-6 text-4xl font-extrabold tracking-tighter text-white md:text-5xl">
            We are always ready to help you and answer your questions
          </h1>
          <p className="max-w-md text-lg font-light leading-relaxed text-on-surface-variant mb-12">
            You can always reach out to us, and we will be happy to provide you
            with a response
          </p>
          <ContactInfo />
        </section>

        {/* Form Column */}
        <section className="rounded-2xl bg-surface-container-low p-8 md:p-12 lg:col-span-7">
          <h4 className="font-headline mb-2 text-2xl font-bold uppercase tracking-tight text-white">Contact us</h4>
          <p className="text-sm font-light leading-relaxed text-on-surface-variant mb-10">
            Write us your data and questions and get an answer
          </p>
          <ContactForm />
        </section>
      </div>
    </main>
  );
};

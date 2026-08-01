import { FC } from "react";
import Link from "next/link";
import { BackSvg } from "@/shared/ui/back-svg/ui";
import { ServiceInfo } from "./components/service-info";
import { services } from "./config";

const ServicesPage: FC = () => {
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

      {/* Page Header */}
      <div className="mb-12 md:mb-16">
        <h1 className="font-headline mb-6 text-5xl font-extrabold tracking-tighter text-white md:text-7xl">
          Services
        </h1>
        <p className="max-w-2xl text-lg font-light leading-relaxed text-on-surface-variant mb-10">
          Our services are tailored to every vinyl lover's needs—rare records,
          premium restoration, or custom pressing. Your music, your way.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto text-center rounded-full border border-primary/20 bg-primary/10 px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-on-primary"
          >
            Contact us
          </Link>
          <Link
            href="/catalog"
            className="w-full sm:w-auto text-center rounded-full border border-primary/20 bg-primary/10 px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-on-primary"
          >
            Go to shop
          </Link>
        </div>
      </div>

      {/* Banner */}
      <div className="mb-16 md:mb-24 flex items-center justify-center">
        <img
          className="w-full max-w-lg object-contain"
          src="/images/banners/services-banner.png"
          alt="Vinyl Services"
        />
      </div>

      {/* Services List */}
      <div className="flex flex-col gap-16 md:gap-24">
        {services.map((service, index) => (
          <ServiceInfo key={service.title + index} service={service} />
        ))}
      </div>
    </main>
  );
};

export default ServicesPage;

import { FC } from "react";
import { Service } from "../config";

type Props = {
  service: Service;
};

export const ServiceInfo: FC<Props> = ({ service }) => {
  const { title, description, icon } = service;

  return (
    <section className="grid grid-cols-1 gap-6 lg:gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4 flex flex-col items-start">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high">
          <img className="w-7 opacity-80" src={icon} alt="" />
        </div>
        <h2 className="font-headline mb-2 text-2xl font-bold uppercase tracking-tight text-white">
          {title}
        </h2>
      </div>

      <div className="rounded-xl bg-surface-container-low p-6 md:p-8 lg:col-span-8 flex items-center">
        <p className="text-sm font-light leading-relaxed text-on-surface-variant md:text-base m-0">
          {description}
        </p>
      </div>
    </section>
  );
};

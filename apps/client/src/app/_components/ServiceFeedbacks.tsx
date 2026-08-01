"use client";

import { feedbacks } from "../../api/feedbacks";
import cn from "classnames";

export default function ServiceFeedbacks() {
  const gridClasses = [
    "col-span-full lg:col-start-6 lg:col-span-3",
    "col-span-full lg:col-start-9 lg:col-span-3",
    "col-span-full lg:col-start-2 lg:col-span-3",
    "col-span-full lg:col-start-5 lg:col-span-3",
    "col-span-full lg:col-start-6 lg:col-span-3",
    "col-span-full lg:col-start-9 lg:col-span-3",
  ];

  return (
    <section className="animate-on-scroll py-20 lg:pt-32 lg:pb-40">
      <div className="main-grid">
        <div className="col-span-full lg:col-start-2 lg:col-end-12 lg:col-span-full flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-6 mb-8 lg:mb-12 gap-4">
          <h2 className="m-0 text-2xl font-bold tracking-tight text-white lg:text-4xl">
            Customer Feedbacks
          </h2>
        </div>
      </div>

      <section className="main-grid">
        {feedbacks.map((feedback, index) => (
          <article
            className={cn(
              "flex flex-col gap-5 bg-surface-container-lowest border border-white/5 p-8 transition-colors duration-300 hover:bg-surface-container-low hover:border-white/10 lg:col-span-3 rounded-2xl",
              gridClasses[index],
            )}
            key={feedback.id}
          >
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10">
                <img
                  className="h-4 w-4 opacity-70"
                  src="/images/icons/user-white.svg"
                  alt="User logo"
                />
              </div>
              <p className="m-0 text-[11px] font-bold uppercase tracking-widest text-white">
                {feedback?.name}
              </p>
            </div>
            <p className="m-0 text-sm leading-relaxed text-neutral-gray mt-1">
              &quot;{feedback?.description}&quot;
            </p>
          </article>
        ))}
      </section>
    </section>
  );
}

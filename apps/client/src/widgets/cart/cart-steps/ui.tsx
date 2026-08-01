"use client";

import { setActiveStep } from "@/entities/cart";
import { useAppSelector, useAppDispatch } from "@/shared/lib/store/hooks";
import cn from "classnames";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const STEPS = [
  { id: 1, label: "Cart", link: "/cart" },
  { id: 2, label: "Checkout", link: "/checkout" },
  { id: 3, label: "Complete", link: "/complete" },
];

export const CartSteps = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { activeStep } = useAppSelector((state) => state.cart);

  const [isActiveStepLoaded, setIsActiveStepLoaded] = useState(false);

  const handleStepClick = (stepId: number) => {
    // Only allow going back to a previous completed step
    if (stepId < activeStep) {
      dispatch(setActiveStep(stepId));
      router.back();
    }
  };

  useEffect(() => {
    const currentLink = window.location.href.split("/").at(-1);

    switch (`/${currentLink}`) {
      case STEPS[1].link:
        dispatch(setActiveStep(STEPS[1].id));

        setIsActiveStepLoaded(true);

        return;
      case STEPS[2].link:
        dispatch(setActiveStep(STEPS[2].id));

        setIsActiveStepLoaded(true);

        return;
      default:
        setIsActiveStepLoaded(true);

        return;
    }
  }, []);

  if (!isActiveStepLoaded) {
    return (
      <div className="col-span-full flex items-center justify-between md:justify-start gap-3 md:gap-6 border-b border-white/10 pb-6 mb-8 lg:mb-12 mt-8 lg:mt-16 lg:col-start-2 lg:col-span-10 animate-pulse">
        {STEPS.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-3 p-0">
              <div className="h-8 w-8 rounded-full bg-white/10 shrink-0"></div>
              <div className="hidden md:block h-3 w-16 bg-white/10 rounded"></div>
            </div>
            {index < STEPS.length - 1 && (
              <div className="h-px flex-1 md:w-16 md:flex-none bg-white/10" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="col-span-full flex items-center justify-between md:justify-start gap-3 md:gap-6 border-b border-white/10 pb-6 mb-8 lg:mb-12 mt-8 lg:mt-16 lg:col-start-2 lg:col-span-10">
      {STEPS.map((step, index) => {
        const isActive = activeStep === step.id;
        const isCompleted = activeStep > step.id;
        const isClickable = isCompleted;

        return (
          <React.Fragment key={step.id}>
            <button
              onClick={() => handleStepClick(step.id)}
              disabled={!isClickable}
              className={cn(
                "flex items-center gap-3 p-0 bg-transparent border-none outline-none group",
                isClickable ? "cursor-pointer" : "cursor-default",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-bold transition-colors shrink-0",
                  isActive
                    ? "border-white bg-white text-black"
                    : isCompleted
                      ? "border-white/50 bg-white/10 text-white group-hover:bg-white/20 group-hover:border-white/70"
                      : "border-white/10 text-neutral-gray",
                )}
              >
                {step.id}
              </div>
              <span
                className={cn(
                  "hidden md:block text-[11px] font-bold uppercase tracking-[0.2em] transition-colors whitespace-nowrap",
                  isActive
                    ? "text-white"
                    : isCompleted
                      ? "text-white/70 group-hover:text-white"
                      : "text-neutral-gray",
                )}
              >
                {step.label}
              </span>
            </button>

            {/* Divider line between steps */}
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-px flex-1 md:w-16 md:flex-none transition-colors",
                  isCompleted ? "bg-white/50" : "bg-white/10",
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

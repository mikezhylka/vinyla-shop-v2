"use client";

import cn from "classnames";
import { CartStep as CartStepType } from "../model/types";

type Props = {
  currentStep: CartStepType;
  activeCartStep: number;
};

export const CartStep: React.FC<Props> = ({ currentStep, activeCartStep }) => {
  const { stepNumber, title } = currentStep;
  const isStepActive = stepNumber === activeCartStep;
  const isStepCompleted = activeCartStep > stepNumber;

  return (
    <div
      className={cn(
        "flex flex-row items-center gap-3 pb-4 w-max pr-7.5 lg:w-auto lg:pr-0 lg:col-span-2 border-b border-transparent",
        { "border-white": isStepActive },
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-10.25 h-10.25 text-base font-medium rounded-full",
          {
            "bg-white text-black": isStepActive,
            "bg-neutral-gray text-white": !isStepActive && !isStepCompleted,
            "bg-neutral-gray text-transparent bg-[url('/images/icons/check.svg')] bg-center bg-no-repeat":
              isStepCompleted,
          },
        )}
      >
        {!isStepCompleted && stepNumber}
      </div>
      <p
        className={cn("m-0 text-base font-medium whitespace-nowrap", {
          "text-white": isStepActive,
          "text-neutral-gray": !isStepActive,
        })}
      >
        {title}
      </p>
    </div>
  );
};

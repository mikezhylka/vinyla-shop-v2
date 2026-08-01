"use client";

import { forwardRef } from "react";
import cn from "classnames";

interface Props extends React.ComponentPropsWithRef<"input"> {
  title: string;
  errorMsg?: string;
}

export const CartInput = forwardRef<HTMLInputElement, Props>(
  ({ title, errorMsg, className, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor={rest.name}
          className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-outline"
        >
          {title}
        </label>
        <input
          ref={ref}
          id={rest.name}
          className={cn(
            "ghost-border w-full rounded-lg border-none bg-surface-container-lowest py-4 px-5 text-sm text-white outline-none transition-all focus:ring-1",
            errorMsg ? "ring-1 ring-red focus:ring-red" : "focus:ring-primary",
            className
          )}
          {...rest}
        />
        {errorMsg && (
          <span className="mt-1 ml-1 text-xs text-red">{errorMsg}</span>
        )}
      </div>
    );
  }
);

CartInput.displayName = "CartInput";

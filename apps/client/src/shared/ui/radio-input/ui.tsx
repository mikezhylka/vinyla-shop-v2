"use client";

import { normalizePrice } from "@/shared/lib/handlers/normalize-price";

import cn from "classnames";

type Props = {
  name: string;
  title: string;
  value: string;
  checked: boolean;
  pricing?: number;
  onChange: (value: string) => void;
};

export const RadioInput: React.FC<Props> = ({
  name,
  title,
  value,
  checked,
  pricing,
  onChange,
}) => {
  return (
    <label
      className={cn(
        "flex items-center justify-between w-full rounded-lg bg-surface-container-lowest px-5 py-4 cursor-pointer transition-all group",
        checked ? "ring-1 ring-primary" : "hover:ring-1 hover:ring-primary/50"
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative flex items-center justify-center w-5 h-5 rounded-full border shrink-0 transition-colors",
            checked ? "border-primary" : "border-outline-variant"
          )}
        >
          <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={(e) => onChange(e.target.value)}
            className="peer absolute inset-0 opacity-0 cursor-pointer"
          />
          <div
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-transform duration-200",
              checked ? "bg-primary scale-100" : "scale-0"
            )}
          />
        </div>
        <p className="m-0 text-sm font-light text-white">{title}</p>
      </div>
      {pricing !== undefined && (
        <p className="m-0 text-sm font-medium text-white">
          {pricing === 0 ? "Free" : normalizePrice(pricing)}
        </p>
      )}
    </label>
  );
};


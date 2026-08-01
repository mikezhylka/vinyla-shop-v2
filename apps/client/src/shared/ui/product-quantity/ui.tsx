"use client";

import cn from "classnames";

type Props = {
  quantity: number;
  isInactive?: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
};

export const ProductQuantity: React.FC<Props> = ({
  quantity,
  isInactive,
  onIncrement,
  onDecrement,
}) => {
  const isDecrementDisabled = quantity <= 1;

  return (
    <div className="flex items-center justify-center gap-6">
      <button
        type="button"
        disabled={isDecrementDisabled}
        onClick={onDecrement}
        className="text-2xl border-none bg-transparent text-outline hover:text-white transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
      >
        -
      </button>
      <span
        className={cn("text-base font-medium", {
          "text-outline": isInactive,
          "text-white": !isInactive,
        })}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        className="text-2xl border-none bg-transparent text-outline hover:text-white transition-colors cursor-pointer"
      >
        +
      </button>
    </div>
  );
};


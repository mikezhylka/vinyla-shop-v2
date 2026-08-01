"use client";

import { Comment } from "@/entities/product";
import cn from "classnames";
import React from "react";
import { calculateAvgRate, getStarState } from "./handlers";
import { Product } from "@/entities/product";

type Props = {
  currentProduct?: Product;
  currentComment?: Comment;
};

export const Stars: React.FC<Props> = ({ currentProduct, currentComment }) => {
  const isProduct = Boolean(currentProduct);
  const currentObject = currentComment || currentProduct;

  if (!currentObject) return null;

  const rating = isProduct
    ? calculateAvgRate(currentProduct as Product)
    : (currentComment as Comment).rate;

  return (
    <div
      className={cn("flex items-center gap-1", isProduct ? "mt-2" : "gap-0.5")}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const state = getStarState(rating, index, isProduct);

        return (
          <img
            key={index}
            src={`/images/icons/star-${state}.svg`}
            alt={`${state} star`}
            className={cn(
              "shrink-0 transition-transform duration-300",
              isProduct ? "h-5 w-5 lg:h-6 lg:w-6" : "h-4 w-4",
              { "opacity-50": state === "empty" },
            )}
          />
        );
      })}
    </div>
  );
};

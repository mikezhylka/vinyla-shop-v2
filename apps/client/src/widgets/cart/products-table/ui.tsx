"use client";

import { CartProduct } from "@/entities/cart/ui/cart-product";
import { useAppSelector } from "@/shared/lib/store/hooks";
import cn from "classnames";

export const ProductsTable: React.FC = () => {
  const { items, activeStep } = useAppSelector((state) => state.cart);

  const onCheckout = activeStep === 2;

  return (
    <div
      className={cn("w-full mb-10 lg:col-span-7 lg:mb-0", {
        "mt-10": onCheckout,
      })}
    >
      <div className="hidden md:grid grid-cols-7 gap-5 pb-4 mb-4 border-b border-white/5">
        <div className="col-span-5 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-outline justify-self-start">
          Product
        </div>
        <div className="col-span-1 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-outline justify-self-start">
          Quantity
        </div>
        <div className="col-span-1 px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-outline justify-self-end">
          Delete
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {Object.values(items).map((product) => (
          <div key={product.cartItemId}>
            <CartProduct product={product} usedFor="shoppingCart" />
          </div>
        ))}
      </div>
    </div>
  );
};

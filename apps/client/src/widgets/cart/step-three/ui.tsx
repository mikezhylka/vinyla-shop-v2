"use client";

import {
  clearCart,
  setActiveStep,
} from "@/entities/cart";
import { useScroll } from "@/shared/lib/hooks/use-scroll";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import cn from "classnames";
import { useMemo } from "react";
import Link from "next/link";

export const StepThreeSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const { order } = useAppSelector(state => state.order);

  useScroll({ options: { top: 0, behavior: "instant" } });

  const orderData = useMemo(() => {
    if (!order?.id) return [];

    const total = order.items?.reduce(
      (acc, item) => acc + item.priceAtPurchase * item.quantity,
      0
    ) || 0;

    return [
      { title: "Order number", value: `#${order.id}` },
      { title: "Date", value: new Date(order.createdAt).toLocaleDateString() },
      { title: "Total", value: `$${total.toFixed(2)}` },
      { title: "Shipping", value: order.shipping },
      { title: "Contact", value: order.contact?.email },
    ];
  }, [order]);

  if (!order || !order.id) {
    return null;
  }

  return (
    <section className="flex flex-col items-center justify-center my-10 lg:my-22 lg:mb-30">
      <h3 className="m-0 mb-6 font-headline text-xl lg:text-2xl uppercase tracking-widest text-primary text-center">
        Thank you!
      </h3>
      <h1 className="m-0 font-headline text-4xl lg:text-5xl font-extrabold uppercase tracking-tighter text-white mb-8 text-center max-w-lg lg:max-w-3xl lg:mb-15">
        Your order has been placed successfully
      </h1>

      <section className="bg-surface-container-low p-6 lg:p-8 rounded-xl w-full lg:w-[40vw] mt-10 mb-12">
        <div className="flex flex-col gap-4">
          {orderData.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-between pb-4",
                index !== orderData.length - 1
                  ? "border-b border-white/10"
                  : ""
              )}
            >
              <p className="m-0 text-white/50 text-sm font-medium">
                {item.title}
              </p>
              <p className="m-0 text-white text-sm font-bold uppercase tracking-wider">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Link
        className="w-full lg:w-[40vw] whitespace-nowrap rounded-full bg-primary px-8 py-4 text-center text-[12px] font-bold uppercase tracking-widest text-on-primary transition-colors duration-200 hover:bg-primary/80 active:scale-95"
        href={"/"}
        onClick={() => {
          dispatch(setActiveStep(1));
          dispatch(clearCart());
        }}
      >
        Go to home page
      </Link>
    </section>
  );
};

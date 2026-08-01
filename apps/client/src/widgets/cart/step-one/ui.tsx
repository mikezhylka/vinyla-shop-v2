"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import {
  selectCartSubtotal,
  selectCartTotal,
  setActiveStep,
  setShippingMethod,
} from "@/entities/cart";
import { RadioInput } from "@/shared/ui/radio-input/ui";
import { normalizePrice } from "@/shared/lib/handlers/normalize-price";
import { ProductsTable } from "../products-table/ui";
import { useRouter } from "next/navigation";

export const StepOneSection = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const subtotal = useAppSelector(selectCartSubtotal);
  const total = useAppSelector(selectCartTotal);
  const { shippingPrice, shippingMethod } = useAppSelector(
    (state) => state.cart,
  );

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/checkout");
    dispatch(setActiveStep(2));
  }

  return (
    <form
      action="POST"
      className="main-grid lg:my-10 lg:px-0"
      onSubmit={handleSubmit}
    >
      <div className="col-span-full w-full mb-10 lg:col-span-7 lg:mb-0">
        <ProductsTable />
      </div>

      <section className="col-span-full flex flex-col gap-8 lg:col-start-9 lg:-col-end-1">
        <div className="flex flex-col gap-4">
          <RadioInput
            name="shipping"
            title="Free shipping"
            pricing={0}
            value="FREE_SHIPPING"
            checked={shippingMethod === "FREE_SHIPPING"}
            onChange={() =>
              dispatch(setShippingMethod({ method: "FREE_SHIPPING", price: 0 }))
            }
          />
          <RadioInput
            name="shipping"
            title="Express shipping"
            pricing={15}
            value="EXPRESS_SHIPPING"
            checked={shippingMethod === "EXPRESS_SHIPPING"}
            onChange={() =>
              dispatch(
                setShippingMethod({ method: "EXPRESS_SHIPPING", price: 15 }),
              )
            }
          />
          <RadioInput
            name="shipping"
            title="Pick Up"
            pricing={-10}
            value="PICK_UP"
            checked={shippingMethod === "PICK_UP"}
            onChange={() =>
              dispatch(setShippingMethod({ method: "PICK_UP", price: -10 }))
            }
          />
        </div>

        <div className="flex flex-col bg-surface-container-low rounded-xl p-8 border border-white/5">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <p className="m-0 text-sm font-light text-on-surface-variant">
              Subtotal
            </p>
            <p className="m-0 text-sm font-medium text-white">
              {normalizePrice(subtotal)}
            </p>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-white/5">
            <p className="m-0 text-sm font-light text-on-surface-variant">
              Delivery
            </p>
            <p className="m-0 text-sm font-medium text-white">
              {normalizePrice(shippingPrice)}
            </p>
          </div>
          <div className="flex items-center justify-between pt-4">
            <p className="m-0 text-base font-semibold text-white">Total</p>
            <p className="m-0 text-base font-semibold text-white">
              {normalizePrice(total)}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="whitespace-nowrap rounded-full bg-primary px-8 py-4 text-center text-[12px] font-bold uppercase tracking-widest text-on-primary transition-colors duration-200 hover:bg-primary/80 active:scale-95 mb-10 lg:mb-0"
        >
          Checkout
        </button>
      </section>
    </form>
  );
};

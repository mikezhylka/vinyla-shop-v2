"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { selectIsCartEmpty, setCartProductsIds } from "@/entities/cart";
import { clearCart as clearCartAction } from "@/entities/cart/api/clear-cart";
import { CartInput } from "@/shared/ui/cart-input/ui";
import { OrderSummary } from "@/widgets/cart/order-summary/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrder } from "@/entities/order/api/create-order";
import { setOrder } from "@/entities/order/model/slice";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  createOrderFormSchema,
  OrderFormValues,
  defaultOrderFormValues,
} from "./model/checkout.schema";
import { CartSteps } from "@/widgets/cart/cart-steps/ui";
import { EmptyCart } from "@/widgets/cart/empty-cart/ui";

export function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isCartEmpty = useAppSelector(selectIsCartEmpty);
  const { shippingMethod, items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const isPickUp = shippingMethod === "PICK_UP";
  const formSchema = createOrderFormSchema(isPickUp);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema as any),
    mode: "onChange",
    defaultValues: defaultOrderFormValues,
  });

  async function onSubmit(data: OrderFormValues) {
    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const createOrderDto = {
        shipping: shippingMethod,
        items: Object.values(items).map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          priceAtPurchase: product.price,
        })),
        contact: data.contact,
        address: isPickUp ? undefined : data.address,
      };

      const createOrderResponse = await createOrder(createOrderDto);

      if (!createOrderResponse.success) {
        throw new Error(createOrderResponse.message);
      }

      dispatch(setOrder(createOrderResponse.data));
      localStorage.removeItem("cartProductsIds");
      dispatch(setCartProductsIds([]));

      const clearCartResponse = await clearCartAction();

      if (!clearCartResponse.success) {
        throw new Error(clearCartResponse.message);
      }

      if (isPickUp) {
        const confirmResult = await stripe!.confirmPayment({
          elements: elements!, // includes card-related information + client secret
          confirmParams: {
            return_url: `${window.location.origin}/complete`, // redirect
            receipt_email: createOrderDto.contact.email,
          },
        });

        if (confirmResult.error) {
          throw new Error(
            confirmResult.error.message ?? "An unexpected error occurred.",
          );
        }
      } else {
        const confirmResult = await stripe!.confirmPayment({
          elements: elements!, // includes card-related information + client secret
          confirmParams: {
            return_url: `${window.location.origin}/complete`, // redirect
            receipt_email: createOrderDto.contact.email,

            shipping: {
              name: `${createOrderDto.contact.firstName} ${createOrderDto.contact.lastName}`,
              address: {
                line1: createOrderDto.address?.street!, // street address
                city: createOrderDto.address?.city,
                country: createOrderDto.address?.country,
                postal_code: createOrderDto.address?.zip,
              },
            },
          },
        });

        if (confirmResult.error) {
          throw new Error(
            confirmResult.error.message ?? "An unexpected error occurred.",
          );
        }
      }
    } catch (error) {
      console.error(error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isCartEmpty) {
    return <EmptyCart />;
  }

  return (
    <div className="main-grid lg:px-0 lg:my-10">
      <CartSteps />

      {/* === ORDER SUMMARY === */}
      <div className="col-span-full lg:col-start-9 lg:-col-end-1 lg:row-start-2">
        <OrderSummary />
      </div>

      <form
        className="col-span-full lg:col-start-1 lg:col-span-7 lg:row-start-2 mb-12 lg:mb-30"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* === CONTACT INFORMATION === */}
        <section className="mb-12 bg-surface-container-low p-6 lg:p-8 rounded-xl">
          <h4 className="font-headline mb-6 text-2xl font-bold uppercase tracking-tight text-white">
            Contact Information
          </h4>
          <div className="flex gap-6 w-full flex-col lg:flex-row">
            <div className="flex-1">
              <CartInput
                type="text"
                title="First name"
                errorMsg={errors.contact?.firstName?.message}
                {...register("contact.firstName")}
              />
            </div>
            <div className="flex-1">
              <CartInput
                type="text"
                title="Last name"
                errorMsg={errors.contact?.lastName?.message}
                {...register("contact.lastName")}
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-6">
            <CartInput
              type="tel"
              title="Phone number"
              errorMsg={errors.contact?.phone?.message}
              {...register("contact.phone")}
            />
            <CartInput
              type="email"
              title="Email"
              errorMsg={errors.contact?.email?.message}
              {...register("contact.email")}
            />
          </div>
        </section>

        {/* === SHIPPING ADDRESS === */}
        {!isPickUp && (
          <section className="mb-12 bg-surface-container-low p-6 lg:p-8 rounded-xl">
            <h4 className="font-headline mb-6 text-2xl font-bold uppercase tracking-tight text-white">
              Shipping Address
            </h4>
            <div className="flex flex-col gap-6">
              <CartInput
                type="text"
                title="Country"
                errorMsg={errors.address?.country?.message}
                {...register("address.country")}
              />
              <CartInput
                type="text"
                title="Town/City"
                errorMsg={errors.address?.city?.message}
                {...register("address.city")}
              />
              <CartInput
                type="text"
                title="Street Address"
                errorMsg={errors.address?.street?.message}
                {...register("address.street")}
              />
            </div>
            <div className="flex gap-6 w-full flex-col lg:flex-row mt-6">
              <div className="flex-1">
                <CartInput
                  type="text"
                  title="ZIP code"
                  errorMsg={errors.address?.zip?.message}
                  {...register("address.zip")}
                />
              </div>
            </div>
          </section>
        )}

        {/* === PAYMENT METHOD === */}
        <section className="mb-12 bg-surface-container-low p-6 lg:p-8 rounded-xl">
          <h4 className="font-headline mb-6 text-2xl font-bold uppercase tracking-tight text-white">
            Payment method
          </h4>
          {/* <div className="flex flex-col gap-4 mb-6 lg:mb-8">
            <RadioInput
              name="payment"
              title="Credit card"
              value="CARD"
              checked={paymentMethod === "CARD"}
              onChange={() => dispatch(setPaymentMethod("CARD"))}
            />
            <RadioInput
              name="payment"
              title="Cash"
              value="CASH"
              checked={paymentMethod === "CASH"}
              onChange={() => dispatch(setPaymentMethod("CASH"))}
            />
          </div> */}

          <div className="pt-6 lg:pt-8 border-t border-white/5 flex flex-col gap-6">
            <PaymentElement id="payment-element" />
          </div>
        </section>

        {submitError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 text-red-500 text-sm text-center">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full whitespace-nowrap rounded-full bg-primary px-8 py-4 text-center text-[12px] font-bold uppercase tracking-widest text-on-primary transition-colors duration-200 hover:bg-primary/80 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processing..." : "Pay now"}
        </button>
      </form>
    </div>
  );
}

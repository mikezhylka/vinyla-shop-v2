"use client";

import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { fetchWithAuth } from "@/shared/api/fetch-with-auth";
import { Elements } from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { ReactNode, useEffect, useState } from "react";
import { CartSteps } from "@/widgets/cart/cart-steps/ui";
import { useAppSelector } from "@/shared/lib/store/hooks";
import { selectIsCartEmpty } from "@/entities/cart";
import { EmptyCart } from "@/widgets/cart/empty-cart/ui";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export default function StripeProvider({ children }: { children: ReactNode }) {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const isCartEmpty = useAppSelector(selectIsCartEmpty);
  const { shippingMethod } = useAppSelector((state) => state.cart);

  useEffect(() => {
    fetchWithAuth(API_ENDPOINTS.order.createPaymentIntent, "POST", {
      shippingMethod,
    })
      .then((response) => {
        if (response.success) {
          setClientSecret(response.data.clientSecret);
        } else {
          setError(response.message);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#ffffff",
      colorBackground: "#121212",
      colorText: "#ffffff",
      colorDanger: "#df1b41",
      fontFamily: "system-ui, sans-serif",
      spacingUnit: "4px",
      borderRadius: "8px",
    },
  };

  if (clientSecret.length) {
    return (
      <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
        {children}
      </Elements>
    );
  } else if (isCartEmpty) {
    return <EmptyCart />;
  } else {
    return (
      <div className="main-grid lg:px-0 lg:my-10">
        <CartSteps />
        <div className="col-span-full lg:col-start-9 lg:-col-end-1 w-full lg:row-start-2 lg:mt-0 animate-pulse">
          <div className="bg-surface-container-low rounded-xl h-96 w-full"></div>
        </div>
        <div className="col-span-full lg:col-start-1 lg:col-span-7 lg:row-start-2 flex flex-col gap-12 mb-12 lg:mb-30 w-full animate-pulse">
          <div className="bg-surface-container-low p-6 lg:p-8 rounded-xl h-64 w-full"></div>
          <div className="bg-surface-container-low p-6 lg:p-8 rounded-xl h-80 w-full"></div>
          <div className="bg-surface-container-low p-6 lg:p-8 rounded-xl h-64 w-full"></div>
        </div>
      </div>
    );
  }
}

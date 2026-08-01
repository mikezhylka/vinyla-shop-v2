"use client";

import React, { useState, useEffect, JSX } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export function CompletePage() {
  const [statusText, setStatusText] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [icon, setIcon] = useState<string | JSX.Element>("");
  const [paymentIntentId, setPaymentIntentId] = useState("");

  useEffect(() => {
    const SuccessIcon = (
      <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.4695 0.232963C15.8241 0.561287 15.8454 1.1149 15.5171 1.46949L6.14206 11.5945C5.97228 11.7778 5.73221 11.8799 5.48237 11.8748C5.23253 11.8698 4.99677 11.7582 4.83452 11.5681L0.459523 6.44311C0.145767 6.07557 0.18937 5.52327 0.556912 5.20951C0.924454 4.89575 1.47676 4.93936 1.79051 5.3069L5.52658 9.68343L14.233 0.280522C14.5613 -0.0740672 15.1149 -0.0953599 15.4695 0.232963Z"
          fill="white"
        />
      </svg>
    );
    const ErrorIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.25628 1.25628C1.59799 0.914573 2.15201 0.914573 2.49372 1.25628L8 6.76256L13.5063 1.25628C13.848 0.914573 14.402 0.914573 14.7437 1.25628C15.0854 1.59799 15.0854 2.15201 14.7437 2.49372L9.23744 8L14.7437 13.5063C15.0854 13.848 15.0854 14.402 14.7437 14.7437C14.402 15.0854 13.848 15.0854 13.5063 14.7437L8 9.23744L2.49372 14.7437C2.15201 15.0854 1.59799 15.0854 1.25628 14.7437C0.914573 14.402 0.914573 13.848 1.25628 13.5063L6.76256 8L1.25628 2.49372C0.914573 2.15201 0.914573 1.59799 1.25628 1.25628Z"
          fill="white"
        />
      </svg>
    );

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) {
      return;
    }

    stripePromise.then((stripe) => {
      if (!stripe) return;
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        if (!paymentIntent) return;
        setPaymentIntentId(paymentIntent.id);

        switch (paymentIntent.status) {
          case "succeeded":
            setIconColor("#30B130");
            setIcon(SuccessIcon);
            setStatusText("Payment succeeded! We are processing your order.");
            break;
          case "processing":
            setIconColor("#F6A100");
            setIcon(SuccessIcon);
            setStatusText("Your payment is processing.");
            break;
          case "requires_payment_method":
            setIconColor("#DF1B41");
            setIcon(ErrorIcon);
            setStatusText("Your payment was not successful, please try again.");
            break;
          default:
            setIconColor("#DF1B41");
            setIcon(ErrorIcon);
            setStatusText("Something went wrong.");
            break;
        }
      });
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-24 px-4 text-center">
      {icon && (
        <div
          className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: iconColor }}
        >
          {icon}
        </div>
      )}
      <h2 className="text-3xl font-bold text-white mb-8">{statusText}</h2>

      {paymentIntentId && (
        <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/30 text-left mb-8 max-w-md mx-auto">
          <p className="text-on-surface-variant text-sm mb-2">
            {`Payment Intent ID (for demonstration purposes): `}
          </p>
          <p className="text-white font-mono">{paymentIntentId}</p>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        <a
          href="/checkout"
          className="px-6 py-3 border border-outline-variant hover:border-white text-white font-bold uppercase tracking-widest text-xs transition-colors"
        >
          Test Another Payment
        </a>
        <a
          href="/profile/orders"
          className="px-6 py-3 bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-widest text-xs transition-colors"
        >
          View My Orders
        </a>
      </div>
    </div>
  );
}

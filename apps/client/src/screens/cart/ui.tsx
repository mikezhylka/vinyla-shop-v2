"use client";

import { initCartData, selectIsCartEmpty } from "@/entities/cart";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { useLayoutEffect, useState } from "react";
import { EmptyCart } from "@/widgets/cart/empty-cart/ui";
import CartLoading from "@/app/cart/loading";
import { StepOneSection } from "@/widgets/cart/step-one/ui";
import { CartSteps } from "@/widgets/cart/cart-steps/ui";
import { CartItemResponse } from "@monorepo/shared-types";

interface Props {
  cartProducts?: CartItemResponse[];
}

export function CartPage({ cartProducts }: Props) {
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState(false);
  const { items } = useAppSelector((state) => state.cart);

  useLayoutEffect(() => {
    setMounted(true);

    // looking for mismatch between redux and API
    if (cartProducts) {
      const storeItemKeys = Object.keys(items);
      const hasMismatch =
        cartProducts.length !== storeItemKeys.length ||
        cartProducts.some((p) => !items[p.productId]);

      if (hasMismatch) {
        dispatch(initCartData(cartProducts));
      }
    }
  }, [cartProducts, items, dispatch]);

  const isCartEmpty = useAppSelector(selectIsCartEmpty);

  if (!mounted) {
    if (!cartProducts || !cartProducts.length) {
      return (
        <main className="px-5">
          <EmptyCart />
        </main>
      );
    }

    return <CartLoading />;
  }

  if (isCartEmpty) {
    return (
      <main className="px-5">
        <EmptyCart />
      </main>
    );
  }

  return (
    <main className="px-5">
      <div className="main-grid">
        <CartSteps />
      </div>

      <StepOneSection />
    </main>
  );
}

"use client";

import { initCartData, setCartProductsIds } from "@/entities/cart";
import { getCart } from "@/entities/cart/api/get-cart";
import { getWishlistIds } from "@/entities/profile/api/get-wishlist-ids";
import {
  resetProfile,
  updateIsLoading,
  updateProfile,
  updateWishlistIds,
} from "@/entities/profile/model/slice";
import { useAppDispatch } from "@/shared/lib/store/hooks";
import { ReactNode, useLayoutEffect, useRef } from "react";

export default function AuthInit({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  useLayoutEffect(() => {
    if (!initialized.current) {
      const savedProfile = localStorage.getItem("profile");
      const savedWishlistIds = localStorage.getItem("wishlistIds");
      const savedCartProductsIds = localStorage.getItem("cartProductsIds");

      if (savedProfile) {
        try {
          dispatch(updateProfile(JSON.parse(savedProfile)));

          if (savedWishlistIds) {
            try {
              dispatch(updateWishlistIds(JSON.parse(savedWishlistIds)));
            } catch (e) {
              localStorage.removeItem("wishlistIds");
            }
          }

          if (savedCartProductsIds) {
            try {
              dispatch(setCartProductsIds(JSON.parse(savedCartProductsIds)));
            } catch (e) {
              localStorage.removeItem("cartProductsIds");
            }
          }

          void (async () => {
            try {
              const [wishlistRes, cartRes] = await Promise.allSettled([
                getWishlistIds(),
                getCart(),
              ]);

              const isUnauthorized =
                (wishlistRes.status === "fulfilled" &&
                  wishlistRes.value.status === 401) ||
                (cartRes.status === "fulfilled" &&
                  cartRes.value.status === 401);

              if (isUnauthorized) {
                localStorage.removeItem("profile");
                localStorage.removeItem("wishlistIds");
                localStorage.removeItem("cartProductsIds");
                dispatch(resetProfile());

                return; // Stop processing further since we are unauthorized
              }

              if (
                wishlistRes.status === "fulfilled" &&
                wishlistRes.value?.success
              ) {
                localStorage.setItem(
                  "wishlistIds",
                  JSON.stringify(wishlistRes.value.data),
                );
                dispatch(updateWishlistIds(wishlistRes.value.data));
              }

              if (cartRes.status === "fulfilled" && cartRes.value?.success) {
                const cartItems = cartRes.value.data || [];
                const cartIds = cartItems.map((item) => item.productId);

                localStorage.setItem(
                  "cartProductsIds",
                  JSON.stringify(cartIds),
                );
                dispatch(initCartData(cartItems));
              }
            } catch (error) {
              console.error("Sync initial data failed:", error);
            } finally {
              dispatch(updateIsLoading(false));
            }
          })();
        } catch (e) {
          localStorage.removeItem("profile");
          localStorage.removeItem("wishlistIds");
          localStorage.removeItem("cartProductsIds");
          dispatch(resetProfile());
          dispatch(updateIsLoading(false));
        }
      } else {
        localStorage.removeItem("wishlistIds");
        localStorage.removeItem("cartProductsIds");
        dispatch(resetProfile());
        dispatch(updateIsLoading(false));
      }

      initialized.current = true;
    }
  }, [dispatch]);

  return <>{children}</>;
}

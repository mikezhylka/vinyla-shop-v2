"use client";

import { initCartData } from "@/entities/cart";
import { getCart } from "@/entities/cart/api/get-cart";
import { getWishlistIds } from "@/entities/profile/api/get-wishlist-ids";
import {
  updateProfile,
  updateWishlistIds,
} from "@/entities/profile/model/slice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export async function setLocalUserData(
  dispatch: Dispatch<UnknownAction>,
  result: { profile: any },
) {
  localStorage.setItem("profile", JSON.stringify(result.profile));
  dispatch(updateProfile(result.profile));

  try {
    const [wishlistRes, cartRes] = await Promise.allSettled([
      getWishlistIds(),
      getCart(),
    ]);

    if (wishlistRes.status === "fulfilled" && wishlistRes.value?.success) {
      localStorage.setItem(
        "wishlistIds",
        JSON.stringify(wishlistRes.value.data),
      );
      dispatch(updateWishlistIds(wishlistRes.value.data));
    } else {
      localStorage.removeItem("wishlistIds");
      dispatch(updateWishlistIds([]));
    }

    if (cartRes.status === "fulfilled" && cartRes.value?.success) {
      const cartItems = cartRes.value.data || [];
      const cartIds = cartItems.map((item) => item.productId);

      localStorage.setItem("cartProductsIds", JSON.stringify(cartIds));
      dispatch(initCartData(cartItems));
    } else {
      localStorage.removeItem("cartProductsIds");
      dispatch(initCartData([]));
    }
  } catch (err) {
    console.error("Failed to sync data after login", err);
  }
}

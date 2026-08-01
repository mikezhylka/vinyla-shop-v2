"use client";

import { usePathname, useRouter } from "next/navigation";
import { useWindowSize } from "@uidotdev/usehooks";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import {
  removeProduct,
  setCartProductsIds,
  updateQuantity,
} from "../model/slice";
import { ProductQuantity } from "@/shared/ui/product-quantity/ui";
import { deleteFromCart } from "../api/delete-from-cart";
import { updateCartQuantity } from "../api/update-quantity";
import { CartItemResponse } from "@monorepo/shared-types";

type Props = {
  product: CartItemResponse;
  usedFor: "shoppingCart" | "checkoutDetails";
};

export const CartProduct: React.FC<Props> = ({ product, usedFor }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowSize();
  const { cartProductsIds } = useAppSelector((state) => state.cart);
  const { productId, price, name, photo, quantity } = product;

  const isOnMobile = width ? width < 768 : false; // 768px = md

  const navigateToProduct = () =>
    router.push(`/product/${productId}?from=${pathname}`);

  const handleProductDeletion = async () => {
    dispatch(removeProduct(productId));
    const response = await deleteFromCart(Number(productId));

    if (!response.success) {
      console.error(response.message);

      return false;
    }

    const updatedCartProductsIds = cartProductsIds.filter(
      (p) => p !== product.productId,
    );
    dispatch(setCartProductsIds(updatedCartProductsIds));
  };

  const handleIncrement = async () => {
    dispatch(updateQuantity({ id: productId, operation: "increment" }));
    await updateCartQuantity(Number(productId), quantity + 1);
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id: productId, operation: "decrement" }));
      await updateCartQuantity(Number(productId), quantity - 1);
    }
  };

  // 1. Cart step 1
  if (usedFor === "shoppingCart") {
    return (
      <>
        {/* mobile version */}
        <div className="flex justify-between w-full gap-6 md:hidden">
          <article className="flex w-full gap-4 sm:gap-6">
            <div className="rounded-lg bg-surface-container-high overflow-hidden shrink-0">
              <img
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover transition-transform duration-400 hover:scale-[1.01] hover:cursor-pointer"
                src={photo}
                alt={name}
                onClick={navigateToProduct}
              />
            </div>
            <div className="flex flex-col justify-center flex-1 gap-2">
              <h3
                className="m-0 font-headline uppercase text-sm sm:text-base text-left text-white wrap-break-word max-w-50 sm:max-w-xs hover:underline hover:decoration-2 hover:underline-offset-4 hover:cursor-pointer"
                onClick={navigateToProduct}
              >
                {name}
              </h3>
              <p className="self-start m-0 text-xs sm:text-sm font-medium text-primary">
                ${price}
              </p>
              <div className="flex items-center justify-between gap-6 mt-auto">
                <ProductQuantity
                  quantity={quantity}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
                <img
                  className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer opacity-70 hover:opacity-100 transition-opacity hover:scale-110"
                  src="/images/icons/trash.svg"
                  alt="Delete product"
                  onClick={handleProductDeletion}
                />
              </div>
            </div>
          </article>
        </div>

        {/* Desktop version (grid-cols-7 from ProductsTable) */}
        <div className="hidden md:grid grid-cols-7 gap-5 w-full items-center">
          <article className="flex col-span-5 gap-6 lg:gap-12 items-center">
            <div className="rounded-lg bg-surface-container-high overflow-hidden shrink-0">
              <img
                className="w-28 h-28 lg:w-40 lg:h-40 object-cover transition-transform duration-400 hover:scale-[1.01] hover:cursor-pointer"
                src={photo}
                alt={name}
                onClick={navigateToProduct}
              />
            </div>
            <div className="flex flex-col justify-center gap-2 lg:gap-3">
              <h3
                className="m-0 font-headline uppercase text-base text-left text-white wrap-break-word max-w-62.5 lg:max-w-sm lg:text-xl lg:font-bold hover:underline hover:decoration-2 hover:underline-offset-4 hover:cursor-pointer"
                onClick={navigateToProduct}
              >
                {name}
              </h3>
              <p className="self-start m-0 text-sm font-medium text-primary lg:text-base">
                ${price}
              </p>
            </div>
          </article>

          <div className="col-span-1 text-white justify-self-start">
            <ProductQuantity
              quantity={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          </div>

          <div className="col-span-1 justify-self-end">
            <img
              className="w-8 h-8 lg:w-10.5 lg:h-10.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity hover:scale-110"
              src="/images/icons/trash.svg"
              alt="Delete product"
              onClick={handleProductDeletion}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <article className="flex gap-6 lg:gap-10">
      <div className="rounded-lg bg-surface-container-high overflow-hidden shrink-0">
        <img
          className="w-24 h-24 lg:w-32 lg:h-32 object-cover transition-transform duration-400 hover:scale-[1.01] hover:cursor-pointer"
          src={photo}
          alt={name}
          onClick={navigateToProduct}
        />
      </div>
      <div className="flex flex-col justify-center gap-2 lg:gap-3">
        <h3
          className="m-0 font-headline uppercase text-sm lg:text-base text-left text-white wrap-break-word max-w-50 lg:max-w-70 hover:underline hover:decoration-2 hover:underline-offset-4 hover:cursor-pointer"
          onClick={navigateToProduct}
        >
          {name}
        </h3>
        <p className="self-start m-0 text-xs lg:text-sm font-medium text-primary">
          ${price}
        </p>
        <div className="flex items-center justify-start gap-8 mt-auto">
          <ProductQuantity
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
          <img
            className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer opacity-70 hover:opacity-100 transition-opacity hover:scale-110"
            src="/images/icons/trash.svg"
            alt="Delete product"
            onClick={handleProductDeletion}
          />
        </div>
      </div>
    </article>
  );
};

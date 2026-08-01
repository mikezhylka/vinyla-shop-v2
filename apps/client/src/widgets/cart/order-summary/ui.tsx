"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { selectCartSubtotal, selectCartTotal } from "@/entities/cart";
import { normalizePrice } from "@/shared/lib/handlers/normalize-price";
import { useAppSelector } from "@/shared/lib/store/hooks";
import { CartProduct } from "@/entities/cart/ui/cart-product";
import { ProductsTable } from "../products-table/ui";

export const OrderSummary = () => {
  const { width } = useWindowSize();
  const onTablet = width && width >= 768 && width < 1440; // 1024 = lg in Tailwind

  const { items, shippingMethod, shippingPrice } = useAppSelector(
    (state) => state.cart,
  );
  const subtotal = useAppSelector(selectCartSubtotal);
  const total = useAppSelector(selectCartTotal);

  return (
    <section className="lg:mt-0">
      {onTablet ? (
        <ProductsTable />
      ) : (
        <>
          <h3 className="m-0 mt-10 lg:mt-0 font-headline uppercase text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Order summary
          </h3>
          <div className="flex flex-col gap-6 my-4 lg:my-10">
            {Object.values(items).map((product) => (
              <CartProduct
                key={product.cartItemId}
                product={product}
                usedFor="checkoutDetails"
              />
            ))}
          </div>
        </>
      )}

      <div className="mb-18 bg-surface-container-low rounded-xl p-8 border border-white/5 mt-8 lg:mt-10">
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <p className="m-0 text-sm font-light text-on-surface-variant">
            {shippingMethod === "PICK_UP" ? "Pick Up" : "Shipping"}
          </p>
          <p className="m-0 text-sm font-medium text-white">
            {!shippingPrice ? "Free" : normalizePrice(shippingPrice)}
          </p>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-white/5">
          <p className="m-0 text-sm font-light text-on-surface-variant">
            Subtotal
          </p>
          <p className="m-0 text-sm font-medium text-white">
            {normalizePrice(subtotal)}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <p className="m-0 text-base font-semibold text-white">Total</p>
          <p className="m-0 text-base font-semibold text-white">
            {normalizePrice(total)}
          </p>
        </div>
      </div>
    </section>
  );
};

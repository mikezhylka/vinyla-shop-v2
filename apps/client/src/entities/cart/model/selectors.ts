import { RootState } from "@/app/store/store";

export const selectCartSubtotal = (state: RootState) => {
  return Object.values(state.cart.items).reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );
};

export const selectCartTotal = (state: RootState) => {
  return selectCartSubtotal(state) + state.cart.shippingPrice;
};

export const selectIsCartEmpty = (state: RootState) =>
  Object.keys(state.cart.items).length === 0;

export const selectIsProductInCart = (state: RootState) => (id: number) => {
  return state.cart.cartProductsIds.includes(id);
};

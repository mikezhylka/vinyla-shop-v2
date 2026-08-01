import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemResponse } from "@monorepo/shared-types";

type ShippingMethod = "FREE_SHIPPING" | "EXPRESS_SHIPPING" | "PICK_UP";

interface CartState {
  items: Record<string, CartItemResponse>;
  cartProductsIds: number[];
  activeStep: number;
  shippingMethod: ShippingMethod;
  shippingPrice: number;
  isOrderSubmitted: boolean;
}

const initialState: CartState = {
  items: {},
  cartProductsIds: [],
  activeStep: 1,
  shippingMethod: "FREE_SHIPPING",
  shippingPrice: 0,
  isOrderSubmitted: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCartData: (state, action: PayloadAction<CartItemResponse[]>) => {
      const itemsRecord: Record<string, CartItemResponse> = {};
      const ids: number[] = [];

      action.payload.forEach((item) => {
        itemsRecord[item.productId] = item;
        ids.push(item.productId);
      });

      state.items = itemsRecord;
      state.cartProductsIds = ids;
    },
    setCartProductsIds: (state, action: PayloadAction<number[]>) => {
      state.cartProductsIds = action.payload;
    },
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    setShippingMethod: (
      state,
      action: PayloadAction<{ method: ShippingMethod; price: number }>,
    ) => {
      state.shippingMethod = action.payload.method;
      state.shippingPrice = action.payload.price;
    },
    clearCart: (state) => {
      state.items = {};
      state.isOrderSubmitted = true;
    },
    addProductIdToCart: (state, action: PayloadAction<number>) => {
      if (!state.cartProductsIds.includes(action.payload)) {
        state.cartProductsIds.push(action.payload);
      }
    },
    removeProduct: (state, action: PayloadAction<string | number>) => {
      delete state.items[action.payload];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: string | number;
        operation: "increment" | "decrement";
      }>,
    ) => {
      const { id, operation } = action.payload;
      if (state.items[id]) {
        if (operation === "increment") {
          state.items[id].quantity += 1;
        } else if (operation === "decrement" && state.items[id].quantity > 1) {
          state.items[id].quantity -= 1;
        }
      }
    },
  },
});

export const {
  setActiveStep,
  setShippingMethod,
  clearCart,
  removeProduct,
  updateQuantity,
  setCartProductsIds,
  addProductIdToCart,
  initCartData,
} = cartSlice.actions;
export default cartSlice.reducer;

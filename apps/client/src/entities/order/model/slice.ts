import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "./types";

const initialState = {
  order: {} as Order,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<Order>) {
      state.order = action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;

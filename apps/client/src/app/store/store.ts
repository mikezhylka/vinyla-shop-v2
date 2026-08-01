import cart from "@/entities/cart/model/slice";
import profile from "@/entities/profile/model/slice";
import order from "@/entities/order/model/slice";
import session from "@/entities/session/model/slice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  const store = configureStore({
    reducer: { profile, session, cart, order },
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

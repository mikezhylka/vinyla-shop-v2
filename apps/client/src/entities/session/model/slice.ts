import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    isSessionExpired: false,
  },
  reducers: {
    updateIsSessionExpired: (state, action: PayloadAction<boolean>) => {
      state.isSessionExpired = action.payload;
    },
  },
});

export default sessionSlice.reducer;

export const { updateIsSessionExpired } = sessionSlice.actions;

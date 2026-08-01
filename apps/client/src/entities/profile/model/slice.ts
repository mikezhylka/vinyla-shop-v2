import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "./types";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null as Profile | null,
    isLoading: true,
    wishlistIds: [] as number[],
  },
  reducers: {
    updateProfile(state, action: PayloadAction<Profile | null>) {
      state.profile = action.payload;
    },
    updateWishlistIds(state, action: PayloadAction<number[]>) {
      state.wishlistIds = action.payload;
    },
    updateIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    resetProfile(state) {
      state.profile = null;
      state.wishlistIds = [];
      state.isLoading = false;
    },
  },
});

export default profileSlice.reducer;

export const {
  updateWishlistIds,
  resetProfile,
  updateProfile,
  updateIsLoading,
} = profileSlice.actions;

import { RootState } from "@/app/store/store";

export const selectIsAuthorized = (state: RootState) => {
  return state.profile.profile?.id;
};

export const selectIsProductInWishlist = (state: RootState) => (id: number) => {
  return state.profile.wishlistIds.includes(id);
};

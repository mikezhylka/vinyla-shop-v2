import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { SetStateAction, useCallback } from "react";
import {
  selectIsAuthorized,
  selectIsProductInWishlist,
} from "../../model/selectors";
import { extractWishlistIdsFromResponse } from "../mappers/extract-wishlist-ids";
import { addToWishlist } from "../../api/add-to-wishlist";
import { updateWishlistIds } from "../../model/slice";
import { updateIsSessionExpired } from "@/entities/session/model/slice";
import { removeFromWishlist } from "../../api/remove-from-wishlist";

interface Props {
  id: number;
  wishlistLoading: boolean;
  setIsLoginModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setWishlistLoading: React.Dispatch<SetStateAction<boolean>>;
}

export function useToggleWishlist({
  id,
  wishlistLoading,
  setIsLoginModalOpen,
  setWishlistLoading,
}: Props) {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const isProductInWishlist = useAppSelector((state) =>
    selectIsProductInWishlist(state)(id),
  );
  const { wishlistIds } = useAppSelector((state) => state.profile);

  return useCallback(async () => {
    if (!isAuthorized) {
      setIsLoginModalOpen(true);

      return;
    }

    if (wishlistLoading) return;

    setWishlistLoading(true);
    try {
      const result = isProductInWishlist
        ? await removeFromWishlist(id)
        : await addToWishlist(id);

      if (result.success) {
        const responseIds = extractWishlistIdsFromResponse(
          (result as any).data,
        );
        const updatedWishlistIds =
          responseIds ??
          (isProductInWishlist
            ? wishlistIds.filter((wishlistId) => wishlistId !== id)
            : [...wishlistIds, id]);

        dispatch(updateWishlistIds(updatedWishlistIds));
        localStorage.setItem("wishlistIds", JSON.stringify(updatedWishlistIds));
      } else if ((result as any).code === "SESSION_EXPIRED") {
        dispatch(updateIsSessionExpired(true));
      }
    } finally {
      setWishlistLoading(false);
    }
  }, [
    id,
    isAuthorized,
    isProductInWishlist,
    wishlistLoading,
    wishlistIds,
    dispatch,
    setIsLoginModalOpen,
    setWishlistLoading,
  ]);
}

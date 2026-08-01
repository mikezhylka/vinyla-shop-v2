import { addToCart } from "@/entities/cart/api/add-to-cart";
import { deleteFromCart } from "@/entities/cart/api/delete-from-cart";
import { SetStateAction, useCallback } from "react";
import {
  addProductIdToCart,
  removeProduct,
  selectIsProductInCart,
  setCartProductsIds,
} from "@/entities/cart";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";

interface Props {
  id: number;
  cartLoading: boolean;
  setCartLoading: React.Dispatch<SetStateAction<boolean>>;
}

export const useToggleCart = ({ id, cartLoading, setCartLoading }: Props) => {
  const { cartProductsIds } = useAppSelector((state) => state.cart);
  const isProductInCart = useAppSelector(selectIsProductInCart)(id);
  const dispatch = useAppDispatch();

  return useCallback(async () => {
    if (cartLoading) return;

    setCartLoading(true);

    try {
      // optimistic ui
      if (isProductInCart) {
        dispatch(removeProduct(id));
      } else {
        dispatch(addProductIdToCart(id));
      }

      const result = isProductInCart
        ? await deleteFromCart(id)
        : await addToCart(id);

      if (result.success) {
        const updatedIds = isProductInCart
          ? cartProductsIds.filter((cartId) => cartId !== id)
          : [...cartProductsIds, id];

        dispatch(setCartProductsIds(updatedIds));
        localStorage.setItem("cartProductsIds", JSON.stringify(updatedIds));
      } else {
        console.error(result.message);
      }
    } finally {
      setCartLoading(false);
    }
  }, [
    id,
    cartLoading,
    setCartLoading,
    isProductInCart,
    cartProductsIds,
    dispatch,
  ]);
};

"use client";

import { Product } from "@/entities/product";
import Link from "next/link";
import { removeFromWishlist } from "@/entities/profile/api/remove-from-wishlist";
import { useRouter, usePathname } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { updateWishlistIds } from "@/entities/profile/model/slice";

interface Props {
  wishlistItems: Product[] | undefined;
}

export function WishlistList({ wishlistItems }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [removingId, setRemovingId] = useState<number | null>(null);
  const { wishlistIds } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (!isPending) {
      setRemovingId(null);
    }
  }, [isPending]);

  const handleRemove = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    if (isPending || removingId === id) return;

    setRemovingId(id);
    try {
      const response = await removeFromWishlist(id);

      if (response.success) {
        const updatedWishlistIds = wishlistIds.filter(
          (wishlistId) => wishlistId !== id,
        );

        dispatch(updateWishlistIds(updatedWishlistIds));
        localStorage.setItem("wishlistIds", JSON.stringify(updatedWishlistIds));
      }
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      setRemovingId(null);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {wishlistItems?.map((item, index) => {
        const isRemoving = removingId === item.id;

        return (
          <div
            key={item.id || index}
            className={`group relative transition-all duration-300 ${
              isRemoving ? "opacity-50 pointer-events-none scale-95" : ""
            }`}
          >
            <Link
              href={`/product/${item.id}?from=${pathname}`}
              className="block cursor-pointer"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-cart-background mb-4">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={item.name || "Album art"}
                  src={item.photo.length ? item.photo : undefined}
                />
              </div>

              <h4 className="text-white font-bold truncate">{item.name}</h4>
              <p className="text-neutral-gray text-sm truncate">{item.label}</p>
              <p className="text-white text-sm font-bold mt-1">${item.price}</p>
            </Link>

            <button
              onClick={(e) => handleRemove(e, item.id)}
              disabled={isRemoving}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white transition-opacity flex items-center justify-center z-10 ${
                isRemoving
                  ? "opacity-100 cursor-not-allowed"
                  : "opacity-0 group-hover:opacity-100 hover:bg-red-500"
              }`}
              title="Remove from wishlist"
            >
              {isRemoving ? (
                <svg
                  className="animate-spin w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

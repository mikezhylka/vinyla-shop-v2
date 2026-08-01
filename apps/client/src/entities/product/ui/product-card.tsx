"use client";

import type { Product } from "../model/types";
import { useAppSelector } from "@/shared/lib/store/hooks";
import Loader from "@/shared/ui/loader/ui";
import cn from "classnames";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LoginRequiredModal } from "@/shared/ui/login-required-modal/ui";
import { selectIsProductInCart } from "@/entities/cart";
import { useToggleCart } from "@/entities/cart/lib/hooks/use-toggle-cart";
import { useToggleWishlist } from "@/entities/profile/lib/hooks/use-toggle-wishlist";

interface Props {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: Props) {
  const {
    id,
    name,
    description,
    label,
    barcode,
    photo,
    price,
    genres = [],
    comments = [],
  } = product;

  const { wishlistIds } = useAppSelector((state) => state.profile);
  const isProductInCart = useAppSelector(selectIsProductInCart)(id);

  const isInWishlistProp = wishlistIds.includes(id as number);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [isCartClicked, setIsCartClicked] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isInWishlistState, setIsInWishlistState] = useState(isInWishlistProp);
  const [isInCartState, setIsInCartState] = useState(isProductInCart);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isWishlistHovered, setIsWishlistHovered] = useState(false);

  const handleToggleCart = useToggleCart({ id, cartLoading, setCartLoading });
  const handleToggleWishlist = useToggleWishlist({
    id,
    wishlistLoading,
    setWishlistLoading,
    setIsLoginModalOpen,
  });

  const router = useRouter();
  const pathname = usePathname();
  const isUsedInFavorites = pathname === "/favorites";

  useEffect(() => {
    setIsInWishlistState(isInWishlistProp);
  }, [isInWishlistProp]);

  useEffect(() => {
    setIsInCartState(isProductInCart);
  }, [isProductInCart]);

  useEffect(() => {
    if (isCartClicked) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isCartClicked]);

  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => setShowLoader(false), 500);
      return () => clearTimeout(timer);
    }
  }, [showLoader]);

  function handleProductDeletion(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setShowLoader(true);
  }

  function handleCardClick() {
    setIsCartClicked(true);
    router.push(`/product/${id}?from=${pathname}`);
  }

  function toggleWishlist(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    handleToggleWishlist();
  }

  function toggleCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    handleToggleCart();
  }

  return (
    <article
      className={cn(
        "group relative flex h-full w-full cursor-pointer flex-col",
        "rounded-2xl bg-surface-container-lowest border border-white/5 outline-none transition-all duration-300",
        !isCartHovered &&
          !isWishlistHovered &&
          "hover:bg-surface-container-low hover:border-white/10 hover:shadow-2xl",
        "min-h-50 md:justify-self-center lg:min-h-104 lg:min-w-83.75 lg:col-span-3 p-4",
        className,
      )}
      onClick={handleCardClick}
    >
      {showLoader && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-surface-container-lowest">
          <Loader size="s" color="white" />
        </div>
      )}

      <div
        className={cn(
          "flex h-full flex-col transition-opacity duration-300",
          showLoader ? "opacity-0" : "opacity-100",
        )}
      >
        {/* ── Image Area ── */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-surface-container aspect-square mb-4">
          <img
            className={cn(
              "w-[85%] h-[85%] object-cover shrink-0 transition-transform duration-500",
              !isCartHovered && !isWishlistHovered && "group-hover:scale-110",
            )}
            src={photo.length ? photo : undefined}
            alt={name}
          />

          {/* Label Pill */}
          {label && (
            <span
              className={cn(
                "absolute top-3 left-3",
                "rounded-full bg-white text-black px-3 py-1",
                "text-[9px] font-bold tracking-widest uppercase",
              )}
            >
              {label}
            </span>
          )}

          {/* Wishlist Button */}
          {!isUsedInFavorites && (
            <>
              <button
                className={cn(
                  "cursor-pointer absolute top-3 right-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all active:scale-95",
                  "bg-body-background/80 backdrop-blur-md border border-white/10 hover:bg-white hover:border-white",
                  "group/wishlist",
                  wishlistLoading && "opacity-60",
                )}
                onMouseEnter={() => setIsWishlistHovered(true)}
                onMouseLeave={() => setIsWishlistHovered(false)}
                onClick={toggleWishlist}
                disabled={wishlistLoading}
                aria-label={
                  isInWishlistState ? "Delete from wishlist" : "Add to wishlist"
                }
              >
                <span
                  className={cn(
                    "h-4 w-4 bg-contain bg-center bg-no-repeat transition-transform",
                    isInWishlistState
                      ? "bg-icon-heart-filled"
                      : "bg-icon-heart",
                    "group-hover/wishlist:invert",
                  )}
                />
              </button>
              <LoginRequiredModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
              />
            </>
          )}

          {/* Delete Button — /favorites only */}
          {isUsedInFavorites && (
            <button
              className={cn(
                "absolute top-3 right-3 h-9 w-9 rounded-full bg-body-background/80 backdrop-blur-md border border-white/10 flex items-center justify-center",
                "transition-all hover:scale-110 hover:bg-red hover:border-red group/delete",
              )}
              onClick={handleProductDeletion}
              aria-label="Delete from favorites"
            >
              <span className="h-4 w-4 bg-[url('/images/icons/trash.svg')] bg-contain bg-center bg-no-repeat group-hover/delete:brightness-200" />
            </button>
          )}
        </div>

        {/* ── Card Body ── */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            {/* Genres & Barcode row */}
            <div className="mb-3 flex items-center justify-between">
              {genres.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {genres.slice(0, 2).map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-on-surface-variant"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              ) : (
                <div />
              )}

              {barcode && (
                <span className="font-mono text-[10px] tracking-widest text-neutral-gray ml-2">
                  {barcode}
                </span>
              )}
            </div>

            {/* Name */}
            <h3
              className={cn(
                "m-0 line-clamp-2 font-bold text-white leading-snug",
                "text-lg lg:text-xl",
              )}
            >
              {name}
            </h3>

            {/* Description */}
            {description && (
              <p
                className={cn(
                  "mt-2 line-clamp-2 leading-relaxed text-neutral-gray text-xs md:text-sm",
                )}
              >
                {description}
              </p>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="m-0 text-xl font-bold text-white lg:text-2xl">
                ${price.toLocaleString("en-US")}
              </p>
              {comments.length > 0 && (
                <span className="flex items-center gap-1.5 text-xs text-neutral-gray font-medium">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                    className="opacity-70"
                  >
                    <path d="M2 2h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5l-3 3V3a1 1 0 0 1 1-1z" />
                  </svg>
                  {comments.length}
                </span>
              )}
            </div>

            {/* Full Width Cart Button */}
            <button
              className={cn(
                "cursor-pointer group/cart-btn w-full flex h-12 items-center justify-center gap-2.5 rounded-xl px-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 active:scale-95",
                isInCartState
                  ? " bg-transparent text-white border border-white/20 hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10"
                  : "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]",
                cartLoading && "opacity-60",
              )}
              onClick={(e) => toggleCart(e)}
              onMouseEnter={() => setIsCartHovered(true)}
              onMouseLeave={() => setIsCartHovered(false)}
              disabled={cartLoading}
              aria-label={isInCartState ? "Remove from cart" : "Add to cart"}
            >
              <span
                className={cn(
                  "h-4 w-4 bg-contain bg-center bg-no-repeat shrink-0 transition-all duration-300",
                  isInCartState
                    ? "bg-icon-cart opacity-80 group-hover/cart-btn:opacity-60"
                    : "bg-icon-cart invert",
                )}
                aria-hidden="true"
              />
              <span>{isInCartState ? "Remove from cart" : "Add to cart"}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

"use client";

import { Product } from "@/entities/product";
import { useScroll } from "@/shared/lib/hooks/use-scroll";
import { useAppSelector } from "@/shared/lib/store/hooks";
import { SessionExpiredModal } from "@/shared/ui/session-expired-modal/ui";
import Loader from "@/shared/ui/loader/ui";
import { Comment } from "@/entities/product";
import { Breadcrumbs } from "@/widgets/breadcrumbs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { CommentForm } from "./_components/CommentForm";
import { ProductReviews } from "./_components/ProductReviews";
import { ProductSpecs } from "./_components/ProductSpecs";
import { LoginRequiredModal } from "@/shared/ui/login-required-modal/ui";
import {
  selectIsAuthorized,
  selectIsProductInWishlist,
} from "@/entities/profile/model/selectors";
import { useToggleCart } from "@/entities/cart/lib/hooks/use-toggle-cart";
import { selectIsProductInCart } from "@/entities/cart";
import { useToggleWishlist } from "@/entities/profile/lib/hooks/use-toggle-wishlist";
import Recommendations from "./_components/Recommendations";

interface Props {
  product: Product | null;
  recommendations: Product[];
}

export default function ProductPage({ product, recommendations }: Props) {
  if (!product) return null;

  const { id, name, price, photo, description, comments } = product;

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isCommenting, setIsCommenting] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [optimisticComments, setOptimisticComments] =
    useState<Comment[]>(comments);

  const isInWishlist = useAppSelector((s) => selectIsProductInWishlist(s)(id));
  const { isSessionExpired } = useAppSelector((state) => state.session);
  const isInCart = useAppSelector((s) => selectIsProductInCart(s)(id));
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const reviewsSectionRef = useRef<HTMLElement>(null);

  const router = useRouter();

  useScroll({ options: { top: 0, behavior: "instant" } });

  useEffect(() => {
    if (comments) setOptimisticComments(comments);

    console.log(product);
  }, [comments]);

  const toggleCart = useToggleCart({ id, cartLoading, setCartLoading });

  const toggleWishlist = useToggleWishlist({
    id,
    wishlistLoading,
    setWishlistLoading,
    setIsLoginModalOpen,
  });

  const toggleReview = () => {
    if (!isAuthorized) {
      setIsLoginModalOpen(true);

      return;
    }

    setIsCommenting(true);
  };

  const handleCommentAdded = useCallback(
    (newComment: Comment) => {
      setOptimisticComments((prev) => [newComment, ...prev]);
      setIsCommenting(false);
      startTransition(() => {
        router.refresh();
      });
    },
    [router],
  );

  const handleCommentDeleted = useCallback((commentId: number) => {
    setOptimisticComments((prev) => prev.filter((c) => c.id !== commentId));
  }, []);

  return (
    <main className="grow pt-8 pb-32 px-5 lg:px-16 max-w-screen-2xl mx-auto w-full">
      {isSessionExpired && <SessionExpiredModal />}

      <div className="mb-8">
        <Breadcrumbs omittedPath="product" cnModifier="product-page" />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-32">
        {/* Product photo */}
        <div className="md:col-span-7 lg:col-span-6 relative">
          <div className="aspect-square overflow-hidden relative">
            <img
              className="w-full h-full object-cover transition-transform duration-700"
              src={photo.length ? photo : undefined}
              // alt={product.name}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="md:col-span-5 lg:col-span-5 lg:col-start-8 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-[32px] lg:text-[48px] font-semibold text-white mb-2 leading-tight">
              {name}
            </h1>
            <div className="text-[20px] text-on-surface-variant mb-8">
              ${price}.00
            </div>
            <p className="text-base text-on-surface-variant mb-12 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-6 mb-12">
            <div className="flex gap-4">
              <button
                className="flex-1 py-4 bg-white text-black text-xs lg:text-sm font-bold uppercase tracking-widest border border-white hover:bg-neutral-200 hover:border-neutral-200 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
                onClick={toggleCart}
                disabled={cartLoading}
              >
                {cartLoading ? (
                  <Loader size="s" color="black" />
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                )}
                {cartLoading
                  ? "LOADING..."
                  : isInCart
                    ? "DELETE FROM CART"
                    : "ADD TO CART"}
              </button>

              <button
                className={`flex-1 px-4 lg:px-8 py-4 bg-transparent text-white text-xs lg:text-sm font-bold uppercase tracking-widest border transition-colors duration-300 flex items-center justify-center gap-2 hover:cursor-pointer disabled:cursor-not-allowed ${
                  isInWishlist
                    ? "border-white"
                    : "border-outline-variant/50 hover:border-white"
                } ${wishlistLoading ? "opacity-50" : ""}`}
                onClick={toggleWishlist}
                disabled={wishlistLoading}
              >
                {wishlistLoading ? (
                  <Loader size="s" color="white" />
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={isInWishlist ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                )}
                <span className="hidden sm:inline">
                  {wishlistLoading
                    ? "LOADING..."
                    : isInWishlist
                      ? "DELETE FROM WISHLIST"
                      : "ADD TO WISHLIST"}
                </span>
              </button>
              <LoginRequiredModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
              />
            </div>

            <ProductSpecs product={product} />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section ref={reviewsSectionRef} className="mb-32 mx-auto scroll-mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-outline-variant/30 pb-8 mb-12">
          <div>
            <h2 className="text-[32px] font-semibold text-white mb-2">
              Customer Reviews
              {isPending && (
                <span className="text-sm opacity-50 ml-4 font-normal">
                  Updating...
                </span>
              )}
            </h2>
          </div>
          {!isCommenting && (
            <button
              className="mt-6 md:mt-0 px-8 py-3 border border-outline-variant/50 text-xs font-bold uppercase tracking-widest text-white hover:border-white transition-colors duration-300"
              onClick={toggleReview}
            >
              WRITE A REVIEW
            </button>
          )}
        </div>

        {isCommenting && (
          <CommentForm
            productId={id}
            productName={name}
            productPhoto={photo}
            onCancel={() => setIsCommenting(false)}
            onSuccess={handleCommentAdded}
          />
        )}

        <ProductReviews
          productId={id}
          comments={optimisticComments}
          setOptimisticComments={setOptimisticComments}
          onDeleteSuccess={handleCommentDeleted}
          reviewsSectionRef={reviewsSectionRef}
        />
      </section>
      <Recommendations recommendations={recommendations} />
    </main>
  );
}

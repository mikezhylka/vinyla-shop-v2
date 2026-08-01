"use client";

import { Product } from "@/entities/product";
import Link from "next/link";
import { BackSvg } from "@/shared/ui/back-svg/ui";
import { WishlistList } from "@/shared/ui/wishlist-list/ui";

interface Props {
  wishlistItems: Product[] | undefined;
}

export function WishlistPage({ wishlistItems }: Props) {
  if (!wishlistItems?.length) {
    return (
      <main className="min-h-screen pt-32 pb-24 bg-body-background text-white selection:bg-white/20">
        <div className="max-w-7xl mx-auto px-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-neutral-gray hover:text-white transition-colors mb-6 text-sm uppercase tracking-widest font-bold"
          >
            <BackSvg />
            Back to Profile
          </Link>
          <h1 className="h1 text-white mb-8">Wishlist</h1>
          <div className="bg-cart-background rounded-2xl border border-white/5 p-12 text-center flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-body-background rounded-full flex items-center justify-center mb-6 border border-white/10">
              <svg
                className="w-10 h-10 text-neutral-gray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="h3 text-white mb-3">Your wishlist is empty</h3>
            <p className="text-neutral-gray mb-8 max-w-md">
              Explore our collection and add your favorite records to the
              wishlist!
            </p>
            <Link href="/catalog">
              <button className="bg-white text-black px-8 py-3 rounded-full text-[16px] font-bold hover:bg-neutral-200 transition-colors hover:cursor-pointer">
                Discover Music
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 bg-body-background text-white selection:bg-white/20">
      <div className="max-w-7xl mx-auto px-8">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-neutral-gray hover:text-white transition-colors mb-6 text-sm uppercase tracking-widest font-bold"
        >
          <BackSvg />
          Back to Profile
        </Link>
        <h1 className="h1 text-white mb-8">
          Wishlist ({wishlistItems.length})
        </h1>

        <WishlistList wishlistItems={wishlistItems} />
      </div>
    </main>
  );
}

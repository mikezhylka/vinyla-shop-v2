"use client";

import { Product } from "@/entities/product";
import { WishlistList } from "@/shared/ui/wishlist-list/ui";
import Link from "next/link";

interface Props {
  wishlistItems: Product[] | undefined;
}

export default function Wishlist({ wishlistItems }: Props) {
  if (typeof wishlistItems === "undefined") {
    return <div>Loading...</div>;
  }

  if (wishlistItems.length === 0) {
    return (
      <section className="px-8 mb-24 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="h2 text-white">Wishlist</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-24 border border-white/10 rounded-3xl bg-white/2">
          <h3 className="font-headline text-3xl lg:text-4xl font-extrabold uppercase tracking-tighter text-white mb-8 text-center max-w-lg">
            Your wishlist is empty
          </h3>
          <Link
            className="whitespace-nowrap rounded-full bg-primary px-8 py-4 text-center text-[12px] font-bold uppercase tracking-widest text-on-primary transition-colors duration-200 hover:bg-primary/80 active:scale-95"
            href="/catalog"
          >
            Go to shop
          </Link>
        </div>
      </section>
    );
  }

  const displayItems = wishlistItems.slice(0, 10);
  const hasMoreItems = wishlistItems.length > 10;

  return (
    <section className="px-8 mb-24 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <h2 className="h2 text-white">Wishlist</h2>
        {hasMoreItems && (
          <Link
            className="text-white text-xs tracking-widest uppercase hover:underline font-bold"
            href="/profile/wishlist"
          >
            View All
          </Link>
        )}
      </div>
      <WishlistList wishlistItems={displayItems} />
      {hasMoreItems && (
        <div className="pt-8 relative">
          <div className="relative flex justify-center">
            <Link href="/profile/wishlist">
              <button className="bg-body-background px-6 py-2 text-white/70 hover:text-white hover:bg-white/5 border border-white/10 transition-colors text-sm font-bold tracking-widest uppercase rounded-full flex items-center gap-2">
                Show all {wishlistItems.length} items
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

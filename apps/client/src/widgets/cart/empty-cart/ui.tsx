"use client";

import { useScroll } from "@/shared/lib/hooks/use-scroll";
import Link from "next/link";

export const EmptyCart: React.FC = () => {
  useScroll({ options: { top: 0, behavior: "instant" } });

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <h1 className="font-headline text-4xl lg:text-5xl font-extrabold uppercase tracking-tighter text-white mb-8 text-center max-w-lg">
        Oops, seems your cart is empty
      </h1>
      <Link
        className="whitespace-nowrap rounded-full bg-primary px-8 py-4 text-center text-[12px] font-bold uppercase tracking-widest text-on-primary transition-colors duration-200 hover:bg-primary/80 active:scale-95"
        href="/catalog"
      >
        Go to shop
      </Link>
    </div>
  );
};

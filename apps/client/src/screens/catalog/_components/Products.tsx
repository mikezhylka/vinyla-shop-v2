"use client";

import { Product } from "@/entities/product";
import ProductCard from "@/entities/product/ui/product-card";

type Props = {
  products: Product[];
};

export const Products: React.FC<Props> = ({ products }) => {
  if (!products.length) {
    return (
      <section className="flex flex-col items-center justify-center py-24 px-4 text-center col-span-full w-full">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container border border-white/5">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/40"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">
          Nothing found
        </h2>
        <p className="max-w-md text-sm text-neutral-gray md:text-base">
          We couldn't find any products matching your current filters or search
          query. Try adjusting your criteria.
        </p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-4 gap-y-4 gap-x-2 md:grid-cols-6 md:px-6 px-4 md:py-4 lg:grid-cols-12 lg:mb-24 lg:gap-y-10">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          className="col-span-2 min-h-52 md:min-h-60 lg:col-span-3 lg:min-h-96"
        />
      ))}
    </section>
  );
};

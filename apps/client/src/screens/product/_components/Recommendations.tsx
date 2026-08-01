"use client";

import { Product } from "@/entities/product";
import ProductCard from "@/entities/product/ui/product-card";
import ArrowButton from "@/shared/ui/arrow-button/ui";
import { useEffect, useState } from "react";

interface Props {
  recommendations: Product[];
}

export default function Recommendations({ recommendations }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPerPage(2);
      } else {
        setPerPage(3);
      }
    };

    handleResize(); // invoke resize for a first render

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slicedRecommendations = recommendations.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage,
  );

  return (
    <section>
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-[32px] font-semibold text-white">
          Recommended Products
        </h2>
      </div>

      {!recommendations.length ? (
        <p className="text-on-surface-variant italic border border-outline-variant/20 p-8 text-center bg-surface-container-lowest">
          Could not load recommendations :$
        </p>
      ) : (
        <div className="relative group">
          <ArrowButton
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity "
            usedFor="recommendations"
            type="prev"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 0}
          />
          <div className="grid grid-cols-2 md:grid-cols-9 lg:grid-cols-9 gap-6 max-h-[80vh]">
            {slicedRecommendations.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="md:col-span-3 max-h-[80vh]"
              />
            ))}
          </div>
          <ArrowButton
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
            usedFor="recommendations"
            type="next"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={
              currentPage >= Math.floor(recommendations.length / perPage)
            }
          />
        </div>
      )}
    </section>
  );
}

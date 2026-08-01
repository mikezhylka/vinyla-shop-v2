"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import classNames from "classnames";
import ArrowButton from "@/shared/ui/arrow-button/ui";

interface Props {
  page: number;
  pageCount: number;
}

export const Pagination: React.FC<Props> = ({ page, pageCount }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigate = (toPage: number) => {
    if (toPage < 1 || toPage > pageCount) return;
    const next = new URLSearchParams(searchParams.toString());
    next.set("page", String(toPage));
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`);
    });
  };

  return (
    <div
      className={`flex items-center justify-center gap-16 mt-14 mb-32 md:mb-2.5 lg:mb-28 lg:gap-16 transition-opacity duration-200 ${
        isPending ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <ArrowButton
        className="arrow arrow--pagination arrow--pagination--prev cursor-pointer"
        usedFor="pagination"
        type="prev"
        onClick={() => navigate(page - 1)}
        disabled={page <= 1}
      />

      <div className="flex items-center justify-center gap-6 lg:gap-1">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => navigate(pageNumber)}
              className={classNames(
                "cursor-pointer text-base font-semibold transition-colors hover:text-white hover:underline hover:decoration-white lg:px-5 lg:py-2.5 lg:text-2xl",
                {
                  "text-white": page === pageNumber,
                  "text-neutral-gray": page !== pageNumber,
                },
              )}
            >
              {pageNumber}
            </button>
          ),
        )}
      </div>

      <ArrowButton
        className="arrow arrow--pagination arrow--pagination--next cursor-pointer"
        usedFor="pagination"
        type="next"
        onClick={() => navigate(page + 1)}
        disabled={page >= pageCount}
      />
    </div>
  );
};

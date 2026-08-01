"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";

type Props = {
  omittedPath?: string;
  disabledPath?: string;
  cnModifier?: string;
};

export const Breadcrumbs: FC<Props> = ({
  omittedPath,
  disabledPath,
  cnModifier,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activePathSegments = useMemo(
    () =>
      pathname
        ?.trim()
        .slice(1)
        .split("/")
        .filter((path) => path !== omittedPath && !parseInt(path)),
    [omittedPath, pathname],
  );

  const from = searchParams?.get("from");
  const backNavPath = from
    ? from
    : pathname?.includes("catalog")
      ? "/catalog"
      : "/";

  return (
    <div
      className={cn("flex items-center flex-wrap gap-4 mb-8 lg:mb-12", {
        "px-0": cnModifier === "product-page",
      })}
    >
      <button
        onClick={() => router.push(backNavPath)}
        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant hover:text-white transition-colors mr-2 md:mr-6"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        BACK
      </button>

      <div className="flex items-center flex-wrap gap-3">
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant hover:text-white transition-colors"
        >
          HOME
        </Link>

        {activePathSegments?.map((part, index) => {
          const link = "/" + activePathSegments.slice(0, index + 1).join("/");
          const isDisabled = part === disabledPath;

          return (
            <div key={`${index}-${part}`} className="flex items-center gap-3">
              <span className="text-[10px] text-outline-variant">/</span>
              <Link
                href={link}
                className={cn(
                  "text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300",
                  isDisabled
                    ? "pointer-events-none text-white border-b border-white pb-0.5"
                    : "text-on-surface-variant hover:text-white",
                )}
              >
                {part.replace(/-/g, " ")}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

"use client";

import { Genre } from "@/entities/genre";
import { GenreTag } from "@/entities/genre/ui/genre-tag";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

interface Props {
  genres: Genre[];
}

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
];

export default function Filter({ genres }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const currentGenre = searchParams.get("genre") ?? "";
  const currentSort = searchParams.get("sort") ?? "";
  const currentSearch = searchParams.get("search") ?? "";

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === currentSort)?.label ?? "Default";

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) next.set(key, value);
        else next.delete(key);
      });
      return next.toString();
    },
    [searchParams],
  );

  const push = useCallback(
    (params: Record<string, string>) => {
      startTransition(() => {
        router.push(`${pathname}?${createQueryString(params)}`);
      });
    },
    [pathname, createQueryString, router],
  );

  const handleSearch = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      push({ search: value, page: "" });
    }, 350);
  };

  const handleGenre = (id: string) => {
    push({ genre: currentGenre === id ? "" : id, page: "" });
  };

  const handleSort = (value: string) => {
    push({ sort: value, page: "" });
    setSortOpen(false);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <section
      className={`mb-10 px-4 md:px-6 transition-opacity duration-200 ${isPending ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center mb-5">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-gray pointer-events-none"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search by title..."
            defaultValue={currentSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="input pl-10"
          />
        </div>

        {/* Custom Sort dropdown — mirrors .input utility base styling */}
        <div ref={sortRef} className="relative md:w-56">
          {/* Trigger */}
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            onClick={() => setSortOpen((v) => !v)}
            className={`
              flex items-center justify-between gap-2 w-full h-10 md:h-13.5 px-3.5
              rounded-lg border text-sm text-secondary cursor-pointer
              select-none whitespace-nowrap transition-colors duration-200
              ${sortOpen
                ? "border-outline-variant/60 bg-surface-container"
                : "border-outline-variant/20 bg-surface-container-lowest hover:border-outline-variant/40 hover:bg-surface-container"
              }
            `}
          >
            <span>{currentSortLabel}</span>
            {/* Chevron — rotates 180° when open */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`
                shrink-0 transition-all duration-280 ease-in-out
                ${sortOpen ? "rotate-180 text-secondary" : "rotate-0 text-neutral-gray"}
              `}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {/* Dropdown panel */}
          {sortOpen && (
            <div
              role="listbox"
              aria-label="Sort by"
              className="
                absolute top-[calc(100%+6px)] right-0 z-50 min-w-full p-1.5
                rounded-xl border border-outline-variant/20 bg-surface-container
                shadow-[0_8px_24px_rgba(0,0,0,0.5)]
                animate-in fade-in-0 zoom-in-95 slide-in-from-top-1
                duration-200 origin-top-right
              "
            >
              {SORT_OPTIONS.map((opt, i) => {
                const isActive = currentSort === opt.value;
                return (
                  <div key={opt.value}>
                    {/* Divider before price options */}
                    {i === 1 && (
                      <div className="h-px mx-2 my-1 bg-outline-variant/20" />
                    )}
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => handleSort(opt.value)}
                      className={`
                        flex items-center justify-between gap-2.5 w-full
                        px-3 py-2.5 rounded-lg text-sm text-left
                        whitespace-nowrap cursor-pointer transition-colors duration-150
                        ${isActive
                          ? "bg-surface-bright text-primary"
                          : "text-on-surface-variant hover:bg-surface-variant hover:text-secondary"
                        }
                      `}
                    >
                      <span>{opt.label}</span>
                      {/* Tick — visible only when active */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={`shrink-0 transition-opacity duration-150 ${isActive ? "opacity-100" : "opacity-0"
                          }`}
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Genre pills */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by genre"
      >
        <button
          onClick={() => handleGenre("")}
          aria-pressed={currentGenre === ""}
          className={`h-8 px-4 rounded-full text-sm font-medium transition-all duration-150 border ${currentGenre === ""
            ? "bg-primary text-on-primary border-primary"
            : "bg-transparent text-secondary border-outline-variant/40 hover:border-outline-variant hover:text-white"
            }`}
        >
          All
        </button>
        {genres.map((genre) => {
          const isActive = currentGenre === String(genre.id);
          return (
            <GenreTag
              key={genre.id}
              genre={genre}
              handleGenre={handleGenre}
              isActive={isActive}
            />
          );
        })}
      </div>
    </section>
  );
}

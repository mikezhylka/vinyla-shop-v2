"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Menu() {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="touch-none h-screen fixed inset-0 z-50 bg-body-background flex flex-col md:hidden animate-in fade-in duration-300">
      <div className="flex h-fit items-center justify-between w-full px-5 py-4">
        <Link
          href="/"
          onClick={() => {
            scrollToTop();
          }}
          className="block h-7 w-28 shrink-0 bg-logo-vinyla bg-no-repeat bg-contain"
        />
        <button
          onClick={() => router.back()}
          className="p-2 -mr-2 text-white hover:text-white/70 transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <nav className="flex flex-col items-center justify-center flex-1 gap-10">
        {["/catalog", "/services", "/contact"].map((link) => (
          <Link
            key={link}
            href={link}
            className={cn(
              "text-xl font-bold uppercase tracking-[0.2em] transition-colors",
              pathname.startsWith(link)
                ? "text-white"
                : "text-outline hover:text-white",
            )}
          >
            {link.slice(1)}
          </Link>
        ))}
      </nav>
    </div>
  );
}

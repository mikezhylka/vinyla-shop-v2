"use client";

import { resetProfile } from "@/entities/profile/model/slice";
import { logoutAction } from "@/features/auth/api/logout";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import cn from "classnames";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const { profile, isLoading } = useAppSelector((state) => state.profile);
  const { cartProductsIds } = useAppSelector((state) => state.cart);
  const [logoutError, setLogoutError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    setIsDropdownOpen(false);
    const result = await logoutAction();

    if (result.error) {
      setLogoutError(result.error);
    }

    if (result.success) {
      localStorage.removeItem("profile");
      localStorage.removeItem("wishlistIds");
      localStorage.removeItem("cartProductsIds");
      dispatch(resetProfile());
    }
  }

  return (
    <header
      className="sticky top-0 z-30 flex justify-center items-center w-full bg-body-background/80 backdrop-blur-md border-b border-white/5 transition-[padding] duration-400 box-border"
      id="page-header"
    >
      <div className="flex h-fit items-center justify-between w-full max-w-7xl px-5 py-4 lg:px-8">
        {/* LEFT: LOGO */}
        <div className="flex-1 flex">
          <Link
            href="/"
            onClick={scrollToTop}
            className="block h-7 w-28 shrink-0 bg-logo-vinyla bg-no-repeat bg-contain"
          />
        </div>

        {/* CENTER: NAVIGATION */}
        <nav className="flex-1 hidden md:flex items-center justify-center gap-10">
          {["/catalog", "/services", "/contact"].map((link) => (
            <Link
              key={link}
              href={link}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
                pathname.startsWith(link)
                  ? "text-white"
                  : "text-outline hover:text-white",
              )}
            >
              {link.slice(1)}
            </Link>
          ))}
        </nav>

        {/* RIGHT: CONTROLS */}
        <div className="flex-1 flex items-center justify-end gap-4 md:gap-6">
          {isLoading ? (
            <div className="h-6 w-16 animate-pulse rounded bg-white/5" />
          ) : profile?.id ? (
            <div className="relative flex items-center gap-6">
              {/* Profile Dropdown Trigger */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 transition-opacity hover:opacity-80 hover:cursor-pointer"
                >
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border border-white/10"></div>
                  )}
                  <span className="text-sm font-medium text-white hidden sm:block">
                    {profile.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-14 right-0 w-48 bg-surface-container-lowest border border-white/10 rounded-2xl shadow-2xl py-2 flex flex-col z-50 overflow-hidden">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-colors"
                    >
                      Profile
                    </Link>
                    <div className="h-px w-full bg-white/10 my-0" />
                    <button
                      onClick={handleLogout}
                      className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-red hover:bg-red hover:text-white transition-colors text-left cursor-pointer border-none bg-transparent"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative transition-transform hover:scale-105"
              >
                <img
                  src="/images/icons/cart.svg"
                  alt="Cart"
                  className="w-7 h-7 opacity-90"
                />
                {cartProductsIds.length > 0 && (
                  <div className="absolute -top-1.5 -right-2 bg-primary text-on-primary text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-lg border-2 border-body-background">
                    {cartProductsIds.length}
                  </div>
                )}
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors"
              >
                Login
              </Link>
            </div>
          )}

          {/* Burger Menu Trigger */}
          <button
            className="md:hidden flex items-center justify-center p-2 -mr-2 text-white hover:text-white/70 transition-colors"
            onClick={() => router.push("menu")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

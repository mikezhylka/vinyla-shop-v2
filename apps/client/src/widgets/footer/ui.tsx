"use client";

import { directContacts, footerLinks } from "@/constants/contacts";
import cn from "classnames";
import Link from "next/link";

interface FooterProps {
  error?: string;
  isMenuShown?: boolean;
}

export default function Footer({ error, isMenuShown }: FooterProps) {
  if (error || isMenuShown) return null;

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-white/10 px-5 py-6 bg-body-background text-white lg:py-12">
      {/* Navigation */}
      <nav className="lg:mb-26">
        <ul
          className={cn(
            "m-0 p-0 mt-0",
            // Mobile: block flow
            // Tablet (md): 4-col grid
            // Desktop (lg): 12-col grid
            "grid grid-cols-4 gap-x-4 md:gap-x-5",
            "lg:grid-cols-12 lg:mt-23.75",
          )}
        >
          {/* Direct Contacts — col 1-3 tablet, col 2-9 desktop */}
          <div
            className={cn(
              "col-span-4",
              "md:col-span-3",
              "lg:col-start-2 lg:col-end-10",
            )}
          >
            {directContacts.map((contact) => {
              const { title, link, href } = contact;
              return (
                <div key={link} className="contact__wrap">
                  {/* Title label */}
                  <li
                    className={cn(
                      "list-none text-neutral-gray text-[10px] font-bold uppercase tracking-widest",
                      // phone gets top margin to separate sections
                      href === "phone" && "mt-8",
                      (href === "mail" || href === "phone") && "mb-2",
                    )}
                  >
                    {title}
                  </li>
                  {/* Link — big on desktop */}
                  <li className="list-none w-full">
                    <a
                      className={cn(
                        "no-underline text-white break-all",
                        "text-3xl font-medium tracking-tight",
                        "md:text-5xl",
                        "lg:text-[64px]",
                        "transition-opacity hover:opacity-70",
                      )}
                      href={href}
                      onClick={(e) => e.preventDefault()}
                    >
                      {link}
                    </a>
                  </li>
                </div>
              );
            })}
          </div>

          {/* Social / Footer links — col 4 tablet, last 2 cols desktop */}
          <div
            className={cn(
              "col-span-4 mt-12",
              "md:col-start-4 md:col-span-1 md:mt-0",
              "lg:col-start-11 lg:col-end-13",
            )}
          >
            {footerLinks.map((link, i) => (
              <li
                key={link}
                className={cn(
                  "list-none",
                  // first item has no top margin, last item gets 32px on desktop, rest 16px
                  i !== 0 && "mt-4",
                  i === footerLinks.length - 1 && "mt-8 lg:mt-12",
                )}
              >
                <a
                  className="no-underline text-white hover:text-white/60 transition-all text-[11px] font-bold uppercase tracking-widest"
                  href={`#${link}`}
                  onClick={(e) => e.preventDefault()}
                >
                  {link}
                </a>
              </li>
            ))}
          </div>
        </ul>
      </nav>

      {/* Bottom media bar */}
      <div
        className={cn(
          "flex items-center justify-between mt-13",
          "lg:grid lg:grid-cols-12 lg:gap-x-5",
        )}
      >
        <Link
          href="/"
          onClick={scrollToTop}
          className={cn(
            "block w-28 h-7.5 shrink-0 bg-logo-vinyla bg-no-repeat bg-contain",
            "transition-opacity hover:opacity-80",
            "lg:col-start-2 lg:col-end-4",
          )}
        />

        <p
          className={cn(
            "m-0 text-neutral-gray text-[10px] font-bold uppercase tracking-widest",
            "lg:col-start-10 lg:col-end-12",
            "text-right",
          )}
        >
          designed by <span className="text-white">Lisa</span>
        </p>
      </div>
    </footer>
  );
}

"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import ArrowButton from "../arrow-button/ui";

type Props = {
  omittedPath?: string;
  disabledPath?: string;
  cnModifier?: string;
  isOnDesktop?: boolean;
};

export const Breadcrumbs: React.FC<Props> = ({
  omittedPath,
  disabledPath,
  cnModifier,
  isOnDesktop,
}) => {
  const pathname = usePathname() || "";
  const router = useRouter();

  const activePathSegments = useMemo(
    () =>
      pathname
        .trim()
        .slice(1)
        .split("/")
        .filter((path) => path !== omittedPath && !parseInt(path)),
    [omittedPath, pathname],
  );

  function handleNavigation() {
    return pathname.includes("shop") ? "/shop" : "/";
  }

  return (
    <div
      className={cn("flex items-center gap-2 my-8 lg:my-12 lg:mb-22", {
        "px-5": cnModifier === "product-page",
      })}
    >
      {!isOnDesktop && (
        <ArrowButton usedFor="breadcrumb" type="prev" to={handleNavigation()} />
      )}
      <img
        className="transition-transform duration-400 hover:scale-110 hover:cursor-pointer"
        src="/images/icons/home.svg"
        alt="Home"
        onClick={() => pathname !== "/" && router.push("/")}
      />
      <div className="block">
        {activePathSegments.map((part, index) => {
          const link = "/" + activePathSegments.slice(0, index + 1).join("/");
          const isDisabled = part === disabledPath;

          return (
            <Link
              key={`${index}-${part}`}
              href={isDisabled ? "#" : link}
              className={cn(
                "text-sm text-neutral-gray no-underline cursor-pointer hover:underline lg:text-xl lg:font-semibold",
                { "pointer-events-none": isDisabled },
              )}
            >
              / <span className="text-inherit">{part}</span>{" "}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

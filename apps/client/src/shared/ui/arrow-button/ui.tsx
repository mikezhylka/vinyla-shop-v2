"use client";

export type UsedForInArrowBtn = "pagination" | "recommendations" | "breadcrumb";
import cn from "classnames";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  usedFor: UsedForInArrowBtn;
  type: "prev" | "next";
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function ArrowButton({
  className,
  usedFor,
  type,
  to,
  onClick,
  disabled,
}: Props) {
  const router = useRouter();

  const handleNavigation = () => {
    if (to) {
      router.push(to);
    } else if (onClick) {
      onClick();
    }
  };

  const baseClasses =
    "flex items-center justify-center border border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant transition-all duration-300 hover:border-white hover:text-white disabled:border-outline-variant/10 disabled:text-outline-variant/20";

  const contextClasses = {
    pagination: "h-10 w-10 lg:h-12 lg:w-12",
    recommendations: cn(
      "absolute top-1/2 -translate-y-1/2 h-12 w-12 z-10 bg-surface/80 backdrop-blur-sm",
      type === "next" ? "right-0" : "left-0",
    ),
    breadcrumb: "h-10 w-10 mr-2",
  };

  return (
    <button
      className={cn(
        baseClasses,
        contextClasses[usedFor as keyof typeof contextClasses],
        className,
      )}
      onClick={handleNavigation}
      disabled={disabled}
      aria-label={type === "prev" ? "Previous" : "Next"}
    >
      {type === "prev" ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      )}
    </button>
  );
}

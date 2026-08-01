import cn from "classnames";
import { memo } from "react";

interface StarIconProps {
  filled?: boolean;
  value?: number;
  onHover?: (val: number) => void;
  onClick?: (val: number) => void;
  onLeave?: () => void;
  className?: string;
}

export const StarIcon = memo(
  ({
    filled = true,
    value,
    onHover,
    onClick,
    onLeave,
    className,
  }: StarIconProps) => {
    const isInteractive = Boolean(onClick && value !== undefined);

    const hasCustomColor = className?.includes("text-");

    return (
      <svg
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onMouseEnter={() => isInteractive && onHover?.(value!)}
        onMouseLeave={onLeave}
        onClick={() => isInteractive && onClick?.(value!)}
        className={cn(
          !hasCustomColor && (filled ? "text-white" : "text-outline-variant"),

          isInteractive && "cursor-pointer transition-all duration-200",
          isInteractive && filled && "scale-110",

          isInteractive && !filled && !hasCustomColor && "hover:text-white/70",

          className,
        )}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  },
);

StarIcon.displayName = "StarIcon";

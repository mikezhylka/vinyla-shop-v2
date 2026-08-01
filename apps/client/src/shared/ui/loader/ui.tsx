import cn from "classnames";

interface Props {
  size: "s" | "l";
  color: "white" | "black";
}

export default function Loader({ size, color }: Props) {
  const isSmall = size === "s";
  const isWhite = color === "white";

  return (
    <span
      className={cn(
        // Base sizes
        isSmall ? "w-5 h-5 border-2" : "w-12 h-12 border-[5px]",
        // Dynamic border color
        isWhite ? "border-white" : "border-black",
        "relative inline-block rounded-full border-solid box-border animate-pulse-custom",

        // Base styles for after pseudo-element
        "after:content-[''] after:absolute after:top-1/2 after:left-1/2",
        "after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border-solid after:box-border after:animate-scale-up",

        // Dynamic border color for after pseudo-element
        isWhite ? "after:border-white" : "after:border-black",

        // Dynamic size for after pseudo-element
        isSmall
          ? "after:w-5 after:h-5 after:border-2"
          : "after:w-12 after:h-12 after:border-[5px]",
      )}
    />
  );
}

import { useEffect, useState } from "react";

export function useTemporarySuccess(duration = 3000) {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isSuccess) return;

    const timer = setTimeout(() => setIsSuccess(false), duration);
    const handleClick = () => setIsSuccess(false);

    document.addEventListener("click", handleClick);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick);
    };
  }, [isSuccess, duration]);

  return { isSuccess, setIsSuccess };
}

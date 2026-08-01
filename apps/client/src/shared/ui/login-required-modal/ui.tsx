import { useEffect, useRef } from "react";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export function LoginRequiredModal({ 
  isOpen, 
  onClose, 
  message = "You need to log in to perform this action." 
}: Props) {
  const loginRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    loginRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="
          relative z-10
          bg-surface-container-lowest
          border border-outline-variant/30
          p-8 w-full max-w-sm mx-4
          animate-[modal-in_0.18s_ease-out]
        "
        style={{
          animation: "modal-in 0.18s ease-out",
        }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 border border-primary/30 flex items-center justify-center rounded-full">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h2
          id="login-modal-title"
          className="text-white text-sm font-bold uppercase tracking-widest text-center mb-3"
        >
          Login Required
        </h2>
        <p className="text-on-surface-variant text-sm text-center leading-relaxed mb-8">
          {message}
        </p>

        {/* Divider */}
        <div className="border-t border-outline-variant/20 mb-6" />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="
              flex-1 py-3 text-xs font-bold uppercase tracking-widest
              border border-outline-variant/40
              text-on-surface-variant
              hover:border-outline-variant hover:text-white
              transition-colors duration-200
              cursor-pointer
            "
          >
            Cancel
          </button>
          <Link
            ref={loginRef}
            href="/login"
            onClick={onClose}
            className="
              flex-1 py-3 text-xs font-bold uppercase tracking-widest text-center
              bg-primary text-on-primary
              hover:bg-primary/80
              transition-colors duration-200
              cursor-pointer
            "
          >
            Log in
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}

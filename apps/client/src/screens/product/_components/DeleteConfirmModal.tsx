import { useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ isOpen, onConfirm, onCancel }: Props) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    confirmRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
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
          <div className="w-14 h-14 border border-red-500/30 flex items-center justify-center">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h2
          id="modal-title"
          className="text-white text-sm font-bold uppercase tracking-widest text-center mb-3"
        >
          Delete Review
        </h2>
        <p className="text-on-surface-variant text-sm text-center leading-relaxed mb-8">
          This action cannot be undone. Your review will be permanently removed.
        </p>

        {/* Divider */}
        <div className="border-t border-outline-variant/20 mb-6" />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="
              flex-1 py-3 text-xs font-bold uppercase tracking-widest
              border border-outline-variant/40
              text-on-surface-variant
              hover:border-outline-variant hover:text-white
              transition-colors duration-200
              hover:cursor-pointer
            "
          >
            Cancel
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            className="
              flex-1 py-3 text-xs font-bold uppercase tracking-widest
              bg-red-500/10 border border-red-500/40
              text-red-500
              hover:bg-red-500/20 hover:border-red-500
              transition-colors duration-200
              hover:cursor-pointer
            "
          >
            Delete
          </button>
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

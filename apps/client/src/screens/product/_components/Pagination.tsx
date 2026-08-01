interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-label="Reviews pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant border-b border-transparent pb-1 hover:text-white hover:border-white transition-all disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:text-on-surface-variant disabled:hover:border-transparent"
        aria-label="Previous page"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        PREV
      </button>

      <div className="flex items-center mx-3 gap-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            className={`w-8 h-8 text-xs font-bold uppercase tracking-widest transition-all border-b pb-1
              ${
                currentPage === page
                  ? "text-white border-white"
                  : "text-on-surface-variant border-transparent hover:text-white hover:border-outline-variant"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant border-b border-transparent pb-1 hover:text-white hover:border-white transition-all disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:text-on-surface-variant disabled:hover:border-transparent"
        aria-label="Next page"
      >
        NEXT
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </nav>
  );
}

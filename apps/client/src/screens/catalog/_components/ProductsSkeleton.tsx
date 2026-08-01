export default function ProductsSkeleton() {
  return (
    <section className="grid grid-cols-4 gap-y-4 gap-x-2 md:grid-cols-6 md:px-6 px-4 md:py-4 lg:grid-cols-12 lg:mb-24 lg:gap-y-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="col-span-2 min-h-52 md:min-h-60 lg:col-span-3 lg:min-h-96 rounded-2xl bg-surface-container-lowest border border-white/5 p-4 flex flex-col gap-4 animate-pulse"
        >
          {/* Image Area Skeleton */}
          <div className="w-full aspect-square bg-surface-container rounded-xl" />

          {/* Body Skeleton */}
          <div className="flex flex-1 flex-col justify-between mt-2">
            <div>
              {/* Tags/Barcode */}
              <div className="mb-3 flex justify-between">
                <div className="flex gap-1.5">
                  <div className="h-4 w-12 bg-white/5 rounded-full" />
                  <div className="h-4 w-16 bg-white/5 rounded-full" />
                </div>
                <div className="h-3 w-10 bg-white/5 rounded" />
              </div>

              {/* Title */}
              <div className="h-6 w-3/4 bg-white/10 rounded mb-2" />
              <div className="h-6 w-1/2 bg-white/10 rounded" />
            </div>

            {/* Price and Button */}
            <div className="mt-6 flex flex-col gap-4">
              <div className="h-7 w-20 bg-white/10 rounded" />
              <div className="h-12 w-full bg-white/5 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

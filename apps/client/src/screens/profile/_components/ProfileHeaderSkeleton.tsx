export default function ProfileHeaderSkeleton() {
  return (
    <section className="px-8 mb-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 animate-pulse">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-10 text-center md:text-left w-full md:w-auto">
          <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full bg-white/10 ring-2 ring-white/5"></div>

          <div className="space-y-2 flex flex-col items-center md:items-start w-full">
            <div className="w-64 md:w-96 h-20 bg-white/10 rounded-lg"></div>
            <div className="w-48 h-6 bg-white/10 rounded"></div>
          </div>
        </div>

        <div className="flex gap-3 shrink-0 mt-4 md:mt-0">
          <div className="w-44 h-11 bg-white/10 rounded-2xl"></div>
          <div className="w-28 h-11 bg-white/10 rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
}

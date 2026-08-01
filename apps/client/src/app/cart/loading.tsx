export default function CartLoading() {
  return (
    <main className="px-5 animate-pulse">
      <div className="main-grid">
        <div className="col-span-full flex items-center justify-between md:justify-start gap-3 md:gap-6 border-b border-white/10 pb-6 mb-8 lg:mb-12 mt-8 lg:mt-16 lg:col-start-2 lg:col-span-10">
          {[1, 2, 3].map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/10 shrink-0" />
              <div className="hidden md:block h-3 w-16 bg-white/10 rounded" />
              {index < 2 && (
                <div className="h-px w-8 md:w-16 bg-white/10 ml-3 md:ml-6" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="main-grid lg:my-10 lg:px-0">
        <div className="col-span-full w-full mb-10 lg:col-span-7 lg:mb-0">
          <div className="hidden md:grid grid-cols-7 gap-5 pb-4 mb-4 border-b border-white/5">
            <div className="col-span-5 h-3 w-16 bg-white/10 rounded" />
            <div className="col-span-1 h-3 w-16 bg-white/10 rounded" />
            <div className="col-span-1 h-3 w-16 bg-white/10 rounded justify-self-end" />
          </div>

          <div className="flex flex-col gap-8 mt-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-7 gap-5 w-full items-center"
              >
                <article className="flex col-span-5 gap-6 md:gap-12 items-center">
                  <div className="rounded-lg bg-surface-container-high w-24 h-24 sm:w-32 sm:h-32 md:w-28 md:h-28 lg:w-40 lg:h-40 shrink-0" />
                  <div className="flex flex-col justify-center gap-3 w-full">
                    <div className="h-5 w-3/4 max-w-50 bg-white/10 rounded" />
                    <div className="h-4 w-16 bg-white/10 rounded" />
                  </div>
                </article>
                <div className="hidden md:block col-span-1">
                  <div className="h-10 w-24 bg-white/10 rounded-full" />
                </div>
                <div className="hidden md:flex col-span-1 justify-end">
                  <div className="h-10 w-10 bg-white/10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="col-span-full flex flex-col gap-8 lg:col-start-9 lg:-col-end-1">
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 w-full bg-surface-container-lowest rounded-xl border border-white/5"
              />
            ))}
          </div>

          <div className="flex flex-col bg-surface-container-low rounded-xl p-8 border border-white/5 gap-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div className="h-4 w-16 bg-white/10 rounded" />
              <div className="h-4 w-12 bg-white/10 rounded" />
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/5">
              <div className="h-4 w-16 bg-white/10 rounded" />
              <div className="h-4 w-12 bg-white/10 rounded" />
            </div>
            <div className="flex justify-between items-center pt-4">
              <div className="h-5 w-16 bg-white/20 rounded" />
              <div className="h-5 w-20 bg-white/20 rounded" />
            </div>
          </div>

          <div className="h-14 w-full bg-white/10 rounded-full" />
        </section>
      </div>
    </main>
  );
}

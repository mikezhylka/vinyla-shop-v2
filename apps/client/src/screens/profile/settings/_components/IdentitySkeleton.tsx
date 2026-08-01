export default function IdentitySkeleton() {
  return (
    <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 animate-pulse">
      <div className="lg:col-span-4 space-y-4 pt-1">
        <div className="h-8 w-32 rounded bg-white/5"></div>
        <div className="h-4 w-4/5 rounded bg-white/5"></div>
        <div className="h-4 w-3/5 rounded bg-white/5"></div>
      </div>

      <div className="rounded-xl bg-surface-container-low p-8 lg:col-span-8">
        <div className="flex flex-col items-start gap-12 md:flex-row">
          <div className="flex shrink-0 flex-col items-center gap-4">
            <div className="h-32 w-32 rounded-full bg-surface-container-high"></div>
            <div className="h-7 w-30 rounded-full bg-surface-container-high"></div>
          </div>

          <div className="flex w-full flex-1 flex-col gap-6">
            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-white/5"></div>
              <div className="h-13 w-full rounded-lg bg-surface-container-lowest"></div>
            </div>

            <div className="flex justify-end">
              <div className="h-9.5 w-32.5 rounded-full bg-primary/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

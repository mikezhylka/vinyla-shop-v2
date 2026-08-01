export default function ContactSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 animate-pulse">
      <div className="lg:col-span-4 space-y-4 pt-1">
        <div className="h-8 w-32 rounded bg-white/5"></div>
        <div className="h-4 w-48 rounded bg-white/5"></div>
      </div>

      <div className="lg:col-span-8">
        <div className="space-y-6 rounded-xl bg-surface-container-low p-8">
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-white/5"></div>
            <div className="h-14 w-full rounded-lg bg-surface-container-lowest"></div>
          </div>

          <div className="flex justify-end">
            <div className="h-10 w-32 rounded-full bg-primary/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

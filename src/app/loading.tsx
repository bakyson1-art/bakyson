import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-white text-foreground animate-pulse">
      <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <div className="hidden md:flex gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-5 w-20" />
            ))}
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero skeleton */}
        <section className="relative overflow-hidden min-h-[80vh] flex items-center">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-32 w-full">
            <div className="max-w-4xl mx-auto rounded-2xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-xl p-6 lg:p-12">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-full mt-4" />
              <div className="mt-6 flex flex-wrap gap-3">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-10 w-24" />
                ))}
              </div>
              <div className="mt-8">
                <Skeleton className="h-4 w-1/3" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content skeletons */}
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
          <Skeleton className="h-6 w-1/3 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
          <Skeleton className="h-6 w-1/3 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
